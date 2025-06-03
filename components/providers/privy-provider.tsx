"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { PrivyProvider } from "@privy-io/react-auth"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createWagmiConfig, defaultChain } from "@/lib/wagmi-config"
import { PrivyErrorBoundary } from "./privy-error-boundary"

const queryClient = new QueryClient()

interface PrivyWrapperProps {
  children: React.ReactNode
}

function PrivyProviderInner({ children }: PrivyWrapperProps) {
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
  }, [])

  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  // If no Privy App ID, just render children without Privy
  if (!privyAppId) {
    console.warn("NEXT_PUBLIC_PRIVY_APP_ID is not set. Wallet features will be disabled.")
    return <>{children}</>
  }

  if (!mounted) {
    return <div className="min-h-screen bg-black" />
  }

  // Render with Privy - simplified configuration with Farcaster
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
              showWalletLoginFirst: false,
            },
            loginMethods: ["wallet", "email", "farcaster"],
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
              requireUserPasswordOnCreate: false,
            },
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
      <PrivyProviderInner>{children}</PrivyProviderInner>
    </PrivyErrorBoundary>
  )
}

export { PrivyWrapper as PrivyProvider }
