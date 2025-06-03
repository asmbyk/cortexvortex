"use client"

import type { ReactNode } from "react"
import { useFarcaster } from "./farcaster-provider"

interface SafeAreaWrapperProps {
  children: ReactNode
  className?: string
}

export function SafeAreaWrapper({ children, className = "" }: SafeAreaWrapperProps) {
  const { context } = useFarcaster()

  const safeAreaInsets = context?.client.safeAreaInsets || {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }

  return (
    <div
      className={className}
      style={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
      }}
    >
      {children}
    </div>
  )
}
