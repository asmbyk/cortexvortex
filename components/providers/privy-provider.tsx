"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { PrivyProvider } from "@privy-io/react-auth"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createWagmiConfig, defaultChain } from "@/lib/wagmi-config"
import PrivyErrorBoundary from "./privy-error-boundary"

const queryClient = new QueryClient()

interface PrivyWrapperProps {
  children: React.ReactNode
}

function PrivyContent({ children }: { children: React.ReactNode }) {
  const [skipPrivy, setSkipPrivy] = useState(false)
  const [wagmiConfig, setWagmiConfig] = useState(() => createWagmiConfig())
  const [mounted, setMounted] = useState(false)

  // RPC config'i fetch et ve wagmi config'i güncelle
  useEffect(() => {
    async function fetchAndUpdateConfig() {
      try {
        const response = await fetch("/api/rpc-config")
        if (response.ok) {
          const data = await response.json()
          const newConfig = createWagmiConfig(data.baseRpcUrl)
          setWagmiConfig(newConfig)
        }
      } catch (error) {
        console.error("Failed to fetch RPC config:", error)
        // Hata durumunda default config kullan
      }
    }

    fetchAndUpdateConfig()
  }, [])

  useEffect(() => {
    setMounted(true)
    // Check if user chose to skip Privy
    const shouldSkip = localStorage.getItem("skip-privy") === "true"
    setSkipPrivy(shouldSkip)
  }, [])

  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  // If no Privy App ID, show configuration error
  if (!privyAppId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center p-8 cosmic-card max-w-md">
          <h2 className="text-2xl font-marker mb-4 glow-text-pink">Configuration Required</h2>
          <p className="font-comic text-gray-300 mb-4">
            Privy App ID is missing. Please add your Privy configuration to environment variables.
          </p>
          <div className="bg-black/40 rounded-lg p-4 text-left mb-4">
            <p className="text-sm text-gray-400 mb-2">Required environment variables:</p>
            <code className="text-xs text-green-400 block">NEXT_PUBLIC_PRIVY_APP_ID=prv_app_...</code>
          </div>
          <a
            href="/setup"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-comic font-bold hover:from-pink-600 hover:to-purple-500 transition-all"
          >
            Setup Guide
          </a>
        </div>
      </div>
    )
  }

  if (!mounted) {
    return <div className="min-h-screen bg-black" />
  }

  // If user chose to skip Privy, render without it
  if (skipPrivy) {
    return (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    )
  }

  // Try to render with Privy
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <PrivyProvider
          appId={privyAppId}
          config={{
            appearance: {
              theme: "dark",
              accentColor: "#8B5CF6",
              logo: "/images/cortex-vortex-logo-main.png",
              showWalletLoginFirst: true,
              walletList: "grid", // Cüzdanları grid olarak göster
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
              requireUserPasswordOnCreate: false,
            },
            // Sadece MetaMask, email ve Coinbase Wallet göster
            loginMethods: ["metamask", "email", "coinbase_wallet"],
            // Wallet connector'ları özelleştir
            walletConnectors: [
              { name: "metamask", showOnMobile: true, showOnDesktop: true },
              { name: "coinbase_wallet", showOnMobile: true, showOnDesktop: true },
            ],
            // Wallet'ları önceliklendir
            defaultLoginMethod: "metamask",
            // Desteklenen zincirler
            defaultChain: defaultChain,
            supportedChains: [defaultChain],
          }}
        >
          {children}
        </PrivyProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export default function PrivyWrapper({ children }: PrivyWrapperProps) {
  return (
    <PrivyErrorBoundary>
      <PrivyContent>{children}</PrivyContent>
    </PrivyErrorBoundary>
  )
}
