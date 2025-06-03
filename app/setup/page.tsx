"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Key, Shield, Zap, Copy } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  const steps = [
    {
      title: "Get Privy App ID",
      description: "Create a Privy account and get your App ID",
      icon: <Shield className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600",
      steps: [
        "Go to https://dashboard.privy.io",
        "Create an account or sign in",
        "Create a new app",
        "Copy your App ID (starts with prv_app_)",
        "Add to environment: NEXT_PUBLIC_PRIVY_APP_ID",
      ],
      envVar: "NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here",
    },
    {
      title: "Get Coinbase Cloud API Key",
      description: "Get API key for Base network RPC access",
      icon: <Key className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-400",
      steps: [
        "Go to https://cloud.coinbase.com",
        "Create an account or sign in",
        "Navigate to API Keys section",
        "Create a new API key",
        "Copy the API key",
        "Add to environment: COINBASE_CLOUD_API_KEY (server-side only)",
      ],
      envVar: "COINBASE_CLOUD_API_KEY=your_coinbase_cloud_api_key_here",
    },
    {
      title: "Alternative: Alchemy API Key",
      description: "Alternative RPC provider for Base network",
      icon: <Zap className="h-6 w-6" />,
      color: "from-green-400 to-emerald-500",
      steps: [
        "Go to https://dashboard.alchemy.com",
        "Create an account or sign in",
        "Create a new app on Base network",
        "Copy the API key",
        "Add to environment: ALCHEMY_API_KEY (server-side only)",
      ],
      envVar: "ALCHEMY_API_KEY=your_alchemy_api_key_here",
    },
  ]

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none text-lg font-comic">
          <Key className="mr-2 h-4 w-4" />
          Setup Required
        </Badge>

        <h1 className="text-5xl md:text-6xl font-marker font-bold mb-6 glow-text-rainbow">
          Configuration
          <br />
          <span className="glow-text-neon">Setup Guide</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-comic">
          Follow these steps to configure <span className="glow-text-pink font-bold">Privy authentication</span> and{" "}
          <span className="glow-text-blue font-bold">Base network</span> connectivity
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        {steps.map((step, index) => (
          <Card key={index} className="cosmic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-marker glow-text-blue">{step.title}</h3>
                  <p className="text-gray-400 font-comic">{step.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-marker text-lg mb-3 glow-text-pink">Steps:</h4>
                  <ol className="space-y-2">
                    {step.steps.map((stepItem, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-3 text-gray-300 font-comic">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        {stepItem}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-marker text-lg mb-3 glow-text-green">Environment Variable:</h4>
                  <div className="bg-black/40 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Add to .env.local:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(step.envVar)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <code className="text-sm text-green-400 font-mono break-all">{step.envVar}</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <div className="cosmic-card p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-marker font-bold mb-4 glow-text-neon">Important Notes</h2>
          <div className="text-left space-y-3 text-gray-300 font-comic mb-6">
            <p>
              <strong className="text-blue-400">RPC API Keys:</strong> These are now handled securely on the
              server-side. No API keys are exposed in client code.
            </p>
            <p>
              <strong className="text-purple-400">Privy App ID:</strong> This is public-facing and safe to expose in
              client code.
            </p>
            <p>
              <strong className="text-green-400">Security:</strong> All sensitive API keys are now server-side only.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild className="border-white/20 hover:border-purple-500/50">
              <a href="https://docs.privy.io" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Privy Docs
              </a>
            </Button>
            <Button variant="outline" asChild className="border-white/20 hover:border-blue-500/50">
              <a href="https://docs.cloud.coinbase.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Coinbase Cloud Docs
              </a>
            </Button>
            <Link href="/">
              <Button className="cosmic-button">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
