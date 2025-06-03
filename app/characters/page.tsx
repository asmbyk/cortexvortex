import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Sparkles } from "lucide-react"

const characters = [
  {
    id: "pepe",
    name: "Pepe the Frog",
    book: "Boy's Club",
    description: "Laid-back, good-natured, sometimes naive frog. Known for his catchphrase 'Feels good, man.'",
    image: "/images/pepe-new.png",
    color: "from-green-400 to-blue-500",
    personality: ["Relaxed", "Good-natured", "Philosophical"],
  },
  {
    id: "andy",
    name: "Andy",
    book: "Boy's Club",
    description: "Calm and somewhat lazy character who thinks deeply about things.",
    image: "/images/andy.png",
    color: "from-yellow-400 to-orange-500",
    personality: ["Calm", "Thoughtful", "Lazy"],
  },
  {
    id: "brett",
    name: "Brett",
    book: "Boy's Club",
    description: "Energetic and somewhat messy personality who loves adventures.",
    image: "/images/brett.png",
    color: "from-blue-500 to-purple-600",
    personality: ["Energetic", "Adventurous", "Messy"],
  },
  {
    id: "landwolf",
    name: "Landwolf",
    book: "Boy's Club",
    description: "Wild-looking but kind-hearted wolfman who protects his friends.",
    image: "/images/landwolf.png",
    color: "from-purple-600 to-pink-500",
    personality: ["Protective", "Kind-hearted", "Leader"],
  },
  {
    id: "mystery",
    name: "Mystery",
    book: "The Night Riders",
    description: "A frog who embarks on adventures throughout the night.",
    image: "/images/mystery.png",
    color: "from-indigo-500 to-purple-600",
    personality: ["Adventurous", "Curious", "Brave"],
  },
  {
    id: "hoodrat",
    name: "Hoodrat",
    book: "The Night Riders",
    description: "Mystery's best friend, a rat who is smart and strategic.",
    image: "/images/hoodrat.png",
    color: "from-pink-500 to-red-500",
    personality: ["Smart", "Strategic", "Loyal"],
  },
  {
    id: "toki",
    name: "Toki",
    book: "The Night Riders",
    description: "A mysterious dragon-like character who rarely speaks but observes everything.",
    image: "/images/toki.png",
    color: "from-emerald-500 to-teal-600",
    personality: ["Wise", "Mysterious", "Observant"],
  },
  {
    id: "wat",
    name: "Wat",
    book: "The Night Riders",
    description: "A strange lemur-like creature with big pink ears and unpredictable behavior.",
    image: "/images/wat.png",
    color: "from-orange-400 to-yellow-500",
    personality: ["Unpredictable", "Curious", "Intuitive"],
  },
  {
    id: "snurchins",
    name: "Snurchins",
    book: "Mindviscosity",
    description: "Sea urchin-like creatures that are curious and energetic.",
    image: "/images/snurchins.jpeg",
    color: "from-cyan-400 to-blue-500",
    personality: ["Curious", "Energetic", "Chaotic"],
  },
  {
    id: "tubby-rainbow",
    name: "Tubby Rainbow",
    book: "Mindviscosity",
    description: "A colorful and chubby entity that spreads positivity.",
    image: "/images/tubby-rainbow.png",
    color: "from-pink-400 to-purple-500",
    personality: ["Cheerful", "Optimistic", "Colorful"],
  },
  {
    id: "duckess",
    name: "Duckess",
    book: "Mindviscosity",
    description: "A duck-like figure who is graceful, intelligent, and a natural leader.",
    image: "/images/duckess.png",
    color: "from-purple-500 to-indigo-600",
    personality: ["Graceful", "Intelligent", "Leader"],
  },
  {
    id: "ratsmile",
    name: "Ratsmile",
    book: "Mindviscosity",
    description: "A smiling rat character with orange hair who enjoys tropical drinks and beach vibes.",
    image: "/images/ratsmile.png",
    color: "from-orange-500 to-pink-500",
    personality: ["Cheerful", "Friendly", "Beach-loving"],
  },
]

