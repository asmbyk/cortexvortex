"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo)
    this.setState({ errorInfo })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md p-8 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">Something went wrong</h2>
            <div className="bg-muted p-4 rounded-md mb-4 overflow-auto max-h-60">
              <p className="font-mono text-sm">{this.state.error?.toString()}</p>
              {this.state.errorInfo && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-primary">Stack trace</summary>
                  <pre className="mt-2 text-xs overflow-auto">{this.state.errorInfo.componentStack}</pre>
                </details>
              )}
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

export default ErrorBoundary
