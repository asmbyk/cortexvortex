import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CharacterCardProps {
  id: string
  name: string
  description: string
  image: string
  book: string
}

export default function CharacterCard({ id, name, description, image, book }: CharacterCardProps) {
  return (
    <Card className="character-card overflow-hidden bg-card/80 backdrop-blur-sm border-none">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
            <p className="text-xs text-secondary mb-1">{book}</p>
            <h3 className="font-marker text-xl text-primary glow-text-blue">{name}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{description}</p>
          <div className="flex gap-2">
            <Link href={`/characters/${id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Profile
              </Button>
            </Link>
            <Link href={`/create?character=${id}`} className="flex-1">
              <Button size="sm" className="w-full">
                Create Story
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
