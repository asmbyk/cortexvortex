import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notFound } from "next/navigation"

// Sample story data
const stories = [
  {
    title: "The Cosmic Soup Adventure",
    prompt: "A chef discovers a new ingredient",
    content:
      'Pepe and Landwolf stumbled upon the cosmic soup kitchen where Tubby Rainbow was stirring a pot filled with glowing liquid. "Hey guys, want to try my new recipe?" asked Tubby, lifting a ladle that emitted rainbow-colored steam.\n\nPepe approached the pot and peered inside. "Wow, there are tiny stars floating in it! Feels good, man!"\n\nLandwolf was cautious. "Is this... edible?"\n\nTubby Rainbow giggled, "Not only is it edible, it also nourishes your thoughts! This cosmic soup is made from the rarest ingredients in the universe - tears of smiling clouds, echoes of forgotten songs, and of course, my secret ingredient."\n\n"Secret ingredient?" asked Pepe, dipping his spoon into the soup.\n\n"Yes, imagination!" replied Tubby, waving his hands dramatically.\n\nAfter the three of them drank from the soup, the walls of the room began to melt away, giving way to an endless field of stars. Pepe\'s skin started changing colors like a prism reflecting his inner thoughts. Landwolf\'s fur had transformed into tiny galaxies dancing on their own. And Tubby Rainbow was no longer just a rainbow, but a living manifestation of the entire color spectrum.\n\n"I told you," whispered Tubby, his voice echoing like the universe itself. "Cosmic soup doesn\'t just feed your stomach, it also nourishes your reality."\n\nAnd so the three friends drifted through unknown dimensions, discovering that the stars in the soup were actually seeds of new worlds. And each sip took them on adventures they couldn\'t have imagined before.',
    image: "/images/cosmic-soup-adventure.png",
    slug: "cosmic-soup-adventure",
    author: "Matt Furie's Story Engine",
    date: "2023-05-15",
    characters: ["Pepe the Frog", "Landwolf", "Tubby Rainbow"],
    relatedStories: ["night-riders-moon-mission", "pepes-dimensional-doorway", "andys-yellow-daydream"],
  },
  {
    title: "Night Riders' Moon Mission",
    prompt: "Astronauts land on the moon",
    content:
      'Mystery and Hoodrat hijacked a cardboard rocket ship and blasted off to the cheese moon where Snurchins had established a colony. As the rocket zigzagged upward through the sky, Mystery shouted with excitement: "We\'re going to the moon! A real adventure!"\n\nHoodrat was looking at an old toaster they were using as a control panel. "I hope this thing gets us there. According to my calculations, we need about... hmm, 17 units of imagination fuel to reach the Moon."\n\n"Imagination units?" asked Mystery, looking out the window. The Earth was getting smaller.\n\n"Yes, what else could this cardboard rocket run on?" replied Hoodrat, rolling his eyes.\n\nAfter a few cosmic songs and a space travel montage, the cardboard rocket crashed onto the Moon\'s surface - though it wasn\'t a smooth landing. More like an uncontrolled descent that turned into a pile of cardboard boxes.\n\n"Here we are!" declared Mystery, emerging from the wreckage. "The Moon! Where no one has ever... wow!"\n\nThe landscape before them wasn\'t a normal moon surface. There were mountains and valleys made of cheese, craters covered with glowing blue mushrooms, and small, shimmering creatures dancing in the sky.\n\n"Those are Snurchins!" whispered Hoodrat, pointing to the creatures above.\n\nWhen the Snurchins noticed them, they floated down in a curious group. They were all different colors - some electric blue, some bright pink, some a hypnotic shade of purple. All had large, curious eyes and constantly shifting shapes.\n\n"Welcome, Night Riders!" chirped the lead Snurchin, a spiky purple-haired creature with bright green eyes and pink shorts. "Welcome to our Cheese Moon Colony! Let us show you the best part of our tour - the Dream Cheese Mines!"\n\nSo Mystery and Hoodrat, guided by the Snurchins, descended into caves deep within the Moon. Here, glowing veins of cheese made from the essence of dreams burst from the walls. When you ate a piece, it instantly manifested your deepest fantasies into reality - temporarily.\n\n"This is amazing!" said Mystery, chewing on a piece of blue cheese. Suddenly, his body became transparent and filled with stars.\n\n"Be careful," warned Hoodrat, examining his own piece. "Too much imagination can be dangerous."\n\nBut the warning came too late. Mystery and the Snurchins had already entered a cheese-eating contest, and reality was beginning to warp wildly around them. Even the Moon itself had started dancing.\n\nHoodrat sighed. "Typical Night Riders adventure. I\'ll have to find a way home again... if \'home\' is still in the same dimension."',
    image: "/images/night-riders-moon-mission.jpeg",
    slug: "night-riders-moon-mission",
    author: "Matt Furie's Story Engine",
    date: "2023-06-22",
    characters: ["Mystery", "Hoodrat", "Snurchins"],
    relatedStories: ["cosmic-soup-adventure", "pepes-dimensional-doorway", "andys-yellow-daydream"],
  },
  {
    title: "Pepe's Dimensional Doorway",
    prompt: "Someone finds a mysterious door",
    content:
      'Feels good, man! Pepe discovered a vibrating purple door behind the refrigerator that opened into Duckess\'s quantum palace. It all started when Pepe pulled the refrigerator out while looking for a midnight snack. Behind the fridge was a pulsating, purple door that hadn\'t been there before.\n\n"Hey guys, I found something weird behind the fridge!" Pepe called out, but it was three in the morning and his roommates Andy, Brett, and Landwolf were fast asleep.\n\n"Well, I guess I\'ll check it out myself," Pepe muttered, turning the doorknob. "Feels good, man!"\n\nWhen he opened the door, he found himself in an enormous hall with impossible architecture. Walls were constantly moving, ceilings rising and falling, staircases rearranging themselves. And everything glowed with a blinding purple light.\n\n"Wow," said Pepe, his mouth hanging open. "I never knew there was a place like this behind our fridge."\n\n"Because it\'s not usually there," said an elegant voice from behind him.\n\nPepe turned to face a tall, graceful duck figure. She wore a purple cloak adorned with stars and a small crown sat atop her head.\n\n"I am Duckess," said the figure, bowing slightly. "And this is my Quantum Palace. It moves between all dimensions and only appears to... interesting individuals... at interesting times."\n\n"I\'m Pepe," the frog replied, still in awe. "I was just looking for a snack, but this is way cooler."\n\nDuckess chuckled, her voice like tinkling crystals. "Perhaps your soul was hungry for a different kind of nourishment, Pepe. Come, let me show you my palace."\n\nSo Pepe, guided by Duckess, passed through rooms that defied the laws of physics, galleries where memories hung suspended in the air, and gardens where time flowed differently. In each room, there were creatures from different dimensions - some familiar, some completely alien.\n\nIn one room, Pepe saw a familiar figure. "Hey, isn\'t that Mystery? I saw him once at a party."\n\n"Yes, that\'s Mystery," confirmed Duckess. "But from a different timeline. Here, all possibilities exist simultaneously."\n\nWhen they reached the heart of the palace, Pepe encountered an enormous pool. Its surface was like a mirror, but it reflected stars and galaxies within.\n\n"This is the Cosmic Pool," explained Duckess. "It shows all dimensions and possibilities. Look."\n\nWhen Pepe gazed into the pool, he saw countless versions of himself - some familiar, some completely different. All living their own stories.\n\n"Wow," said Pepe, unable to tear his eyes away from the pool. "This... feels really good, man."\n\nDuckess smiled. "Yes, it does. And now, dear Pepe, it\'s time to make a choice. You can stay here, in my Quantum Palace, and learn the secrets of all dimensions. Or you can return home and share this experience with your friends."\n\nPepe thought about it. Then he smiled. "I think I\'ll go home. But... can I come back?"\n\n"The door is always there for those who truly seek it," said Duckess mysteriously.\n\nSo Pepe returned home, the door behind the refrigerator closing behind him. But sometimes, late at night, you might see a purple light leaking from behind the fridge. And if you listen carefully, you might hear Duckess\'s crystal-like laughter.',
    image: "/images/pepes-dimensional-doorway.jpeg",
    slug: "pepes-dimensional-doorway",
    author: "Matt Furie's Story Engine",
    date: "2023-07-30",
    characters: ["Pepe the Frog", "Duckess"],
    relatedStories: ["cosmic-soup-adventure", "night-riders-moon-mission", "andys-yellow-daydream"],
  },
  {
    title: "Andy's Yellow Daydream",
    prompt: "A lazy afternoon turns surreal",
    content:
      'Andy lounged on the couch, his yellow form sinking into the cushions as the afternoon sun cast warm patterns across the living room. His half-lidded eyes gazed at the ceiling, where a small crack had begun to form interesting shapes.\n\n"Has anyone ever noticed," Andy said slowly, his words stretching like taffy, "that the ceiling looks like it\'s breathing?"\n\nPepe glanced up from his comic book. "What are you talking about, man?"\n\n"Just look at it," Andy insisted, not moving from his comfortable position. "If you stare long enough, it starts to pulse. Like it\'s alive."\n\nPepe looked up for a moment, then shrugged. "I don\'t see it. Maybe you\'re just sleepy."\n\n"Maybe," Andy murmured, but he kept staring.\n\nAs the hours passed, the others left for a pizza run. Andy remained on the couch, his mind drifting between consciousness and dreams. The ceiling crack had definitely grown larger now, forming a perfect circle that seemed to glow with a soft yellow light that matched his own color.\n\n"Hello?" Andy called up to it, not bothering to sit up.\n\nTo his mild surprise, the circle answered back. "Hello, Andy."\n\nAndy nodded thoughtfully. "So you know my name."\n\n"I know many things," the circle replied, its yellow glow pulsating with each word. "I\'ve been watching you think."\n\n"That\'s cool," Andy said, unfazed. "What am I thinking about right now?"\n\n"You\'re wondering if you\'re dreaming, if you\'ve fallen asleep on the couch, or if this is really happening. You\'re also thinking about whether there\'s any leftover pizza in the fridge from yesterday."\n\nAndy smiled. "Both valid questions."\n\nThe yellow circle expanded, growing until it encompassed the entire ceiling. "Would you like to see something interesting?"\n\n"Sure," Andy replied, finally sitting up. "I wasn\'t doing anything anyway."\n\nThe circle descended, enveloping Andy in a warm yellow glow. He felt himself floating upward, through the ceiling and beyond, into a vast yellow dimension where thoughts took physical form. Here, Andy\'s lazy philosophical musings became tangible objects that floated around him – questions about existence shaped like twisted pretzels, ponderings about friendship that looked like comfortable chairs, and abstract concepts that defied description.\n\n"This is where your thoughts go when you daydream," explained the yellow entity that had once been a ceiling crack. "Every idle thought creates something here."\n\nAndy reached out and touched a nearby floating object – a swirling mass that represented his curiosity about the universe. It felt warm and familiar.\n\n"So I\'ve been building this place without knowing it?" Andy asked.\n\n"Yes. Everyone has their own thought dimension, but few ever visit. You, however, spend so much time daydreaming that your dimension has become quite elaborate."\n\nAndy spent what felt like hours exploring his yellow thought realm, discovering ideas he\'d forgotten and concepts he\'d only half-formed. He found it pleasantly unsurprising that his thought dimension was as comfortable and laid-back as he was – nothing rushed here, everything moved at its own perfect pace.\n\nEventually, Andy felt himself drifting downward, back through the yellow portal and onto the couch. Just as he settled back into the cushions, the front door opened, and his friends returned with fresh pizza.\n\n"Andy, we\'re back!" Pepe called. "Have you been on that couch the whole time?"\n\nAndy smiled lazily. "Yeah, just thinking."\n\n"About what?" Brett asked, setting down the pizza boxes.\n\nAndy considered telling them about the yellow dimension, about how thoughts create realities and how he\'d explored the physical manifestation of his own mind. But that would take a lot of explaining, and the pizza was getting cold.\n\n"Nothing much," he said instead, reaching for a slice. "Just yellow stuff."\n\nAs they ate, Andy noticed a small yellow glow emanating from the crack in the ceiling. It winked once, like a distant star, and then faded back to normal. Andy winked back, knowing he could return anytime he wanted. After all, daydreaming was what he did best.',
    image: "/psychedelic-dog-dream.png",
    slug: "andys-yellow-daydream",
    author: "Matt Furie's Story Engine",
    date: "2023-08-15",
    characters: ["Andy", "Pepe the Frog", "Brett"],
    relatedStories: ["cosmic-soup-adventure", "pepes-dimensional-doorway", "night-riders-moon-mission"],
  },
  {
    title: "Brett's Kitchen Chaos",
    prompt: "Someone tries to cook the perfect meal",
    content:
      'Brett stood in the kitchen, his blue face beaming with excitement as he surveyed the ingredients scattered across every available surface. "Today\'s the day!" he announced to no one in particular, since his roommates were still asleep. "I\'m gonna make the most amazing breakfast ever!"\n\nHe had been planning this for weeks - a surprise breakfast that would blow everyone\'s minds. The only problem was that Brett had never actually cooked anything more complex than cereal before.\n\n"How hard can it be?" Brett muttered, cracking eggs with such enthusiasm that half the shells ended up in the bowl. "Cooking is just like... organized chaos!"\n\nAs he whisked the eggs, yellow goop flew everywhere - on the walls, on his orange shirt, somehow even on the ceiling. But Brett was undeterred. This was going to be epic.\n\n"Pancakes!" he declared, grabbing a bag of flour. In his excitement, he ripped the bag too hard, sending a white cloud exploding across the kitchen. "Perfect! Now it looks like a winter wonderland!"\n\nPepe wandered into the kitchen, rubbing his eyes. "Brett, what are you... oh wow."\n\nThe kitchen looked like a food bomb had gone off. Flour covered every surface, there were egg shells crunching underfoot, and Brett stood in the middle of it all, somehow managing to flip a pancake that was simultaneously burnt and raw.\n\n"Feels good, man," Pepe said slowly, "but maybe we should order pizza?"\n\n"No way!" Brett exclaimed, catching the pancake with his face instead of the pan. "This is going to be amazing! I can feel it!"\n\nAndy shuffled in next, took one look at the chaos, and simply said, "I\'ll be on the couch if anyone needs me."\n\nLandwolf appeared in the doorway, assessed the situation with his keen protective instincts, and immediately started opening windows. "Brett, buddy, I think the smoke alarm is about to have an opinion about this."\n\nAs if on cue, the smoke alarm began its shrill protest. But Brett was in his element now, dancing around the kitchen with a spatula, flipping pancakes with reckless abandon, his blue face covered in batter and his orange shirt now a Jackson Pollock painting of breakfast ingredients.\n\n"This is the best morning ever!" Brett shouted over the alarm, somehow managing to produce a stack of pancakes that defied both physics and culinary logic. They were different colors, various shapes, and some appeared to be moving on their own.\n\nPepe, Andy, and Landwolf looked at each other, then at Brett\'s creation, then back at each other.\n\n"You know what?" Pepe said, grabbing a fork. "Let\'s try it. Feels good, man."\n\nAnd surprisingly, despite looking like abstract art, Brett\'s chaos pancakes were actually delicious. They tasted like adventure, friendship, and just a little bit of ceiling plaster.\n\n"See?" Brett grinned, his mouth already full of his own creation. "I told you it would be amazing! Who wants seconds?"\n\nAs they ate breakfast surrounded by the beautiful disaster Brett had created, they all agreed on one thing: life was never boring with Brett around. And sometimes, the best meals come from the biggest messes.',
    image: "/images/brett.png",
    slug: "bretts-kitchen-chaos",
    author: "Matt Furie's Story Engine",
    date: "2023-09-10",
    characters: ["Brett", "Pepe the Frog", "Andy", "Landwolf"],
    relatedStories: ["cosmic-soup-adventure", "andys-yellow-daydream", "pepes-dimensional-doorway"],
  },
  {
    title: "Mystery's Forest Discovery",
    prompt: "An explorer finds a hidden portal",
    content:
      'Mystery adjusted his yellow helmet as he ventured deeper into the Night Forest, his large eyes scanning the twisted trees for anything unusual. "Adventure awaits in the darkness!" he whispered to himself, a habit he\'d developed during his solo expeditions.\n\nThe forest tonight felt different - more alive, more electric. The usual purple mushrooms that dotted the forest floor were glowing brighter than usual, and the air itself seemed to shimmer with possibility.\n\n"What\'s over there?" Mystery muttered, spotting a peculiar clearing ahead where the trees formed a perfect circle. As he approached, he noticed that the ground in the center was covered with what looked like liquid starlight, pooling and swirling in impossible patterns.\n\nSuddenly, Hoodrat emerged from behind a large mushroom, startling Mystery. "There you are! I\'ve been looking everywhere for you."\n\n"Hoodrat! Perfect timing," Mystery exclaimed, pointing at the clearing. "Look at this! I can sense something magical nearby..."\n\nHoodrat approached cautiously, his strategic mind already analyzing the situation. "That\'s not normal forest behavior. The starlight is moving in geometric patterns. It\'s almost like..."\n\n"Like a portal!" Mystery finished excitedly, his adventurous spirit overriding any sense of caution.\n\nBefore Hoodrat could protest, Mystery had already stepped into the clearing. The moment his foot touched the liquid starlight, the entire forest around them began to shift and change. Trees rearranged themselves, the sky turned from deep purple to a swirling kaleidoscope of colors, and the ground beneath them started to feel less like earth and more like clouds.\n\n"Mystery, wait!" Hoodrat called out, but it was too late. The portal had activated.\n\nThey found themselves floating in a dimension where the Night Forest existed in all its possible forms simultaneously. Here, they could see the forest as it was in the past, present, and future all at once. Ancient trees grew alongside saplings that wouldn\'t exist for centuries. Creatures from different time periods wandered through the same space without interfering with each other.\n\n"This is incredible!" Mystery gasped, his helmet now glowing with the same energy as the portal. "We\'re seeing the true nature of the Night Forest!"\n\nIn this temporal overlap, they encountered versions of themselves from different adventures - a Mystery who had become a tree guardian, a Hoodrat who had learned to speak the language of mushrooms, and countless other possibilities.\n\n"The night is full of wonders," Mystery said in awe, watching as a group of Snurchins from a parallel timeline danced with shadow creatures that existed only in moonlight.\n\nHoodrat, despite his initial caution, found himself fascinated by the strategic implications. "If we can understand how this portal works, we could explore every possible version of our adventures."\n\nBut as they watched, the portal began to destabilize. The different timelines were starting to merge in chaotic ways, and the forest was becoming confused about which version of itself it should be.\n\n"I think we need to get back," Hoodrat said, his survival instincts kicking in.\n\nMystery nodded reluctantly. "You\'re right. But we\'ll remember this, won\'t we? This proof that every adventure we imagine is real somewhere?"\n\nAs they stepped back through the portal, the Night Forest settled back into its familiar form. But now they knew the truth - that beneath the surface of their reality lay infinite possibilities, waiting to be discovered by those brave enough to look.\n\n"Let\'s check it out again tomorrow night," Mystery said with a grin.\n\nHoodrat smiled despite himself. "I\'ll bring a map this time. And maybe some rope."\n\nAnd so the Night Riders added another incredible discovery to their growing list of adventures, knowing that the forest would always have more mysteries to reveal.',
    image: "/images/mystery.png",
    slug: "mysterys-forest-discovery",
    author: "Matt Furie's Story Engine",
    date: "2023-10-05",
    characters: ["Mystery", "Hoodrat"],
    relatedStories: ["night-riders-moon-mission", "cosmic-soup-adventure", "pepes-dimensional-doorway"],
  },
]

