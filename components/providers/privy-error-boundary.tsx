"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface PrivyErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface PrivyErrorBoundaryProps {
  children: React.ReactNode
}

export class PrivyErrorBoundary extends React.Component<PrivyErrorBoundaryProps, PrivyErrorBoundaryState> {
  constructor(props: PrivyErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): PrivyErrorBoundaryState {
    // Privy allowlist hatalarını yakala
    if (error.message?.includes("not found on Allowlist") || error.message?.includes("cloud.reown.com")) {
      return { hasError: true, error }
    }
    return { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Privy initialization error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="cosmic-card max-w-md w-full text-center p-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>

            <h2 className="text-2xl font-marker mb-4 glow-text-pink">Wallet Service Unavailable</h2>

            <p className="font-comic text-gray-300 mb-6">
              The wallet connection service is temporarily unavailable in this preview environment. All story generation
              features work without wallet connection.
            </p>

            <div className="space-y-3">
              <Button onClick={() => window.location.reload()} className="w-full cosmic-button">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>

              <Button
                onClick={() => this.setState({ hasError: false })}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Continue Without Wallet
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Note:</strong> All story generation features work without wallet connection. Only NFT minting
                requires a wallet.
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
