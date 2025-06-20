"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, AlertTriangle, Trash2, BookOpen, Wand2, Sparkles, Wallet, Crown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import NFTMinting from "@/components/nft-minting"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import Image from "next/image"

interface StoryGeneratorProps {
  initialPrompt?: string
  characterFocus?: string
  onWalletConnect?: () => void
}

export default function StoryGenerator({ initialPrompt = "", characterFocus, onWalletConnect }: StoryGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [story, setStory] = useState("")
  const [storyTitle, setStoryTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFallback, setIsFallback] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { authenticated, user, login } = usePrivy()

  // Karakter seçildiğinde veya initial prompt değiştiğinde prompt'u güncelle
  useEffect(() => {
    if (initialPrompt && initialPrompt !== prompt) {
      setPrompt(initialPrompt)
    }
  }, [initialPrompt])

  useEffect(() => {
    if (characterFocus && !prompt) {
      setPrompt(`Write a psychedelic adventure story featuring ${characterFocus}`)
    }
  }, [characterFocus])

  // Karakter bilgilerini al
  const getCharacterImage = (characterName: string) => {
    const characterMap: { [key: string]: string } = {
      "Pepe the Frog": "/images/pepe-new.png",
      Landwolf: "/images/landwolf.png",
      Brett: "/images/brett.png",
      Andy: "/images/andy.png",
      Toki: "/images/toki.png",
      Duckess: "/images/duckess.png",
      Ratsmile: "/images/ratsmile.png",
      Wat: "/images/wat.png",
    }
    return characterMap[characterName] || "/placeholder.svg"
  }

  async function generateStory() {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setStory("")
    setIsFallback(false)

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          characterFocus,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        throw new Error(`Server error (${response.status}): ${errorText}`)
      }

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}`)
      }

      if (data.story) {
        setStory(data.story)
        setStoryTitle(`${prompt.slice(0, 30)}${prompt.length > 30 ? "..." : ""} - Cortex Vortex Story`)

        if (data.isFailback) {
          setIsFallback(true)
          toast({
            title: "Using Fallback Story",
            description: "We couldn't generate a unique story at the moment. Please try again later.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Story Generated! ✨",
            description: "Your psychedelic adventure is ready!",
          })
        }
      } else {
        throw new Error(data.error || "No story returned from API")
      }
    } catch (error) {
      console.error("Story generation error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate story. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  function resetForm() {
    setPrompt("")
    setStory("")
    setStoryTitle("")
    setIsFallback(false)
  }

  function viewFullStory() {
    if (story && storyTitle) {
      const slug = storyTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      if (typeof window !== "undefined") {
        const savedStories = JSON.parse(localStorage.getItem("savedStories") || "{}")
        savedStories[slug] = {
          title: storyTitle,
          prompt: prompt,
          content: story,
          image: "/placeholder.svg?height=300&width=600",
          slug: slug,
          author: "Cortex Vortex AI",
          date: new Date().toISOString().split("T")[0],
          characters: characterFocus ? [characterFocus] : [],
          relatedStories: ["cosmic-soup-adventure", "night-riders-moon-mission"],
        }
        localStorage.setItem("savedStories", JSON.stringify(savedStories))
      }

      router.push(`/story/${slug}`)
    } else {
      toast({
        title: "No Story Found",
        description: "There's no story to view. Please generate a story first.",
        variant: "destructive",
      })
    }
  }

  const handleWalletConnect = () => {
    console.log("Wallet connect clicked")
    if (onWalletConnect) {
      onWalletConnect()
    } else {
      try {
        login()
      } catch (error) {
        console.error("Login error:", error)
        toast({
          title: "Connection Error",
          description: "Unable to connect wallet. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Wallet Status Banner */}
      <Card className="cosmic-card border-2 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {authenticated ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-comic text-green-400 font-bold">Wallet Connected</p>
                    <p className="text-sm text-gray-400">
                      Welcome back, {user?.email?.address || user?.google?.name || "Creator"}!
                    </p>
                  </div>
                  <Crown className="h-5 w-5 text-yellow-500" />
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <div>
                    <p className="font-comic text-gray-400">No Wallet Connected</p>
                    <p className="text-sm text-gray-500">Connect for premium features</p>
                  </div>
                  <Wallet className="h-5 w-5 text-gray-500" />
                </>
              )}
            </div>
            {!authenticated && (
              <Button
                onClick={handleWalletConnect}
                variant="outline"
                size="sm"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Character Display */}
      {characterFocus && (
        <div className="mb-6 flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-b from-purple-500/20 to-pink-500/20">
            <Image
              src={getCharacterImage(characterFocus) || "/placeholder.svg"}
              alt={characterFocus}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <h3 className="text-xl font-marker glow-text-pink">Creating with {characterFocus}</h3>
            <p className="text-sm text-gray-300 font-comic">
              Your story will feature this character in a starring role
            </p>
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-xl font-marker mb-4 glow-text-blue">
            Describe Your Story Idea:
          </label>
          <Textarea
            id="prompt"
            placeholder={
              characterFocus
                ? `Write a psychedelic adventure featuring ${characterFocus}...`
                : "Enter your wildest story idea... (e.g., 'An astronaut lands on a planet made of cheese and meets dancing aliens')"
            }
            className="min-h-32 text-lg bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent font-comic resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {characterFocus && (
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none">
              <Sparkles className="mr-1 h-3 w-3" />
              Featuring: {characterFocus}
            </Badge>
          </div>
        )}

        <Button
          onClick={generateStory}
          disabled={!prompt.trim() || isGenerating}
          className="w-full h-16 text-xl font-comic bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 border-none rounded-2xl"
        >
          {isGenerating ? (
            <>
              <div className="cosmic-loader mr-3 w-6 h-6"></div>
              Channeling the Vortex...
            </>
          ) : (
            <>
              <Wand2 className="mr-3 h-6 w-6" />
              Generate Psychedelic Story
            </>
          )}
        </Button>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="cosmic-card p-12 text-center">
          <div className="cosmic-loader mx-auto mb-6"></div>
          <h3 className="text-2xl font-marker font-bold mb-4 glow-text-neon">Creating Your Story...</h3>
          <p className="text-gray-400 font-comic animate-pulse">
            The AI is diving deep into Matt Furie's psychedelic universe...
          </p>
        </div>
      )}

      {/* Generated Story */}
      {story && !isGenerating && (
        <div className="space-y-6">
          {isFallback && (
            <div className="cosmic-card p-6 border-2 border-yellow-500/30">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                <h3 className="font-marker text-lg text-yellow-400">Fallback Story Active</h3>
              </div>
              <p className="text-sm text-yellow-300 font-comic">
                We're using a backup story due to technical issues. Please try again later for a unique AI-generated
                story.
              </p>
            </div>
          )}

          {/* Story Display */}
          <div className="cosmic-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-pink-500" />
              <h3 className="text-2xl font-marker font-bold glow-text-pink">Your Generated Story</h3>
            </div>
            <div className="bg-black/40 rounded-2xl p-6 mb-6 max-h-96 overflow-y-auto">
              <div className="whitespace-pre-line font-comic text-gray-200 leading-relaxed">{story}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={generateStory}
                className="w-full h-14 border-2 border-white/20 hover:border-blue-500/50 bg-white/5 hover:bg-white/10 text-white font-comic"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Generate New Story
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                className="w-full h-14 border-2 border-white/20 hover:border-red-500/50 bg-white/5 hover:bg-white/10 text-white font-comic"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Clear Everything
              </Button>
            </div>

            <div className="space-y-4">
              <Button
                onClick={viewFullStory}
                className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-comic"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                View Full Story Page
              </Button>

              {/* NFT Minting - Sadece wallet bağlıysa göster */}
              {authenticated ? (
                <div className="cosmic-card">
                  <NFTMinting storyTitle={storyTitle} storyContent={story} />
                </div>
              ) : (
                <Card className="cosmic-card border-2 border-purple-500/30">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Crown className="h-5 w-5 text-purple-400" />
                      <span className="font-comic text-purple-400 font-bold">Premium Feature</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Connect your wallet to mint your stories as NFTs</p>
                    <Button
                      onClick={handleWalletConnect}
                      variant="outline"
                      size="sm"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
