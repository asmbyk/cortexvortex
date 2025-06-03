import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StoryCardProps {
  title: string
  prompt: string
  excerpt: string
  image: string
  slug: string
  featured?: boolean
}

export default function StoryCard({ title, prompt, excerpt, image, slug, featured = false }: StoryCardProps) {
  return (
    <Card
      className={`character-card overflow-hidden bg-card/80 backdrop-blur-sm border-none ${featured ? "psychedelic-border" : ""}`}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={600}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
            <p className="text-xs text-secondary mb-1">Prompt: "{prompt}"</p>
            <h3 className="font-marker text-xl text-primary glow-text-blue">{title}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{excerpt}</p>
          <Link href={`/story/${slug}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full">
              Read Full Story
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
