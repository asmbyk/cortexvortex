import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Character data
const characters = [
  {
    id: "pepe",
    name: "Pepe the Frog",
    book: "Boy's Club",
    description:
      "Pepe the Frog is a laid-back, good-natured, and sometimes naive character. He's known for his catchphrase 'Feels good, man' and his relaxed approach to life. Despite his simple appearance, Pepe has depth and often finds himself in philosophical situations.",
    personality: "Relaxed, good-natured, sometimes naive",
    speech: "Simple and friendly sentences, often uses 'Feels good, man'",
    behavior: "Generally approaches situations with positivity",
    appearances: ["Boy's Club (2005-2012)"],
    friends: ["Andy", "Brett", "Landwolf"],
    quotes: ["Feels good, man.", "Hey dudes, what's happening?", "Life is pretty chill if you just go with the flow."],
    image: "/images/pepe-new.png",
  },
  {
    id: "andy",
    name: "Andy",
    book: "Boy's Club",
    description:
      "Andy is a yellow, dog-like character with a perpetually chill expression and half-lidded eyes. He's the most laid-back member of the Boy's Club crew, often found lounging around contemplating life's mysteries or just enjoying the moment. Despite his lazy appearance, Andy has a philosophical side and occasionally drops profound observations that surprise his friends.",
    personality: "Calm, lazy, thoughtful, philosophical",
    speech: "Slow and deliberate, thoughtful expressions, often with a dreamy quality",
    behavior: "Mostly passive, enjoys lounging, but supportive when needed",
    appearances: ["Boy's Club (2005-2012)"],
    friends: ["Pepe", "Brett", "Landwolf"],
    quotes: [
      "I was thinking about that earlier...",
      "Let's just chill for a bit.",
      "There's no rush, man.",
      "Have you ever really thought about the universe, man?",
    ],
    image: "/images/andy.png",
  },
  {
    id: "brett",
    name: "Brett",
    book: "Boy's Club",
    description:
      "Brett is a blue, energetic character who's always ready for action and adventure. He's known for his messy eating habits and his enthusiasm for trying new things. With his orange shirt and perpetually excited expression, Brett brings chaos and fun wherever he goes. He's often the one who suggests wild ideas and gets the group into amusing situations.",
    personality: "Energetic, messy, fun-loving, adventurous",
    speech: "Fast and excited, sometimes jumps between topics, often talks with his mouth full",
    behavior: "Always moving, trying new things, making messes while eating",
    appearances: ["Boy's Club (2005-2012)"],
    friends: ["Pepe", "Andy", "Landwolf"],
    quotes: [
      "Let's do this!",
      "I found something awesome!",
      "Who wants to try this crazy idea?",
      "This food is amazing! *crunch crunch*",
    ],
    image: "/images/brett.png",
  },
  {
    id: "landwolf",
    name: "Landwolf",
    book: "Boy's Club",
    description:
      "Landwolf has a wild appearance but a kind heart. He's protective of his friends and often takes on a leadership role when needed. With his distinctive style and laid-back attitude, he's always ready for whatever adventures come his way.",
    personality: "Wild appearance, kind-hearted, protective",
    speech: "Deep and resonant voice, speaks with authority",
    behavior: "Protects friends, leads when necessary",
    appearances: ["Boy's Club (2005-2012)"],
    friends: ["Pepe", "Andy", "Brett"],
    quotes: ["I'll keep you safe.", "Let's think this through.", "The pack stays together."],
    image: "/images/landwolf.png",
  },
  {
    id: "mystery",
    name: "Mystery",
    book: "The Night Riders",
    description:
      "Mystery is a green frog character who serves as one of the main protagonists of The Night Riders. With his distinctive yellow helmet or headgear and large, expressive eyes, Mystery embodies the spirit of adventure and curiosity. He's always eager to explore the unknown territories of the Night Forest and beyond, often leading expeditions into strange and wonderful realms. Mystery's optimistic and brave nature makes him the perfect companion for nocturnal adventures.",
    personality: "Adventurous, curious, brave, optimistic",
    speech: "Inquisitive questions, excited observations, enthusiastic exclamations",
    behavior: "Explores new places, seeks out adventures, leads expeditions",
    appearances: ["The Night Riders (2012)"],
    friends: ["Hoodrat", "Toki", "Wat"],
    quotes: [
      "What's over there?",
      "Let's check it out!",
      "The night is full of wonders.",
      "Adventure awaits in the darkness!",
      "I can sense something magical nearby...",
    ],
    image: "/images/mystery.png",
  },
  {
    id: "hoodrat",
    name: "Hoodrat",
    book: "The Night Riders",
    description:
      "Hoodrat is Mystery's loyal best friend and adventure companion in The Night Riders. This pink-furred rat with distinctive blonde spiky hair and large ears is known for his street-smart intelligence and strategic thinking. Despite his punk-rock appearance, Hoodrat is incredibly loyal and always has Mystery's back during their nocturnal adventures. His quick wit and ability to think on his feet often gets the duo out of dangerous situations in the Night Forest.",
    personality: "Smart, agile, loyal, street-smart, strategic",
    speech: "Sharp and clear, strategic thinking, often uses urban slang",
    behavior: "Plans ahead, thinks quickly in difficult situations, protective of Mystery",
    appearances: ["The Night Riders (2012)"],
    friends: ["Mystery", "Toki", "Wat"],
    quotes: [
      "I have a plan.",
      "Let me think about this.",
      "Follow me, I know a shortcut.",
      "Mystery, we need to be smart about this.",
      "Trust me, I've got street smarts.",
    ],
    image: "/images/hoodrat.png",
  },
  {
    id: "toki",
    name: "Toki",
    book: "The Night Riders",
    description:
      "Toki is a magnificent dragon-like creature with golden wings and a red-scaled serpentine body. With piercing green eyes and an elongated snout filled with sharp teeth, Toki embodies ancient wisdom and mystical power. Despite his intimidating appearance, Toki is a gentle guardian of the Night Forest who rarely speaks but observes everything with profound understanding. His presence often signals that something significant is about to happen in the nocturnal realm.",
    personality: "Wise, mysterious, observant, ancient, protective",
    speech: "Speaks very rarely, but when he does, his words carry deep meaning and ancient wisdom",
    behavior: "Watches from the shadows, appears when needed most, guardian-like presence",
    appearances: ["The Night Riders (2012)"],
    friends: ["Mystery", "Hoodrat", "Wat"],
    quotes: [
      "The forest remembers all.",
      "Some truths can only be seen in darkness.",
      "Time flows differently for those who truly see.",
      "Ancient paths reveal themselves to the worthy.",
      "Silence speaks louder than words.",
    ],
    image: "/images/toki.png",
  },
  {
    id: "wat",
    name: "Wat",
    book: "The Night Riders",
    description:
      "Wat is a peculiar lemur-like creature with distinctive brown fur, large pink ears, and wide, expressive white eyes. With his pink claws and lips, Wat has an endearing yet slightly unsettling appearance that perfectly captures the surreal nature of the Night Forest. Known for his unpredictable behavior and childlike curiosity, Wat often appears at the most unexpected moments, clinging to branches or peering out from hidden spots. Despite his strange mannerisms, he's a loyal companion to the Night Riders and has an uncanny ability to sense danger before it arrives.",
    personality: "Unpredictable, curious, childlike, loyal, intuitive",
    speech: "Often speaks in short, cryptic phrases or makes strange sounds",
    behavior: "Climbs and clings to things, appears suddenly, acts on instinct",
    appearances: ["The Night Riders (2012)"],
    friends: ["Mystery", "Hoodrat", "Toki"],
    quotes: [
      "Wat sees what others miss.",
      "Danger comes on silent paws.",
      "The trees whisper secrets.",
      "Night brings strange visitors.",
      "Wat knows, Wat always knows.",
    ],
    image: "/images/wat.png",
  },
  {
    id: "snurchins",
    name: "Snurchins",
    book: "Mindviscosity",
    description:
      "Snurchins are bizarre, spiky creatures with vibrant purple hair and distinctive green eyes. With their peculiar appearance - part sea urchin, part humanoid - they're known for their unpredictable behavior and boundless curiosity. Their bodies are covered in purple spikes that change color based on their mood, and they wear bright pink shorts. Despite their somewhat intimidating appearance, they're playful and inquisitive beings that love to explore the strange corners of the Mindviscosity dimension.",
    personality: "Curious, energetic, sometimes chaotic",
    speech: "Quick, excited chirps and chatter",
    behavior: "Constantly moving, exploring, poking at things",
    appearances: ["Mindviscosity (2020)"],
    friends: ["Tubby Rainbow", "Duckess", "Ratsmile"],
    quotes: ["What's this do?", "Let's poke it!", "So many colors!", "Can I touch that with my spikes?"],
    image: "/images/snurchins.jpeg",
  },
  {
    id: "tubby-rainbow",
    name: "Tubby Rainbow",
    book: "Mindviscosity",
    description:
      "Tubby Rainbow is a colorful and chubby entity that spreads positivity wherever they go. With a bright yellow body and a rainbow trail, they bring joy and color to the Mindviscosity dimension. They have the ability to change colors based on their mood and can create rainbow bridges between different realities.",
    personality: "Cheerful, colorful, optimistic",
    speech: "Poetic and melodic, often sings",
    behavior: "Bounces around, changes colors, spreads joy",
    appearances: ["Mindviscosity (2020)"],
    friends: ["Snurchins", "Duckess", "Ratsmile"],
    quotes: ["Colors are feelings made visible!", "Bounce with me!", "Every cloud has a rainbow lining!"],
    image: "/images/tubby-rainbow.png",
  },
  {
    id: "duckess",
    name: "Duckess",
    book: "Mindviscosity",
    description:
      "Duckess is a graceful and intelligent figure who serves as a natural leader in the chaotic Mindviscosity dimension. Surrounded by the wild and unpredictable creatures of this psychedelic realm, she maintains her composure and wisdom. Her presence brings order to the colorful chaos, and she has the unique ability to communicate with all the strange entities that inhabit this surreal universe. Duckess represents elegance and intelligence amidst the beautiful madness of Mindviscosity.",
    personality: "Graceful, intelligent, leader, composed, wise",
    speech: "Elegant and wise, gives thoughtful advice, speaks with authority",
    behavior: "Maintains composure in chaos, leads by example, mediates conflicts",
    appearances: ["Mindviscosity (2020)"],
    friends: ["Snurchins", "Tubby Rainbow", "Ratsmile"],
    quotes: [
      "Order can be found even in the most beautiful chaos.",
      "Every creature has wisdom to share, if you know how to listen.",
      "Grace is not about perfection, it's about finding balance.",
      "In this dimension, imagination is the only law that matters.",
      "Leadership means understanding the beauty in everyone's madness.",
    ],
    image: "/images/duckess.png",
  },
  {
    id: "ratsmile",
    name: "Ratsmile",
    book: "Mindviscosity",
    description:
      "Ratsmile is a uniquely charming rat character with flowing orange hair and an eternally cheerful disposition. With her distinctive wide smile, sharp teeth, and love for tropical drinks, she embodies the carefree, beach-loving spirit of the Mindviscosity dimension. Despite her somewhat unsettling grin, Ratsmile is genuinely friendly and has an infectious positive energy that brightens even the most chaotic moments in the psychedelic realm. She's often found sipping colorful beverages and spreading good vibes wherever she goes.",
    personality: "Cheerful, carefree, positive, beach-loving, friendly",
    speech: "Upbeat and enthusiastic, often talks about relaxation and good times",
    behavior: "Always smiling, enjoys tropical drinks, spreads positive energy",
    appearances: ["Mindviscosity (2020)"],
    friends: ["Snurchins", "Tubby Rainbow", "Duckess"],
    quotes: [
      "Life's a beach, and I'm just here for the drinks!",
      "Every day is a good day when you're smiling!",
      "Want to share a tropical smoothie with me?",
      "The secret to happiness is finding joy in the little things.",
      "Sunshine and good vibes, that's all we need!",
    ],
    image: "/images/ratsmile.png",
  },
]

