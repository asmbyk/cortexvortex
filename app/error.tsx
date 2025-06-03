"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled error:", error)
  }, [error])

  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="font-marker text-4xl md:text-5xl font-bold mb-6 text-center glow-text-pink">
        Something went wrong!
      </h1>
      <p className="text-xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto font-comic">
        We encountered an error while trying to display this page.
      </p>
      <div className="bg-card/80 backdrop-blur-sm border-none p-6 rounded-lg mb-8 max-w-2xl w-full">
        <h2 className="font-marker text-2xl font-bold mb-4 text-primary">Error Details</h2>
        <div className="bg-muted p-4 rounded-md mb-4 overflow-auto max-h-60">
          <p className="font-mono text-sm">{error.message}</p>
          {error.stack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-primary">Stack trace</summary>
              <pre className="mt-2 text-xs overflow-auto">{error.stack}</pre>
            </details>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={reset} className="font-comic">
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" className="font-comic">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
