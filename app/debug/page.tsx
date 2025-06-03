import WalletDebug from "@/components/wallet/wallet-debug"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DebugPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-marker font-bold glow-text-rainbow mb-4">Wallet Debug</h1>
        <p className="text-lg text-gray-400 font-comic">
          Check your wallet connection status and environment configuration
        </p>
      </div>

      <WalletDebug />
    </div>
  )
}