export default function CharacterPage({ params }: { params: { id: string } }) {
  const character = characters.find((c) => c.id === params.id)

  if (!character) {
    notFound()
  }

  return (
    <div className="container py-12">
      <Link href="/characters">
        <Button variant="outline" className="mb-8 font-comic">
          ← Back to Characters
        </Button>
      </Link>

      <div className="grid md:grid-cols-[300px_1fr] gap-8 lg:gap-12">
        <div className="animate-float">
          <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-none psychedelic-border">
            <CardContent className="p-0">
              <Image
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                width={500}
                height={500}
                className="w-full aspect-square object-cover"
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <h1 className="font-marker text-4xl md:text-5xl font-bold mb-2 glow-text-pink">{character.name}</h1>
          <p className="text-xl text-secondary mb-6 font-comic">From {character.book}</p>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="about" className="text-lg font-comic">
                About
              </TabsTrigger>
              <TabsTrigger value="personality" className="text-lg font-comic">
                Personality
              </TabsTrigger>
              <TabsTrigger value="quotes" className="text-lg font-comic">
                Quotes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card className="bg-card/80 backdrop-blur-sm border-none">
                <CardContent className="pt-6">
                  <p className="text-lg mb-6 font-comic">{character.description}</p>

                  <h3 className="font-marker text-xl font-bold mb-3 text-primary glow-text-pink">Appearances</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-1 font-comic">
                    {character.appearances.map((appearance, index) => (
                      <li key={index}>{appearance}</li>
                    ))}
                  </ul>

                  <h3 className="font-marker text-xl font-bold mb-3 text-primary glow-text-pink">Friends</h3>
                  <div className="flex flex-wrap gap-2 mb-6 font-comic">
                    {character.friends.map((friend, index) => (
                      <Link
                        key={index}
                        href={`/characters/${friend.toLowerCase()}`}
                        className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {friend}
                      </Link>
                    ))}
                  </div>

                  <Link href={`/create?character=${character.id}`}>
                    <Button className="w-full sm:w-auto font-comic">Create a Story with {character.name}</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personality">
              <Card className="bg-card/80 backdrop-blur-sm border-none">
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h3 className="font-marker text-xl font-bold mb-2 text-primary glow-text-pink">
                      Personality Traits
                    </h3>
                    <p className="text-lg font-comic">{character.personality}</p>
                  </div>

                  <div>
                    <h3 className="font-marker text-xl font-bold mb-2 text-primary glow-text-pink">Speech Pattern</h3>
                    <p className="text-lg font-comic">{character.speech}</p>
                  </div>

                  <div>
                    <h3 className="font-marker text-xl font-bold mb-2 text-primary glow-text-pink">Behavior</h3>
                    <p className="text-lg font-comic">{character.behavior}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quotes">
              <Card className="bg-card/80 backdrop-blur-sm border-none">
                <CardContent className="pt-6">
                  <h3 className="font-marker text-xl font-bold mb-4 text-primary glow-text-pink">Memorable Quotes</h3>

                  <div className="space-y-4">
                    {character.quotes.map((quote, index) => (
                      <div
                        key={index}
                        className="p-4 bg-muted rounded-lg border-l-4 border-primary italic text-lg font-comic"
                      >
                        "{quote}"
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
