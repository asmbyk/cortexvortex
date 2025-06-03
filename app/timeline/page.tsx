"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, MapPin, Quote, Users } from "lucide-react"

// Genişletilmiş zaman çizelgesi verileri
const timelineEvents = [
  {
    year: "1979",
    title: "Birth of Matt Furie",
    description:
      "Matt Furie was born in Ohio. He began drawing during his childhood and developed an interest in animal characters.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3aUhJ8g1hRzvv1yuuMt1s8k580ebMK.png",
    category: "creator",
    // Detailed information
    extendedDescription:
      "Matt Furie was born in Columbus, Ohio in 1979. Interested in drawing from childhood, Furie particularly gravitated toward anthropomorphic animal characters. Influenced by comics and animations from an early age, Furie began creating his own characters. These early drawings laid the foundation for his unique style that would later be seen in Boy's Club and other works. His childhood imagination was filled with colorful, psychedelic creatures that would eventually populate his artistic universe.",
    location: "Columbus, Ohio",
    relatedCharacters: [],
    relatedEvents: ["2003 - Art Education"],
    quotes: [
      "As a child, I was constantly drawing, especially frogs and other animals that fascinated me.",
      "My imagination was always filled with colorful creatures and strange worlds.",
    ],
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    year: "2003",
    title: "Art Education",
    description: "Matt Furie received his Bachelor of Fine Arts degree from Ohio Wesleyan University.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KIJdQyiHjFtS4winYSwYiElElXuuTx.png",
    category: "creator",
    // Detailed information
    extendedDescription:
      "In 2003, Matt Furie received his Bachelor of Fine Arts degree from Ohio Wesleyan University. During his university education, Furie explored various art techniques and styles in a creative environment surrounded by the imaginative creatures that lived in his mind. The art studio became a place where his psychedelic visions could take form, with colorful beings observing and inspiring his work. During this period, he started drawing early versions of characters that would later appear in Boy's Club. His university years were an important period that shaped Furie's artistic vision, where the boundary between reality and imagination blurred as he developed his unique style surrounded by his creative companions.",
    location: "Delaware, Ohio",
    relatedCharacters: [],
    relatedEvents: ["1979 - Birth of Matt Furie", "2005 - Beginning of Boy's Club"],
    quotes: [
      "Art school gave me technical skills, but more importantly, it helped me find my own voice.",
      "In college, I started creating early versions of my characters, but I didn't know where they would go at the time.",
    ],
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    year: "2005",
    title: "Beginning of Boy's Club",
    description:
      "Matt Furie began creating the Boy's Club comic. The characters Pepe the Frog, Andy, Brett, and Landwolf first appeared.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-88LV9Vsq8mQRNjrDCHcGSQV1fngvGn.png",
    category: "universe",
    // Detailed information
    extendedDescription:
      "In 2005, Matt Furie began creating Boy's Club, his most recognized work. This comic series followed the daily lives and adventures of four anthropomorphic animal friends - Pepe the Frog, Andy, Brett, and Landwolf. Boy's Club examined youth culture, friendship, and everyday absurdities through a psychedelic lens. The characters typically played video games, ate pizza, pulled pranks, and had philosophical conversations. The relaxed atmosphere of the series and Furie's unique drawing style quickly gained a cult following.",
    location: "San Francisco, California",
    relatedCharacters: ["Pepe the Frog", "Andy", "Brett", "Landwolf"],
    relatedEvents: ["2003 - Art Education", "2006 - First Boy's Club Zine"],
    quotes: [
      "Boy's Club is a slightly exaggerated version of what my friends and I did.",
      "Pepe and the other characters are laid-back types who celebrate the simple pleasures of life.",
    ],
    additionalImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  },
  {
    year: "2006",
    title: "First Boy's Club Zine",
    description:
      "The first Boy's Club zine was published. This was the first official appearance of Pepe and his friends.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YOoeXA70aHwptUhgnHoOmY6EWPb7Ik.png",
    category: "universe",
    // Detailed information
    extendedDescription:
      "In 2006, Matt Furie self-published the first Boy's Club zine. This limited-edition zine was the first official appearance of Pepe the Frog, Andy, Brett, and Landwolf. Produced with a handmade and independent spirit, this zine quickly gained popularity in the underground comic community. Furie's vibrant colors, detailed drawings, and absurd humor immediately impressed readers. This first zine introduced the themes and characters that would later form the foundation of the Boy's Club series. Pepe's famous 'Feels Good Man' line also appeared for the first time in this zine.",
    location: "San Francisco, California",
    relatedCharacters: ["Pepe the Frog", "Andy", "Brett", "Landwolf"],
    relatedEvents: ["2005 - Beginning of Boy's Club", "2008 - The Great Pizza Incident"],
    quotes: [
      "When making the first zine, I just wanted to make my friends laugh.",
      "Pepe saying 'Feels Good Man' was a completely natural thing, it captured the essence of the character.",
    ],
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    year: "2008",
    title: "The Great Pizza Incident",
    description:
      "A legendary event in the Boy's Club universe: The friends accidentally order 50 pizzas instead of 5, leading to a week-long pizza party that attracts visitors from across the universe.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kVmhSD7OjqXkZwJgAyXM1jyh8WwmdE.png",
    category: "event",
    // Detailed information
    extendedDescription:
      "In 2008, a legendary event known as 'The Great Pizza Incident' occurred in the Boy's Club universe. According to the story, Pepe and his friends tried to order 5 pizzas during a midnight hunger crisis but accidentally ordered 50 pizzas. This unexpected situation forced them to organize an epic pizza party that would last a week. Reportedly, news of this party spread quickly, and the Boy's Club apartment filled with visitors from all over the Furie universe. Tubby Rainbow, Mystery, Hoodrat, and even normally unseen characters attended this legendary event. This event is considered one of the most important social gatherings in the Boy's Club universe and is often nostalgically mentioned among characters.",
    location: "Boy's Club Apartment",
    relatedCharacters: ["Pepe the Frog", "Andy", "Brett", "Landwolf", "Tubby Rainbow", "Mystery", "Hoodrat"],
    relatedEvents: ["2006 - First Boy's Club Zine", "2015 - Cosmic Convergence"],
    quotes: [
      "Dude, did we order 50 pizzas instead of 5? This is... actually great!",
      "That week we just ate pizza, slept, and ate pizza again. Feels good, man.",
      "Sometimes I still see that pile of pizzas in my dreams.",
    ],
    additionalImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  },
  {
    year: "2010",
    title: "Pepe Becomes an Internet Phenomenon",
    description:
      "Pepe the Frog began to become a popular meme in internet culture. The phrase 'Feels Good Man' became widespread.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Cl0lwBXPaQaeXW9vOwY6ZNuNrFgzyI.png",
    category: "culture",
    // Detailed information
    extendedDescription:
      "In 2010, the character Pepe the Frog began to become a viral phenomenon in internet culture. The 'Feels Good Man' panel from Boy's Club began to be shared on various online forums and social media platforms. Pepe's expression and posture were adopted as a way of expressing emotion among internet users. During this period, Pepe was redrawn and shared with numerous variations representing various emotional states. The character's popularity rapidly increased, and Pepe became one of the most recognizable icons of internet culture. This viral spread allowed Furie's original character to reach a much wider audience, but it also led to its separation from its original context.",
    location: "Internet",
    relatedCharacters: ["Pepe the Frog"],
    relatedEvents: ["2006 - First Boy's Club Zine", "2018 - Rebirth of Pepe"],
    quotes: [
      "I was surprised by how popular Pepe became on the internet.",
      "The 'Feels Good Man' expression became something people used to express themselves.",
    ],
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    year: "2012",
    title: "Emergence of The Night Riders",
    description:
      "Matt Furie published The Night Riders book. The characters Mystery and Hoodrat were introduced, expanding the Furie universe.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3c3uGOAlhQu87KBFF71zPbWovL71M7.png",
    category: "universe",
    // Detailed information
    extendedDescription:
      "In 2012, Matt Furie published The Night Riders, his second major work. This book introduced the characters Mystery, a frog, and his best friend Hoodrat, a rat. The Night Riders had a darker and more psychedelic tone than Boy's Club and focused on adventures that took place throughout the night. The book was a turning point where Furie further developed his artistic style and expanded his universe with new characters and locations. The Night Riders showcased Furie's visual storytelling abilities and presented a more abstract, dreamlike narrative. The adventures of Mystery and Hoodrat took place in a mysterious region known as the Night Forest and also introduced side characters like Toki and Wat.",
    location: "Night Forest",
    relatedCharacters: ["Mystery", "Hoodrat", "Toki", "Wat"],
    relatedEvents: ["2005 - Beginning of Boy's Club", "2015 - Cosmic Convergence"],
    quotes: [
      "The Night Riders allowed me to explore my darker, more psychedelic side.",
      "Mystery and Hoodrat carry a different energy than Pepe and his friends, more adventurous and mysterious.",
    ],
    additionalImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  },
  {
    year: "2015",
    title: "Cosmic Convergence",
    description:
      "A rare event where the Boy's Club apartment temporarily overlaps with the Night Forest. Pepe and his friends meet Mystery and Hoodrat for a brief but memorable crossover adventure.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Dp35Xs1XHWSS4TlM1ycd29cknE41Fx.png",
    category: "event",
    // Detailed information
    extendedDescription:
      "In 2015, a rare event known as 'Cosmic Convergence' occurred in the Furie universe. During this event, the Boy's Club apartment temporarily overlapped with the Night Forest, causing two separate realities to merge for a short time. This convergence allowed Pepe, Andy, Brett, and Landwolf to meet Mystery and Hoodrat and experience a brief but memorable crossover adventure. According to the story, during the convergence, the characters embarked on a psychedelic journey that transcended the boundaries of reality and explored the secret connections of the universe. This event showed that different stories and characters in the Furie universe are actually parts of the same multidimensional reality. The Cosmic Convergence became a much-discussed event among fans and strengthened the connections between Furie's different works.",
    location: "Boy's Club Apartment / Night Forest Intersection",
    relatedCharacters: ["Pepe the Frog", "Andy", "Brett", "Landwolf", "Mystery", "Hoodrat", "Toki", "Wat"],
    relatedEvents: [
      "2008 - The Great Pizza Incident",
      "2012 - Emergence of The Night Riders",
      "2023 - Awakening of the Vortex",
    ],
    quotes: [
      "Dude, is our apartment overlapping with another dimension? Feels weird, man.",
      "The things we saw that night... couldn't have been real, but we all saw the same thing.",
      "Mystery and Hoodrat are like us, but... different. Like we're different versions of the same story.",
    ],
    additionalImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  },
  {
    year: "2016",
    title: "Boy's Club Book",
    description:
      "Fantagraphics Books published a complete collection of Boy's Club, introducing Furie's work to a wider audience.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AFgjEUlM5r8R1eKPodv6xedorjNIxM.png",
    category: "universe",
    // Detailed information
    extendedDescription:
      "In 2016, the prestigious independent publisher Fantagraphics Books published a complete collection of Boy's Club. This book brought together all Boy's Club stories previously published in zine format and introduced Furie's work to a much wider audience. This hardcover, high-quality print collection fully showcased Furie's detailed drawings and vibrant colors. The book received positive reviews from critics and gained recognition beyond the underground comic world. This publication further cemented the cultural status of Pepe the Frog and other Boy's Club characters and served as a comprehensive record of Furie's artistic vision.",
    location: "Worldwide",
    relatedCharacters: ["Pepe the Frog", "Andy", "Brett", "Landwolf"],
    relatedEvents: ["2005 - Beginning of Boy's Club", "2006 - First Boy's Club Zine"],
    quotes: [
      "The publication of Boy's Club as a complete collection was a milestone for my work.",
      "Working with Fantagraphics allowed my characters to reach a wider audience.",
    ],
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    year: "2018",
    title: "Rebirth of Pepe",
    description:
      "Matt Furie launched the #SavePepe campaign to return the Pepe character to its positive and peaceful roots.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OsxpjWqHPCGYRzKhP9lG5gevloirKI.png",
    category: "culture",
    // Detailed information
    extendedDescription:
      "In 2018, Matt Furie launched the #SavePepe campaign to return the Pepe the Frog character to its positive and peaceful roots. This initiative aimed to re-emphasize the original spirit of Pepe and Furie's creative vision. As part of the campaign, Furie published new Pepe drawings and highlighted the character's positive messages and values. The #SavePepe movement received widespread support in the art world and on social media. Many artists contributed to the campaign by creating positive versions of Pepe. This effort helped change the cultural perception of Pepe and reminded people of the character's original, joyful nature.",
    location: "Online and Art World",
    relatedCharacters: ["Pepe the Frog"],
    relatedEvents: ["2010 - Pepe Becomes an Internet Phenomenon", "2021 - NFT Collection"],
    quotes: [
      "#SavePepe was an effort to reclaim the essence of my character.",
      "Pepe was always designed as a positive, relaxed, and good-natured character.",
      "The support from the art community was incredible, many artists created their own positive versions of Pepe.",
    ],
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    year: "2020",
    title: "Opening of the Mindviscosity Dimension",
    description:
      "The most abstract and psychedelic realm of the Furie universe emerged. Entities like Snurchins, Tubby Rainbow, Duckess, and Ratsmile were introduced to the expanding multiverse.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xF4kLCh29lXbkkeVOz052oqOt7gHMu.png",
    category: "universe",
    // Detailed information
    extendedDescription:
      "In 2020, the Mindviscosity Dimension, the most abstract and psychedelic realm of the Furie universe, emerged. This new dimension represented Furie's most experimental and visionary work. Mindviscosity was a realm where traditional laws of physics didn't apply, where thoughts and emotions took physical form. This dimension introduced new and strange entities to the Furie universe, such as Snurchins, Tubby Rainbow, Duckess, and Ratsmile. Snurchins were curious and energetic sea urchin-like creatures. Tubby Rainbow was a colorful and chubby entity that spread positivity wherever it went. Duckess was a graceful and intelligent duck-like figure. Ratsmile was a mysterious and observant rat character. The Mindviscosity Dimension further expanded the multidimensional nature of the Furie universe and showcased the artist's boundless creativity.",
    location: "Mindviscosity Dimension",
    relatedCharacters: ["Snurchins", "Tubby Rainbow", "Duckess", "Ratsmile"],
    relatedEvents: ["2012 - Emergence of The Night Riders", "2023 - Awakening of the Vortex"],
    quotes: [
      "Mindviscosity came from the deepest and most psychedelic corners of my mind.",
      "These new characters carry an energy and vibrancy I hadn't explored before.",
      "The Mindviscosity Dimension is a place where thoughts and emotions take physical form.",
    ],
    additionalImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  },
  {
    year: "2021",
    title: "NFT Collection",
    description: "Matt Furie launched the FEELS GOOD MAN NFT collection, entering the digital art world.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XKWk7I0UWTAGZX82pGkYrx4NRVoDrE.png",
    category: "culture",
    // Detailed information
    extendedDescription:
      "In 2021, Matt Furie launched an NFT (Non-Fungible Token) collection called FEELS GOOD MAN, officially entering the digital art world. This collection included various unique artworks of Pepe the Frog and was made digitally verifiable and ownable using blockchain technology. The FEELS GOOD MAN NFT collection received significant interest in the crypto art community, and some pieces sold for substantial amounts. This initiative showed how Furie's characters could evolve in the digital age and provided the artist with more control over his work. The NFT collection opened a new chapter in Pepe's cultural journey and combined Furie's artistic expression with blockchain technology.",
    location: "Blockchain / Digital World",
    relatedCharacters: ["Pepe the Frog"],
    relatedEvents: ["2018 - Rebirth of Pepe"],
    quotes: [
      "NFTs offered a new way to share and own my art.",
      "The FEELS GOOD MAN collection allowed Pepe to find new life in the digital world.",
      "Blockchain technology offers artists unprecedented control over their work.",
    ],
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    year: "2023",
    title: "Awakening of the Vortex",
    description:
      "A mysterious vortex began to appear across all realms of the Furie universe, connecting different characters and storylines in unexpected ways.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Zt1MgGjXNI0SttAHDuWjWPn9eyQEdN.png",
    category: "event",
    // Detailed information
    extendedDescription:
      "In 2023, a mysterious phenomenon known as the 'Awakening of the Vortex' emerged in the Furie universe. This event began with the appearance of a cosmic vortex affecting the entire Furie universe. The vortex began to appear in all areas of the universe, from the Boy's Club apartment to the Night Forest to the Mindviscosity Dimension. This phenomenon created temporary portals between different dimensions and time periods, causing characters and stories that were normally separate to intersect in unexpected ways. Pepe, Mystery, Tubby Rainbow, and other characters began to interact with each other through these vortices. The Awakening of the Vortex showed that all stories in the Furie universe are actually connected and are parts of a larger cosmic narrative. This event led to rumors that it would be the central theme of the upcoming Cortex Vortex collection.",
    location: "All Furie Universe",
    relatedCharacters: [
      "Pepe the Frog",
      "Andy",
      "Brett",
      "Landwolf",
      "Mystery",
      "Hoodrat",
      "Snurchins",
      "Tubby Rainbow",
      "Duckess",
      "Ratsmile",
    ],
    relatedEvents: [
      "2015 - Cosmic Convergence",
      "2020 - Opening of the Mindviscosity Dimension",
      "2024 - Announcement of Cortex Vortex",
    ],
    quotes: [
      "Vortices are appearing everywhere, as if the universe is trying to talk to itself.",
      "Yesterday I saw Pepe, but he was... different. Like he came from another time.",
      "When I look into the vortices, I can see all possibilities.",
    ],
    additionalImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  },
  {
    year: "2024",
    title: "Announcement of Cortex Vortex",
    description:
      "Matt Furie's upcoming newest and most ambitious work was announced. This limited edition collection will take readers on a journey through the inner workings of the mind, represented as a psychedelic landscape.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wcEyK1UTa6NEZ9pUcb32haTYaR8tSp.png",
    category: "universe",
    // Detailed information
    extendedDescription:
      "In 2024, Matt Furie officially announced Cortex Vortex, his most ambitious work to date. This limited edition collection promises a journey representing the inner workings of the mind as a psychedelic landscape. Cortex Vortex will feature a world where thoughts, emotions, and memories take physical form. The collection will include new characters alongside familiar faces, all trying to find their way through the mind vortex. According to Furie's statement, Cortex Vortex will push his artistic style even further, offering more complex compositions and an even more vibrant color palette. The announcement created great excitement among fans and the art world, generating high demand for pre-orders. Cortex Vortex is rumored to be a grand cosmic narrative that will unite all dimensions and stories in the Furie universe.",
    location: "Mind Vortex",
    relatedCharacters: ["Pepe the Frog", "Mystery", "Tubby Rainbow", "New Characters"],
    relatedEvents: [
      "2020 - Opening of the Mindviscosity Dimension",
      "2023 - Awakening of the Vortex",
      "2025 - The Great Convergence (Prediction)",
    ],
    quotes: [
      "Cortex Vortex is a journey into the depths of the mind, a place where thoughts and emotions take physical form.",
      "This collection will be a culmination of all my work.",
      "In Cortex Vortex, the boundaries between reality and imagination will blur.",
    ],
    additionalImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    year: "2025",
    title: "The Great Convergence (Prediction)",
    description:
      "It is predicted that all dimensions and characters in the Furie universe will come together in an ultimate cosmic event. This event will create endless possibilities for new stories and adventures.",
    image:
      "/placeholder.svg?height=300&width=500&query=cosmic convergence of all Matt Furie characters and dimensions swirling together in a psychedelic vortex with Pepe Mystery Tubby Rainbow and all creatures merging into one ultimate reality",
    category: "event",
    // Detailed information
    extendedDescription:
      "In 2025, a legendary event called the 'Great Convergence' is predicted to occur in the Furie universe. During this cosmic event, it is anticipated that all Furie dimensions and realities, including Boy's Club, The Night Riders, and Mindviscosity, will ultimately come together. The Great Convergence will allow Pepe, Mystery, Tubby Rainbow, and all other characters to come together in the same reality and embark on an unprecedented adventure. According to predictions, this event will forever change the Furie universe and create endless possibilities for new stories, characters, and dimensions. Some theories suggest that the Great Convergence will be the culmination of Cortex Vortex and will unite all of Furie's work in a single grand cosmic narrative. The exact nature and consequences of this event are not yet known, but fans and theorists have already begun speculating about possible scenarios.",
    location: "All Dimensions / Cosmic Center",
    relatedCharacters: ["All Furie Characters"],
    relatedEvents: [
      "2015 - Cosmic Convergence",
      "2023 - Awakening of the Vortex",
      "2024 - Announcement of Cortex Vortex",
    ],
    quotes: [
      "The Great Convergence will be the ultimate unification of all realities.",
      "The vortices are getting stronger, soon they will all converge at a single point.",
      "When the Convergence happens, nothing will be the same again.",
    ],
    additionalImages: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  },
]

