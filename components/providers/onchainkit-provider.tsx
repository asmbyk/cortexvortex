"use client"

import type React from "react"
import { OnchainKitProvider } from "@coinbase/onchainkit"
import { base } from "viem/chains"

interface OnchainKitWrapperProps {
  children: React.ReactNode
}

export default function OnchainKitWrapper({ children }: OnchainKitWrapperProps) {
  return (
    <OnchainKitProvider apiKey="dxiPnUcKWKCvBEVXAPLkfKAKEquXDA05" chain={base}>
      {children}
    </OnchainKitProvider>
  )
}

export { OnchainKitWrapper as OnchainKitProvider }
