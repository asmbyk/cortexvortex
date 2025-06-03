"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md p-8 bg-card rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-primary mb-4">Something went wrong!</h1>
            <p className="mb-6 text-muted-foreground">A critical error occurred while rendering the application.</p>
            <div className="bg-muted p-4 rounded-md mb-6 overflow-auto max-h-60">
              <p className="font-mono text-sm">{error.message}</p>
            </div>
            <Button onClick={() => reset()} className="w-full">
              Try Again
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              If the problem persists, please try refreshing the page or contact support.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
