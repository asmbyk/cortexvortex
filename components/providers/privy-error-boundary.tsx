"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, ExternalLink, Wallet } from "lucide-react"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class PrivyErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Privy Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const isAllowlistError =
        this.state.error?.message?.includes("Allowlist") ||
        this.state.error?.message?.includes("not found on Allowlist")

      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <Card className="cosmic-card max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-marker mb-4 glow-text-pink">
                {isAllowlistError ? "Domain Not Allowed" : "Wallet Connection Error"}
              </h2>

              {isAllowlistError ? (
                <div className="space-y-4">
                  <p className="font-comic text-gray-300 mb-4">
                    This domain is not on the Privy allowlist. You can continue using the app without wallet features.
                  </p>

                  <div className="bg-black/40 rounded-lg p-4 text-left mb-4">
                    <p className="text-sm text-gray-400 mb-2">To fix this:</p>
                    <ol className="text-xs text-gray-300 space-y-1 list-decimal list-inside">
                      <li>Go to dashboard.privy.io</li>
                      <li>Add current domain to allowlist</li>
                      <li>Refresh this page</li>
                    </ol>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        localStorage.setItem("skip-privy", "true")
                        window.location.reload()
                      }}
                      className="w-full cosmic-button"
                    >
                      Continue Without Wallet
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => window.location.reload()}
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>

                    <Button variant="ghost" asChild className="w-full text-blue-400 hover:text-blue-300">
                      <a href="https://dashboard.privy.io" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Privy Dashboard
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-comic text-gray-300 mb-4">
                    There was an error connecting to the wallet service. You can continue without wallet features.
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        localStorage.setItem("skip-privy", "true")
                        window.location.reload()
                      }}
                      className="w-full cosmic-button"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Continue Without Wallet
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => window.location.reload()}
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry Connection
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-xs text-blue-300 font-comic">
                  All story generation features work without wallet connection. Only NFT minting requires a wallet.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
