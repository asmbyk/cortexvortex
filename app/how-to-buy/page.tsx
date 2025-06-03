"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wallet,
  Copy,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle,
  Zap,
  ArrowRight,
  Globe,
  Coins,
  Settings,
  TrendingUp,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function HowToBuyPage() {
  const [copiedCA, setCopiedCA] = useState(false)
  const { toast } = useToast()

  const contractAddress = "SOON" // Will be updated when contract is deployed

  const copyToClipboard = (text: string) => {
    if (text === "SOON") {
      toast({
        title: "Coming Soon!",
        description: "Contract address will be available when the token launches on Base network.",
        variant: "default",
      })
      return
    }

    navigator.clipboard.writeText(text)
    setCopiedCA(true)
    toast({
      title: "Copied!",
      description: "Contract address copied to clipboard",
    })
    setTimeout(() => setCopiedCA(false), 2000)
  }

  const steps = [
    {
      number: "01",
      title: "Set Up Your Wallet",
      description: "Download and install a Web3 wallet that supports Base network",
      icon: <Wallet className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-400",
      details: [
        "Download MetaMask, Coinbase Wallet, or Rainbow Wallet",
        "Create a new wallet or import existing one",
        "Secure your seed phrase safely",
        "Enable browser extension or mobile app",
      ],
    },
    {
      number: "02",
      title: "Add Base Network",
      description: "Configure your wallet to connect to Base (Ethereum L2)",
      icon: <Settings className="h-8 w-8" />,
      color: "from-purple-500 to-pink-600",
      details: [
        "Open wallet settings and add custom network",
        "Network Name: Base",
        "RPC URL: https://mainnet.base.org",
        "Chain ID: 8453",
        "Currency Symbol: ETH",
      ],
    },
    {
      number: "03",
      title: "Get ETH on Base",
      description: "Bridge ETH to Base network or buy directly on Base",
      icon: <Coins className="h-8 w-8" />,
      color: "from-green-400 to-emerald-500",
      details: [
        "Use Base Bridge to transfer ETH from Ethereum mainnet",
        "Buy ETH directly on Base via Coinbase",
        "Use other bridges like Across or Hop Protocol",
        "Ensure you have enough ETH for gas fees",
      ],
    },
    {
      number: "04",
      title: "Connect to Uniswap",
      description: "Access Uniswap V3 on Base network to swap for CORTEX",
      icon: <Globe className="h-8 w-8" />,
      color: "from-yellow-400 to-orange-500",
      details: [
        "Go to app.uniswap.org",
        "Connect your wallet",
        "Switch to Base network",
        "Navigate to the swap interface",
      ],
    },
    {
      number: "05",
      title: "Swap ETH for CORTEX",
      description: "Use the contract address to find and purchase CORTEX tokens",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "from-pink-500 to-purple-600",
      details: [
        "Paste CORTEX contract address in token search",
        "Set slippage to 3-5% for smooth transactions",
        "Enter amount of ETH you want to swap",
        "Confirm transaction and wait for completion",
      ],
    },
  ]

  const wallets = [
    {
      name: "MetaMask",
      description: "Most popular Web3 wallet",
      url: "https://metamask.io",
      icon: "🦊",
    },
    {
      name: "Coinbase Wallet",
      description: "Native Base network support",
      url: "https://wallet.coinbase.com",
      icon: "🔵",
    },
    {
      name: "Rainbow Wallet",
      description: "Beautiful and user-friendly",
      url: "https://rainbow.me",
      icon: "🌈",
    },
  ]

  const exchanges = [
    {
      name: "Uniswap V3",
      description: "Primary DEX on Base",
      url: "https://app.uniswap.org",
      icon: "🦄",
    },
    {
      name: "Aerodrome",
      description: "Base native DEX",
      url: "https://aerodrome.finance",
      icon: "✈️",
    },
    {
      name: "BaseSwap",
      description: "Community favorite",
      url: "https://baseswap.fi",
      icon: "🔄",
    },
  ]

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 left-10 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-64 right-20 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white border-none text-lg font-comic">
            <Coins className="mr-2 h-4 w-4" />
            Base Network Token
          </Badge>

          <h1 className="text-6xl md:text-7xl font-marker font-bold mb-6 glow-text-rainbow">
            How to Buy
            <br />
            <span className="glow-text-neon">CORTEX</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-comic">
            Follow this step-by-step guide to purchase <span className="glow-text-pink font-bold">CORTEX tokens</span>{" "}
            on the <span className="glow-text-blue font-bold">Base network</span>
          </p>
        </div>

        {/* Contract Address Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="cosmic-card border-2 border-yellow-500/30">
            <CardHeader className="text-center">
              <CardTitle className="font-marker text-2xl glow-text-yellow flex items-center justify-center gap-3">
                <Shield className="h-6 w-6" />
                Contract Address
                <Shield className="h-6 w-6" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-black/40 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <code className="text-2xl font-mono text-yellow-400 break-all">{contractAddress}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(contractAddress)}
                    className="border-yellow-500/50 hover:border-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20"
                  >
                    {copiedCA ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  Coming Soon - Base Network Launch
                </Badge>
              </div>

              <Alert className="border-yellow-500/30 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-200 font-comic">
                  <strong>Always verify the contract address!</strong> Only use the official address from our verified
                  social media channels.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-marker font-bold mb-4 glow-text-blue">Step-by-Step Guide</h2>
            <p className="text-lg text-gray-400 font-comic">Your journey to owning CORTEX tokens starts here</p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="cosmic-card p-8">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}
                      >
                        {step.icon}
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-marker font-bold glow-text-blue">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-marker font-bold mb-3 glow-text-pink">{step.title}</h3>
                      <p className="text-lg text-gray-300 mb-6 font-comic">{step.description}</p>

                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3 text-gray-400 font-comic">
                            <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-6">
                    <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Wallets */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-marker font-bold mb-4 glow-text-green">Recommended Wallets</h2>
            <p className="text-lg text-gray-400 font-comic">Choose a wallet that supports Base network</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wallets.map((wallet, index) => (
              <div key={index} className="cosmic-card p-6 text-center group">
                <div className="text-4xl mb-4">{wallet.icon}</div>
                <h3 className="text-xl font-marker font-bold mb-2 glow-text-blue">{wallet.name}</h3>
                <p className="text-gray-400 font-comic mb-4">{wallet.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-white/20 hover:border-blue-500/50 bg-white/5 hover:bg-white/10"
                  asChild
                >
                  <a href={wallet.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Exchanges */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-marker font-bold mb-4 glow-text-purple">Where to Trade</h2>
            <p className="text-lg text-gray-400 font-comic">Decentralized exchanges supporting CORTEX on Base</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exchanges.map((exchange, index) => (
              <div key={index} className="cosmic-card p-6 text-center group">
                <div className="text-4xl mb-4">{exchange.icon}</div>
                <h3 className="text-xl font-marker font-bold mb-2 glow-text-purple">{exchange.name}</h3>
                <p className="text-gray-400 font-comic mb-4">{exchange.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-white/20 hover:border-purple-500/50 bg-white/5 hover:bg-white/10"
                  asChild
                >
                  <a href={exchange.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Trade Now
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Warning */}
        <div className="max-w-4xl mx-auto mb-16">
          <Alert className="border-red-500/30 bg-red-500/10">
            <Shield className="h-5 w-5 text-red-500" />
            <AlertDescription className="text-red-200 font-comic">
              <strong className="text-red-400">Security Reminder:</strong> Never share your private keys or seed phrase.
              Always verify contract addresses from official sources. Be aware of impersonators and scam tokens. Only
              use official links from our verified social media accounts.
            </AlertDescription>
          </Alert>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="cosmic-card p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-marker font-bold mb-6 glow-text-neon">
              Ready to Join the Vortex?
            </h2>
            <p className="text-lg text-gray-300 mb-8 font-comic">
              Follow our social media for the latest updates on the Base network launch and trading opportunities!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="cosmic-button text-lg px-8 py-4" asChild>
                <a href="https://t.me/cortexvortex" target="_blank" rel="noopener noreferrer">
                  <Zap className="mr-2 h-5 w-5" />
                  Join Telegram
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/20 hover:border-blue-500/50 bg-white/5 hover:bg-white/10 text-white text-lg px-8 py-4 font-comic"
                asChild
              >
                <a href="https://x.com/cortexvortexx" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Follow Twitter
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
