import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewPage() {
  return (
    <div className="container py-12 text-center">
      <h1 className="font-marker text-4xl md:text-5xl font-bold mb-6 text-center glow-text-blue">New Story</h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-comic">
        This page is under construction.
      </p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
