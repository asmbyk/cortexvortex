"use client"

import { useState } from "react"
import { useFarcaster } from "./farcaster-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, User } from "lucide-react"

export function FarcasterStoryCreator() {
  const { context, isInFarcaster, capabilities } = useFarcaster()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  if (!isInFarcaster) {
    return null
  }

  const handleHapticFeedback = async () => {
    if (capabilities.includes("haptics.impactOccurred")) {
      try {
        // @ts-ignore - Farcaster SDK
        await window.farcaster?.sdk?.haptics?.impactOccurred("medium")
      } catch (error) {
        console.warn("Haptic feedback failed:", error)
      }
    }
  }

  const handleGenerateStory = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    await handleHapticFeedback()

    try {
      // Your story generation logic here
      console.log("Generating story for Farcaster user:", context?.user.username)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } catch (error) {
      console.error("Story generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-marker text-purple-400">
          <User className="h-5 w-5" />
          Welcome to Cortex Vortex, {context?.user.displayName || context?.user.username}!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 font-comic">
          Create your personalized psychedelic story featuring Matt Furie's iconic characters.
        </p>

        <Textarea
          placeholder="Describe your story idea... (e.g., 'Pepe discovers a magical portal')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder-gray-400"
          rows={3}
        />

        <Button
          onClick={handleGenerateStory}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Generating Your Story...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Story
            </>
          )}
        </Button>

        {context?.location?.type === "cast_embed" && (
          <p className="text-xs text-purple-400 text-center">
            🎭 This story will be inspired by the cast you came from!
          </p>
        )}
      </CardContent>
    </Card>
  )
}
