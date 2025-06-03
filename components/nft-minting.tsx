"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface NFTMintingProps {
  storyTitle: string
  storyContent: string
}

export default function NFTMinting({ storyTitle, storyContent }: NFTMintingProps) {
  const [isMinting, setIsMinting] = useState(false)
  const { toast } = useToast()

  async function handleMint() {
    setIsMinting(true)

    try {
      // This is a placeholder for the actual minting logic
      // In a real implementation, you would call a contract here
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Coming Soon!",
        description: "NFT minting will be available soon. Stay tuned!",
      })
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "There was an error minting your NFT. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-marker text-xl text-primary">Mint as NFT</CardTitle>
        <CardDescription className="font-comic">Turn your story into a unique NFT on the Base network</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 font-comic">
          Story: <span className="font-bold">{storyTitle || "Your Story"}</span>
        </p>
        <p className="text-xs text-muted-foreground font-comic">
          Minting will be available soon on the Base network. Connect your wallet to be ready!
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleMint} disabled={isMinting} className="w-full relative overflow-hidden group">
          {isMinting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Minting...
            </>
          ) : (
            <>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse"></span>
              <span className="relative">
                Mint as NFT
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] px-1 py-0.5 rounded-full">
                  Soon
                </span>
              </span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
