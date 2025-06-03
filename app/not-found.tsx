import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="font-marker text-5xl md:text-7xl font-bold mb-6 text-center glow-text-pink">PAGE NOT FOUND</h1>
      <p className="text-xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto font-comic">
        The page you're looking for doesn't exist in this psychedelic dimension.
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
