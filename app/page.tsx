import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Palette, Rocket, Stars, Wand2, Clock } from "lucide-react"

export default function HomePage() {
  const featuredStories = [
    {
      title: "The Cosmic Soup Adventure",
      prompt: "A chef discovers a new ingredient",
      excerpt:
        "Pepe and Landwolf stumbled upon the cosmic soup kitchen where Tubby Rainbow was stirring a pot filled with glowing liquid...",
      image: "/images/cosmic-soup-adventure.png",
      slug: "cosmic-soup-adventure",
      color: "from-pink-500 to-purple-600",
    },
    {
      title: "Night Riders' Moon Mission",
      prompt: "Astronauts land on the moon",
      excerpt:
        "Mystery and Hoodrat hijacked a cardboard rocket ship and blasted off to the cheese moon where Snurchins had established a colony...",
      image: "/images/night-riders-moon-mission.jpeg",
      slug: "night-riders-moon-mission",
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Pepe's Dimensional Doorway",
      prompt: "Someone finds a mysterious door",
      excerpt:
        "Feels good, man! Pepe discovered a vibrating purple door behind the refrigerator that opened into Duckess's quantum palace...",
      image: "/images/pepes-dimensional-doorway.jpeg",
      slug: "pepes-dimensional-doorway",
      color: "from-green-400 to-emerald-500",
    },
  ]

  const featuredCharacters = [
    { name: "Pepe", image: "/images/pepe-new.png", color: "bg-gradient-to-br from-green-400 to-blue-500" },
    { name: "Mystery", image: "/images/mystery.png", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { name: "Hoodrat", image: "/images/hoodrat.png", color: "bg-gradient-to-br from-orange-400 to-red-500" },
    { name: "Snurchins", image: "/images/snurchins.jpeg", color: "bg-gradient-to-br from-cyan-400 to-teal-500" },
  ]

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Stories",
      description: "Generate unique psychedelic tales using advanced AI technology",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Matt Furie Style",
      description: "Stories crafted in the distinctive style of the legendary artist",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Creation",
      description: "Transform any prompt into a fully-formed story in seconds",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Infinite Possibilities",
      description: "Explore endless combinations of characters and scenarios",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container px-4 mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-8 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white border-none text-lg font-comic">
            <Stars className="mr-2 h-4 w-4" />
            Enter the Psychedelic Universe
          </Badge>

          {/* Main Title */}
          <h1 className="font-marker font-bold mb-8 leading-none tracking-tight">
            <span
              className="text-7xl md:text-8xl lg:text-9xl block mb-2"
              style={{
                color: "white",
                textShadow:
                  "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(16, 185, 129, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)",
              }}
            >
              CORTEX
            </span>
            <span
              className="text-7xl md:text-8xl lg:text-9xl block"
              style={{
                color: "white",
                textShadow:
                  "0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)",
              }}
            >
              VORTEX
            </span>
          </h1>

          {/* Subtitle */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <p className="text-2xl md:text-3xl font-comic text-gray-300 mb-4">
              Where <span className="glow-text-pink font-bold">imagination</span> meets{" "}
              <span className="glow-text-blue font-bold">artificial intelligence</span>
            </p>
            <Badge className="mt-2 mb-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-cyan-500 hover:to-teal-400 text-white border-none text-md font-comic inline-flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Farcaster Mini App: Yakında! (Lansmandan sonra aktif olacaktır)
            </Badge>
            <p className="text-lg md:text-xl font-comic text-gray-400 max-w-2xl mx-auto">
              Transform any idea into a psychedelic story featuring Matt Furie's iconic characters
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-3xl mx-auto mb-16">
            <div className="cosmic-card p-8">
              <form className="flex flex-col sm:flex-row gap-4" action="/create" method="get">
                <div className="flex-1 relative">
                  <Input
                    name="prompt"
                    placeholder="Describe your wildest story idea..."
                    className="h-14 text-lg font-comic bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <Wand2 className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
                </div>
                <Button type="submit" className="cosmic-button h-14 px-8 text-lg font-comic">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Story
                </Button>
              </form>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/characters">
              <Button
                variant="outline"
                size="lg"
                className="cosmic-card border-2 border-white/20 hover:border-pink-500/50 bg-white/5 hover:bg-white/10 text-white text-lg font-comic px-8 py-4 rounded-2xl"
              >
                <Palette className="mr-2 h-5 w-5" />
                Meet the Characters
              </Button>
            </Link>
            <Link href="/timeline">
              <Button
                variant="outline"
                size="lg"
                className="cosmic-card border-2 border-white/20 hover:border-blue-500/50 bg-white/5 hover:bg-white/10 text-white text-lg font-comic px-8 py-4 rounded-2xl"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Explore Timeline
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="cosmic-card border-2 border-white/20 hover:border-green-500/50 bg-white/5 hover:bg-white/10 text-white text-lg font-comic px-8 py-4 rounded-2xl"
              >
                <Stars className="mr-2 h-5 w-5" />
                About Universe
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Features Section */}
      <section className="py-24 psychedelic-bg">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-marker font-bold mb-6 glow-text-rainbow">
              Unleash Your Creativity
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-comic">
              Experience the power of AI-driven storytelling in Matt Furie's psychedelic universe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="cosmic-card p-8 text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-marker font-bold mb-4 glow-text-blue">{feature.title}</h3>
                <p className="text-gray-400 font-comic">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Featured Stories */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-marker font-bold mb-6 glow-text-neon">Featured Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-comic">
              Dive into these mind-bending adventures created by our AI storyteller
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <Link key={index} href={`/story/${story.slug}`} className="group">
                <Card className="cosmic-card overflow-hidden group-hover:scale-105 transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${story.color} opacity-60`}></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white border-none">{story.prompt}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-marker font-bold mb-3 glow-text-blue group-hover:glow-text-pink transition-all duration-300">
                      {story.title}
                    </h3>
                    <p className="text-gray-400 font-comic line-clamp-3">{story.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/create">
              <Button className="cosmic-button text-xl px-12 py-6">
                <Sparkles className="mr-3 h-6 w-6" />
                Create Your Epic Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Character Showcase */}
      <section className="py-24 psychedelic-bg">
        <div className="container px-4 mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-marker font-bold mb-6 glow-text-rainbow">Meet the Characters</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-comic">
              The psychedelic inhabitants of Matt Furie's universe are waiting to star in your stories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {featuredCharacters.map((character, index) => (
              <div key={index} className="character-card group">
                <div className={`relative rounded-3xl overflow-hidden ${character.color} p-1`}>
                  <div className="bg-black/80 rounded-3xl overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={character.image || "/placeholder.svg"}
                        alt={character.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-marker font-bold glow-text-blue">{character.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/characters">
            <Button
              variant="outline"
              className="cosmic-card border-2 border-white/20 hover:border-purple-500/50 bg-white/5 hover:bg-white/10 text-white text-xl px-12 py-6 font-comic"
            >
              <Palette className="mr-3 h-6 w-6" />
              Discover All Characters
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container px-4 mx-auto text-center">
          <div className="cosmic-card p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-marker font-bold mb-6 glow-text-neon">
              Ready to Enter the Vortex?
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-comic">
              Join thousands of creators who have already discovered the magic of AI-powered storytelling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button className="cosmic-button text-xl px-12 py-6">
                  <Wand2 className="mr-3 h-6 w-6" />
                  Start Creating Now
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-2 border-white/20 hover:border-blue-500/50 bg-white/5 hover:bg-white/10 text-white text-xl px-12 py-6 font-comic"
                >
                  <Rocket className="mr-3 h-6 w-6" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
