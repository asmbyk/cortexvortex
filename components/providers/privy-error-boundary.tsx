"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class PrivyErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Caught error in PrivyErrorBoundary:", error, errorInfo)
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md p-8 bg-card rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Wallet Connection Error</h2>
            <p className="text-muted-foreground mb-6">
              There was an issue initializing the wallet connection. This might be due to a network issue or a
              configuration problem with your browser.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4 overflow-auto max-h-60">
              <p className="font-mono text-sm">{this.state.error?.message}</p>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full">
              Reload Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default PrivyErrorBoundary
