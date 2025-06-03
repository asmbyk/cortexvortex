"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext, type ReactNode } from "react"

interface FarcasterContextType {
  isMiniApp: boolean
  isReady: boolean
  context: any | null
  sdk: any | null
}

const FarcasterContext = createContext<FarcasterContextType>({
  isMiniApp: false,
  isReady: false,
  context: null,
  sdk: null,
})

interface FarcasterProviderProps {
  children: ReactNode
}

export const FarcasterProvider: React.FC<FarcasterProviderProps> = ({ children }) => {
  const [isMiniApp, setIsMiniApp] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [context, setContext] = useState<any | null>(null)
  const [sdk, setSdk] = useState<any | null>(null)

  useEffect(() => {
    // Detect if running as Mini App
    const url = new URL(window.location.href)
    const isMiniApp =
      url.pathname.startsWith("/mini") || url.searchParams.get("miniApp") === "true" || window.parent !== window // Running in iframe

    setIsMiniApp(isMiniApp)

    if (isMiniApp) {
      // Dynamically import Farcaster SDK for Mini App mode
      import("@farcaster/frame-sdk")
        .then(({ sdk }) => {
          setSdk(sdk)

          // Initialize SDK
          sdk.actions
            .ready()
            .then(() => {
              setContext(sdk.context)
              setIsReady(true)
            })
            .catch(console.error)
        })
        .catch(console.error)
    } else {
      // Regular web app mode
      setIsReady(true)
    }
  }, [])

  return <FarcasterContext.Provider value={{ isMiniApp, isReady, context, sdk }}>{children}</FarcasterContext.Provider>
}

export const useFarcaster = () => useContext(FarcasterContext)
