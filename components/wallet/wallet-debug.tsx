"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useAccount, useBalance, useChainId } from "wagmi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Wifi, Shield } from "lucide-react"
import { base } from "wagmi/chains"
import { useEffect, useState } from "react"

export default function WalletDebug() {
  const { authenticated, user } = usePrivy()
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const [rpcStatus, setRpcStatus] = useState<{ isConfigured: boolean; provider: string }>({
    isConfigured: false,
    provider: "Loading...",
  })

  // RPC durumunu kontrol et
  useEffect(() => {
    async function checkRpcStatus() {
      try {
        const response = await fetch("/api/rpc-config")
        if (response.ok) {
          const data = await response.json()
          // URL'den provider tipini belirle
          let provider = "Public RPC"
          if (data.baseRpcUrl.includes("coinbase")) {
            provider = "Coinbase Cloud"
          } else if (data.baseRpcUrl.includes("alchemy")) {
            provider = "Alchemy"
          }

          setRpcStatus({
            isConfigured: data.baseRpcUrl !== "https://mainnet.base.org",
            provider,
          })
        }
      } catch (error) {
        console.error("Failed to check RPC status:", error)
      }
    }

    checkRpcStatus()
  }, [])

  // Privy App ID kontrolü
  const privyAppId = typeof window !== "undefined" && !!process.env.NEXT_PUBLIC_PRIVY_APP_ID

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
  }

  const getChainName = (id: number) => {
    if (id === base.id) return "Base Mainnet"
    return `Unknown Chain (${id})`
  }

  return (
    <Card className="cosmic-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-marker text-xl glow-text-blue flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Wallet Connection Debug
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Environment Variables Status */}
        <div>
          <h3 className="font-marker text-lg mb-3 glow-text-pink">Environment Configuration</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-comic">Privy App ID:</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(privyAppId)}
                <Badge variant={privyAppId ? "default" : "destructive"}>{privyAppId ? "Configured" : "Missing"}</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-comic">RPC Provider:</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(rpcStatus.isConfigured)}
                <Badge variant={rpcStatus.isConfigured ? "default" : "secondary"}>{rpcStatus.provider}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Privy Status */}
        <div>
          <h3 className="font-marker text-lg mb-3 glow-text-green">Privy Authentication</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-comic">Authenticated:</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(authenticated)}
                <Badge variant={authenticated ? "default" : "secondary"}>{authenticated ? "Yes" : "No"}</Badge>
              </div>
            </div>
            {authenticated && user && (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-comic">User ID:</span>
                  <code className="text-sm text-blue-400">{user.id.slice(0, 8)}...</code>
                </div>
                {user.email && (
                  <div className="flex items-center justify-between">
                    <span className="font-comic">Email:</span>
                    <span className="text-sm text-gray-300">{user.email.address}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Wallet Status */}
        <div>
          <h3 className="font-marker text-lg mb-3 glow-text-purple">Wallet Connection</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-comic">Connected:</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(isConnected)}
                <Badge variant={isConnected ? "default" : "secondary"}>{isConnected ? "Yes" : "No"}</Badge>
              </div>
            </div>
            {isConnected && address && (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-comic">Address:</span>
                  <code className="text-sm text-blue-400">{`${address.slice(0, 6)}...${address.slice(-4)}`}</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-comic">Balance:</span>
                  <span className="text-sm text-green-400">
                    {balance ? `${Number.parseFloat(balance.formatted).toFixed(4)} ETH` : "Loading..."}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-comic">Network:</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{getChainName(chainId)}</Badge>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {(!privyAppId || !authenticated || !isConnected) && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <h4 className="font-marker text-yellow-400">Recommendations</h4>
            </div>
            <ul className="space-y-1 text-sm text-yellow-200 font-comic">
              {!privyAppId && <li>• Add NEXT_PUBLIC_PRIVY_APP_ID to environment variables</li>}
              {!authenticated && <li>• Click "Connect Wallet" to authenticate with Privy</li>}
              {authenticated && !isConnected && <li>• Connect your wallet through Privy interface</li>}
            </ul>
          </div>
        )}

        {/* Security Note */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <h4 className="font-marker text-blue-400">Security Note</h4>
          </div>
          <p className="text-sm text-blue-200 font-comic">
            All API keys are now securely handled on the server-side. No sensitive data is exposed in client code.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
