"use client"

import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Wallet, LogOut, Copy } from "lucide-react"
import { useState } from "react"

export default function OnchainWallet() {
  const { login, logout, authenticated, user } = usePrivy()
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    if (user?.wallet?.address) {
      navigator.clipboard.writeText(user.wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!authenticated) {
    return (
      <Button onClick={login} className="cosmic-button text-sm font-bold">
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cosmic-card border-purple-500/30 hover:border-purple-400/50 text-white">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm">{user?.wallet?.address ? formatAddress(user.wallet.address) : "Connected"}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="cosmic-card border-purple-500/30 bg-black/90 text-white">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">Connected Account</p>
          {user?.email && <p className="text-xs text-gray-400">{user.email}</p>}
        </div>
        <DropdownMenuSeparator className="bg-purple-500/30" />
        {user?.wallet?.address && (
          <DropdownMenuItem onClick={handleCopyAddress} className="hover:bg-purple-500/20 cursor-pointer">
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy Address"}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={logout} className="hover:bg-red-500/20 cursor-pointer text-red-400">
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
