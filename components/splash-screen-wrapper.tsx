"use client"

import type React from "react"

import { useState, useEffect } from "react"
import SplashScreen from "./splash-screen"

interface SplashScreenWrapperProps {
  children: React.ReactNode
}

function SplashScreenWrapper({ children }: SplashScreenWrapperProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Her zaman splash screen'i göster (test için)
    // Daha sonra sessionStorage kontrolünü geri ekleyebiliriz
    const visited = false // sessionStorage.getItem("splash-seen")
    if (visited) {
      setShowSplash(false)
      setHasVisited(true)
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem("splash-seen", "true")
    setShowSplash(false)
    setHasVisited(true)
  }

  if (showSplash && !hasVisited) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return <>{children}</>
}

export { SplashScreenWrapper }
export default SplashScreenWrapper