// Helper function to get saved stories from localStorage
function getSavedStories() {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("savedStories") || "{}")
    } catch (error) {
      console.error("Failed to get saved stories:", error)
      return {}
    }
  }
  return {}
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  // First look in the static stories
  let story = stories.find((s) => s.slug === params.slug)

  // If not found, check localStorage for saved stories
  if (!story && typeof window !== "undefined") {
    const savedStories = getSavedStories()
    story = savedStories[params.slug]
  }

  if (!story) {
    notFound()
  }

  return (
    <div className="container py-12">
      <Link href="/">
        <Button variant="outline" className="mb-8 font-comic">
          ← Back to Home
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 relative h-[300px] rounded-lg overflow-hidden psychedelic-border">
          <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
        </div>

        <h1 className="font-marker text-4xl md:text-5xl font-bold mb-4 text-center glow-text-pink">{story.title}</h1>

        <div className="flex justify-center items-center gap-4 mb-8 text-muted-foreground font-comic">
          <span>Author: {story.author}</span>
          <span>•</span>
          <span>Date: {story.date}</span>
          <span>•</span>
          <span>Prompt: "{story.prompt}"</span>
        </div>

        <Tabs defaultValue="story" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="story" className="text-lg font-comic">
              Story
            </TabsTrigger>
            <TabsTrigger value="info" className="text-lg font-comic">
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="story">
            <Card className="bg-card/80 backdrop-blur-sm border-none">
              <CardContent className="p-6 md:p-8">
                <div className="prose prose-lg prose-invert max-w-none font-comic">
                  {story.content.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <Card className="bg-card/80 backdrop-blur-sm border-none">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-marker text-xl font-bold mb-3 text-primary glow-text-pink">Characters</h3>
                    <div className="flex flex-wrap gap-2">
                      {story.characters.map((character, index) => (
                        <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                          {character}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-marker text-xl font-bold mb-3 text-primary glow-text-pink">Related Stories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {story.relatedStories.map((slug) => {
                        const relatedStory = stories.find((s) => s.slug === slug)
                        if (!relatedStory) return null

                        return (
                          <Link key={slug} href={`/story/${slug}`}>
                            <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                              <CardContent className="p-4">
                                <h4 className="font-marker text-lg mb-1">{relatedStory.title}</h4>
                                <p className="text-sm text-muted-foreground">Prompt: "{relatedStory.prompt}"</p>
                              </CardContent>
                            </Card>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Link href="/create">
            <Button className="font-comic">Create Your Own Story</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
