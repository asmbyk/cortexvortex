"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, LogOut, Copy, ExternalLink, Coins, User, Mail, Shield, CheckCircle, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePrivy } from "@privy-io/react-auth"
import { useAccount, useDisconnect, useChainId } from "wagmi"
import { useWallets } from "@privy-io/react-auth"
import { useBalance } from "wagmi"

export function ConnectWallet() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const { ready, authenticated, login, logout, user } = usePrivy()
  const { wallets } = useWallets()
  const account = useAccount()
  const { data: balanceData } = useBalance({ address: account.address })
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  const { address, isConnected } = account

  const isWalletConnected = ready && (authenticated || isConnected)

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      toast({
        title: "Address Copied! 🎉",
        description: "Wallet address copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (balance: any) => {
    if (!balance) return "0"
    return Number.parseFloat(balance.formatted).toFixed(4)
  }

  const handleLogout = () => {
    if (isConnected && disconnect) {
      disconnect()
    }
    logout()
  }

  const handleConnect = () => {
    login()
  }

  const handleDisconnect = () => {
    disconnect()
  }

  // Check if Privy is properly configured
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  if (!privyAppId) {
    return (
      <Button variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
        <AlertTriangle className="h-4 w-4 mr-2" />
        Config Required
      </Button>
    )
  }

  if (!ready) {
    return (
      <Button disabled className="cosmic-button animate-pulse">
        Loading...
      </Button>
    )
  }

  // If not authenticated, show connect button
  if (!authenticated) {
    return (
      <Button onClick={handleConnect} className="cosmic-button flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.farcaster?.pfp || user?.google?.profilePictureUrl || user?.twitter?.profilePictureUrl}
            />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          {isConnected && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 cosmic-card border-white/20" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user?.farcaster?.pfp || user?.google?.profilePictureUrl || user?.twitter?.profilePictureUrl}
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold">
                {user?.farcaster?.username?.[0]?.toUpperCase() ||
                  user?.email?.address?.[0]?.toUpperCase() ||
                  user?.wallet?.address?.[0]?.toUpperCase() ||
                  "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-comic font-bold text-white">
                {user?.farcaster?.displayName ||
                  user?.farcaster?.username ||
                  user?.google?.name ||
                  user?.twitter?.name ||
                  user?.email?.address ||
                  "Anonymous User"}
              </div>
              <div className="text-sm text-gray-400">
                {user?.farcaster?.username && (
                  <div className="flex items-center gap-1">
                    <span className="text-purple-400">@{user.farcaster.username}</span>
                  </div>
                )}
                {user?.email?.address && !user?.farcaster?.username && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {user.email.address}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          {isConnected && address ? (
            <div className="bg-black/40 rounded-lg p-3 space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Wallet Address:</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-blue-400">{formatAddress(address)}</code>
                  <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                    {copied ? <CheckCircle className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">ETH Balance:</span>
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-blue-400" />
                  <span className="font-mono text-blue-400">{formatBalance(balanceData)} ETH</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Network:</span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Shield className="mr-1 h-3 w-3" />
                  {chainId === 8453 ? "Base Mainnet" : `Chain ${chainId}`}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Wallet not connected</span>
              </div>
              <p className="text-xs text-yellow-300 mt-1">
                You're authenticated with Privy but no wallet is connected.
              </p>
            </div>
          )}

          {/* Connection Status */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-yellow-500"}`}></div>
            <span className="text-sm text-gray-400">
              {isConnected ? "Wallet Connected" : user?.farcaster ? "Farcaster Connected" : "Privy Authenticated"}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Quick Actions */}
        {isConnected && address && (
          <>
            <DropdownMenuItem asChild>
              <a
                href={`https://basescan.org/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <ExternalLink className="h-4 w-4" />
                View on BaseScan
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20" />
          </>
        )}

        {/* Farcaster Profile Link */}
        {user?.farcaster?.username && (
          <>
            <DropdownMenuItem asChild>
              <a
                href={`https://warpcast.com/${user.farcaster.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <ExternalLink className="h-4 w-4" />
                View Farcaster Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20" />
          </>
        )}

        <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect & Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ConnectWallet