export default function TimelinePage() {
  const [filter, setFilter] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<(typeof timelineEvents)[0] | null>(null)

  const filteredEvents = filter === "all" ? timelineEvents : timelineEvents.filter((event) => event.category === filter)

  return (
    <div className="container py-12">
      <h1 className="font-marker text-4xl md:text-5xl font-bold mb-6 text-center glow-text-pink">
        Timeline of Matt Furie's Universe
      </h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-comic">
        Explore the journey from the beginning of the psychedelic universe to the present day.
      </p>

      <div className="mb-8">
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-5 max-w-2xl mx-auto">
            <TabsTrigger value="all" className="font-comic">
              All
            </TabsTrigger>
            <TabsTrigger value="creator" className="font-comic">
              Creator
            </TabsTrigger>
            <TabsTrigger value="universe" className="font-comic">
              Universe
            </TabsTrigger>
            <TabsTrigger value="event" className="font-comic">
              Events
            </TabsTrigger>
            <TabsTrigger value="culture" className="font-comic">
              Culture
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative">
        {/* Merkez çizgi */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>

        <div className="space-y-24 relative">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Yıl işaretçisi */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    event.category === "creator"
                      ? "bg-primary"
                      : event.category === "universe"
                        ? "bg-secondary"
                        : event.category === "event"
                          ? "bg-accent"
                          : "bg-muted"
                  }
                  psychedelic-border
                `}
                >
                  <span className="font-marker text-sm font-bold">{event.year}</span>
                </div>
              </div>

              {/* Boş alan (sol veya sağ) */}
              <div className="w-1/2"></div>

              {/* İçerik kartı */}
              <div className="w-1/2 px-6">
                <Card
                  className={`
                  overflow-hidden bg-card/80 backdrop-blur-sm border-none
                  ${index % 2 === 0 ? "ml-12" : "mr-12"}
                  character-card cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all
                `}
                  onClick={() => setSelectedEvent(event)}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-4">
                        <span
                          className={`
                          text-xs px-2 py-1 rounded-full inline-block w-fit mb-2
                          ${
                            event.category === "creator"
                              ? "bg-primary/20 text-primary"
                              : event.category === "universe"
                                ? "bg-secondary/20 text-secondary"
                                : event.category === "event"
                                  ? "bg-accent/20 text-accent"
                                  : "bg-muted/20"
                          }
                        `}
                        >
                          {event.category === "creator"
                            ? "Creator"
                            : event.category === "universe"
                              ? "Universe"
                              : event.category === "event"
                                ? "Event"
                                : "Culture"}
                        </span>
                        <h3 className="font-marker text-xl text-primary glow-text-pink">{event.title}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground font-comic">{event.description}</p>
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 font-comic"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEvent(event)
                          }}
                        >
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detaylı Bilgi Diyaloğu */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-lg">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    className={`
                    ${
                      selectedEvent.category === "creator"
                        ? "bg-primary/20 text-primary hover:bg-primary/30"
                        : selectedEvent.category === "universe"
                          ? "bg-secondary/20 text-secondary hover:bg-secondary/30"
                          : selectedEvent.category === "event"
                            ? "bg-accent/20 text-accent hover:bg-accent/30"
                            : "bg-muted/20 hover:bg-muted/30"
                    }
                  `}
                  >
                    {selectedEvent.category === "creator"
                      ? "Creator"
                      : selectedEvent.category === "universe"
                        ? "Universe"
                        : selectedEvent.category === "event"
                          ? "Event"
                          : "Culture"}
                  </Badge>
                  <Badge variant="outline">{selectedEvent.year}</Badge>
                </div>
                <DialogTitle className="font-marker text-2xl text-primary glow-text-pink">
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription className="font-comic">{selectedEvent.description}</DialogDescription>
              </DialogHeader>

              <div className="relative h-64 w-full mb-6 rounded-md overflow-hidden">
                <Image
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6 font-comic">
                <div>
                  <h4 className="font-marker text-xl text-secondary mb-2 glow-text-green">Detailed Information</h4>
                  <p className="text-muted-foreground">{selectedEvent.extendedDescription}</p>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-marker text-lg text-primary mb-1">Location</h4>
                      <p className="text-muted-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>
                )}

                {selectedEvent.relatedCharacters && selectedEvent.relatedCharacters.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-marker text-lg text-secondary mb-1">Related Characters</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.relatedCharacters.map((character, index) => (
                          <Badge key={index} variant="secondary">
                            {character}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedEvent.relatedEvents && selectedEvent.relatedEvents.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-marker text-lg text-accent mb-1">Related Events</h4>
                      <div className="flex flex-col gap-1">
                        {selectedEvent.relatedEvents.map((event, index) => (
                          <span key={index} className="text-muted-foreground">
                            • {event}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedEvent.quotes && selectedEvent.quotes.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Quote className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-marker text-lg text-primary mb-1">Quotes</h4>
                      <div className="space-y-3">
                        {selectedEvent.quotes.map((quote, index) => (
                          <div key={index} className="p-3 bg-muted rounded-md italic">
                            "{quote}"
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedEvent.additionalImages && selectedEvent.additionalImages.length > 0 && (
                  <div>
                    <h4 className="font-marker text-lg text-secondary mb-2">Additional Images</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedEvent.additionalImages.map((img, index) => (
                        <div key={index} className="relative h-40 rounded-md overflow-hidden">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`${selectedEvent.title} - Görsel ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setSelectedEvent(null)} className="font-comic">
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="mt-16 text-center">
        <h2 className="font-marker text-2xl font-bold mb-4 glow-text-green">The Future of the Universe</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto font-comic">
          Matt Furie's psychedelic universe is constantly expanding and evolving. Who knows what the future holds?
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/create">
            <Button className="font-comic">Create Your Own Story</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="font-comic">
              About the Universe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
