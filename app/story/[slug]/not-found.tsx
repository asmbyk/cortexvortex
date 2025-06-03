import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StoryNotFound() {
  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="font-marker text-4xl md:text-5xl font-bold mb-6 text-center glow-text-pink">Story Not Found</h1>
      <p className="text-xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto font-comic">
        The story you're looking for couldn't be found or no longer exists.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="font-comic">Return to Home</Button>
        </Link>
        <Link href="/create">
          <Button variant="outline" className="font-comic">
            Create New Story
          </Button>
        </Link>
      </div>
    </div>
  )
}
