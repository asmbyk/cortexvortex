"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type FrameContext, getFarcasterSdk, isInFarcasterApp, type SafeAreaInsets } from "@/lib/farcaster-sdk"

type FarcasterContextType = {
  isInFarcaster: boolean
  context: FrameContext | null
  safeAreaInsets: SafeAreaInsets
  loading: boolean
}

const defaultContext: FarcasterContextType = {
  isInFarcaster: false,
  context: null,
  safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
  loading: true,
}

const FarcasterContext = createContext<FarcasterContextType>(defaultContext)

export function FarcasterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FarcasterContextType>(defaultContext)

  useEffect(() => {
    const initFarcaster = async () => {
      const inFarcaster = isInFarcasterApp()

      if (inFarcaster) {
        const sdk = getFarcasterSdk()
        const safeAreaInsets = sdk.context.client.safeAreaInsets || { top: 0, bottom: 0, left: 0, right: 0 }

        setState({
          isInFarcaster: true,
          context: sdk.context,
          safeAreaInsets,
          loading: false,
        })
      } else {
        setState({
          ...defaultContext,
          loading: false,
        })
      }
    }

    initFarcaster()
  }, [])

  return <FarcasterContext.Provider value={state}>{children}</FarcasterContext.Provider>
}

export const useFarcaster = () => useContext(FarcasterContext)

// Component to apply safe area insets
export function SafeArea({
  children,
  applyTop = true,
  applyBottom = true,
  applyLeft = true,
  applyRight = true,
  className = "",
}: {
  children: React.ReactNode
  applyTop?: boolean
  applyBottom?: boolean
  applyLeft?: boolean
  applyRight?: boolean
  className?: string
}) {
  const { safeAreaInsets, isInFarcaster } = useFarcaster()

  if (!isInFarcaster) {
    return <div className={className}>{children}</div>
  }

  const style = {
    paddingTop: applyTop ? `${safeAreaInsets.top}px` : 0,
    paddingBottom: applyBottom ? `${safeAreaInsets.bottom}px` : 0,
    paddingLeft: applyLeft ? `${safeAreaInsets.left}px` : 0,
    paddingRight: applyRight ? `${safeAreaInsets.right}px` : 0,
  }

  return (
    <div style={style} className={className}>
      {children}
    </div>
  )
}

export { FarcasterContext }
