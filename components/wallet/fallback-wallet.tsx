"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, AlertTriangle, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function FallbackWallet() {
  const handleConnectWallet = () => {
    // Clear the skip flag and reload
    localStorage.removeItem("skip-privy")
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Wallet Disabled
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 cosmic-card border-white/20" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>

            <div>
              <h3 className="font-marker text-lg text-yellow-400 mb-2">Wallet Features Disabled</h3>
              <p className="text-sm text-gray-400 font-comic">
                You're currently using the app without wallet connection. Some features are limited.
              </p>
            </div>

            <div className="bg-black/40 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Story Generation:</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Available</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">NFT Minting:</span>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Disabled</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Wallet Features:</span>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Disabled</Badge>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/20" />

        <DropdownMenuItem
          onClick={handleConnectWallet}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
        >
          <Wallet className="mr-2 h-4 w-4" />
          <span>Enable Wallet Features</span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="/setup" className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
            <ExternalLink className="h-4 w-4" />
            Setup Guide
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
