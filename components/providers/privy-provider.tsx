"use client"
import { PrivyProvider } from "@privy-io/react-auth"
import type React from "react"

import { WagmiProvider } from "@privy-io/wagmi"
import { wagmiConfig } from "@/lib/wagmi-config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function PrivyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ["wallet", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "/images/cortex-vortex-logo-main.png",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