export default function CharactersPage() {
  const charactersByBook = characters.reduce(
    (acc, character) => {
      if (!acc[character.book]) {
        acc[character.book] = []
      }
      acc[character.book].push(character)
      return acc
    },
    {} as Record<string, typeof characters>,
  )

  const bookColors = {
    "Boy's Club": "from-green-400 to-blue-500",
    "The Night Riders": "from-purple-500 to-indigo-600",
    Mindviscosity: "from-pink-500 to-purple-600",
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 left-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-64 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white border-none text-lg font-comic">
            <Users className="mr-2 h-4 w-4" />
            Character Universe
          </Badge>

          <h1 className="text-6xl md:text-7xl font-marker font-bold mb-6 glow-text-rainbow">
            Meet the
            <br />
            <span className="glow-text-neon">Characters</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-comic">
            Explore the <span className="glow-text-pink font-bold">psychedelic inhabitants</span> of Matt Furie's
            universe and discover their unique personalities
          </p>
        </div>

        {/* Character Collections by Book */}
        {Object.entries(charactersByBook).map(([book, bookCharacters], bookIndex) => (
          <section key={book} className="mb-20">
            {/* Book Header */}
            <div className="text-center mb-12">
              <div className="inline-block relative">
                <h2 className="text-4xl md:text-5xl font-marker font-bold mb-4 relative z-10">
                  <span
                    className={`bg-gradient-to-r ${bookColors[book as keyof typeof bookColors]} bg-clip-text text-transparent`}
                  >
                    {book}
                  </span>
                </h2>
                <div
                  className={`absolute -inset-4 bg-gradient-to-r ${bookColors[book as keyof typeof bookColors]} opacity-20 blur-xl rounded-full`}
                ></div>
              </div>
              <p className="text-lg text-gray-400 font-comic max-w-2xl mx-auto">
                {book === "Boy's Club" && "The original crew living their laid-back lifestyle"}
                {book === "The Night Riders" && "Nocturnal adventurers exploring mysterious realms"}
                {book === "Mindviscosity" && "Psychedelic beings from the abstract dimension"}
              </p>
            </div>

            {/* Character Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {bookCharacters.map((character, index) => (
                <div key={character.id} className="group">
                  <div className={`cosmic-card overflow-hidden p-1 bg-gradient-to-br ${character.color}`}>
                    <div className="bg-black/90 rounded-2xl overflow-hidden">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={character.image || "/placeholder.svg"}
                          alt={character.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-marker font-bold glow-text-blue mb-1">{character.name}</h3>
                          <div className="flex flex-wrap gap-1">
                            {character.personality.slice(0, 2).map((trait, i) => (
                              <Badge key={i} className="text-xs bg-white/20 text-white border-none">
                                {trait}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-400 font-comic text-sm mb-4 line-clamp-2">{character.description}</p>
                        <div className="flex gap-2">
                          <Link href={`/characters/${character.id}`} className="flex-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-xs border-white/20 hover:border-pink-500/50 bg-white/5 hover:bg-white/10"
                            >
                              Profile
                            </Button>
                          </Link>
                          <Link href={`/create?character=${character.id}`} className="flex-1">
                            <Button size="sm" className="w-full text-xs bg-gradient-to-r from-pink-500 to-purple-600">
                              Create Story
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section Divider */}
            {bookIndex < Object.entries(charactersByBook).length - 1 && <div className="section-divider my-16"></div>}
          </section>
        ))}

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="cosmic-card p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-marker font-bold mb-6 glow-text-purple">
              Ready to Create Stories?
            </h2>
            <p className="text-lg text-gray-300 mb-8 font-comic">
              Now that you've met the characters, it's time to feature them in your own psychedelic adventures!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button className="cosmic-button text-lg px-8 py-4">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Creating
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-2 border-white/20 hover:border-blue-500/50 bg-white/5 hover:bg-white/10 text-white text-lg px-8 py-4 font-comic"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
