"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import StoryGenerator from "@/components/story-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Wand2, BookOpen, Users, Zap } from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"

// Matt Furie karakterleri
const characters = [
  {
    id: "pepe",
    name: "Pepe the Frog",
    image: "/images/pepe-new.png",
    description: "The iconic frog character created by Matt Furie, known for his laid-back attitude and adventures.",
  },
  {
    id: "landwolf",
    name: "Landwolf",
    image: "/images/landwolf.png",
    description: "A mystical wolf creature with a connection to the land and nature.",
  },
  {
    id: "brett",
    name: "Brett",
    image: "/images/brett.png",
    description: "A chill dude who's always up for an adventure with his friends.",
  },
  {
    id: "andy",
    name: "Andy",
    image: "/images/andy.png",
    description: "A philosophical one of the group, always contemplating the universe.",
  },
  {
    id: "toki",
    name: "Toki",
    image: "/images/toki.png",
    description: "A mysterious character with magical abilities and cosmic knowledge.",
  },
  {
    id: "duckess",
    name: "Duckess",
    image: "/images/duckess.png",
    description: "A duck character with a royal attitude and elegant demeanor.",
  },
  {
    id: "ratsmile",
    name: "Ratsmile",
    image: "/images/ratsmile.png",
    description: "A mischievous rat with a permanent grin and knack for trouble.",
  },
  {
    id: "wat",
    name: "Wat",
    image: "/images/wat.png",
    description: "A peculiar character who's always confused but somehow wise.",
  },
]

// Örnek hikaye başlangıçları
const storyStarters = [
  "A cosmic journey through the psychedelic universe",
  "An unexpected adventure in the magical forest",
  "The day the sky turned purple and the animals could talk",
  "A mysterious portal opens in the middle of the city",
  "The gang discovers an ancient artifact with strange powers",
  "When the moon turned into a disco ball",
  "The interdimensional road trip that changed everything",
  "A day at the beach turns into a underwater civilization discovery",
]

export default function CreatePage() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("characters")
  const [selectedStoryStarter, setSelectedStoryStarter] = useState<string>("")
  const router = useRouter()
  const { login } = usePrivy()

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId === selectedCharacter ? null : characterId)
  }

  const handleStoryStarterSelect = (starter: string) => {
    setSelectedStoryStarter(starter)
    setActiveTab("create")
    // Scroll to the story generator
    setTimeout(() => {
      document.getElementById("story-generator")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleCreateWithCharacter = () => {
    setActiveTab("create")
    setTimeout(() => {
      document.getElementById("story-generator")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleWalletConnect = () => {
    login()
  }

  const getSelectedCharacterData = () => {
    return characters.find((c) => c.id === selectedCharacter)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-marker glow-text-rainbow mb-4">Create Your Story</h1>
          <p className="text-xl text-gray-300 font-comic">Generate psychedelic adventures in Matt Furie's universe</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-3 h-16 bg-black/20 border-2 border-white/10 rounded-xl">
            <TabsTrigger
              value="characters"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg h-12 font-comic text-lg"
            >
              <Users className="mr-2 h-5 w-5" />
              Characters
            </TabsTrigger>
            <TabsTrigger
              value="starters"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg h-12 font-comic text-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Story Starters
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg h-12 font-comic text-lg"
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Create Story
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-marker glow-text-blue mb-4">Choose a Character</h2>
              <p className="text-gray-300 font-comic">
                Select a character to feature in your story. Each character brings their own unique vibe to the
                adventure!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((character) => (
                <Card
                  key={character.id}
                  className={`cosmic-card cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedCharacter === character.id
                      ? "border-4 border-pink-500 shadow-lg shadow-pink-500/20"
                      : "border-2 border-white/10"
                  }`}
                  onClick={() => handleCharacterSelect(character.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-b from-purple-500/20 to-pink-500/20">
                      <Image
                        src={character.image || "/placeholder.svg"}
                        alt={character.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="text-xl font-marker mb-2 glow-text-neon">{character.name}</h3>
                    <p className="text-sm text-gray-300 font-comic">{character.description}</p>

                    {selectedCharacter === character.id && (
                      <div className="mt-4">
                        <Button
                          onClick={handleCreateWithCharacter}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                        >
                          <Wand2 className="mr-2 h-4 w-4" />
                          Create with {character.name}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center space-y-4">
              {selectedCharacter ? (
                <Button onClick={handleCreateWithCharacter} className="cosmic-button text-lg px-8 py-6 h-auto">
                  <Wand2 className="mr-2 h-5 w-5" />
                  Continue with {getSelectedCharacterData()?.name}
                </Button>
              ) : (
                <Button onClick={() => setActiveTab("create")} className="cosmic-button text-lg px-8 py-6 h-auto">
                  <Wand2 className="mr-2 h-5 w-5" />
                  Create Without Character
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="starters" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-marker glow-text-blue mb-4">Story Starters</h2>
              <p className="text-gray-300 font-comic">
                Need inspiration? Choose one of these story starters to kickstart your creativity!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {storyStarters.map((starter, index) => (
                <Card
                  key={index}
                  className="cosmic-card cursor-pointer transition-all duration-300 hover:bg-white/5 border-2 border-white/10"
                  onClick={() => handleStoryStarterSelect(starter)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <p className="font-comic text-gray-200">{starter}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button onClick={() => setActiveTab("create")} className="cosmic-button text-lg px-8 py-6 h-auto">
                <BookOpen className="mr-2 h-5 w-5" />
                Skip to Story Creator
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-8">
            <div id="story-generator" className="scroll-mt-8">
              <StoryGenerator
                characterFocus={getSelectedCharacterData()?.name}
                initialPrompt={selectedStoryStarter}
                onWalletConnect={handleWalletConnect}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
