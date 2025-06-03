"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VideoTestPage() {
  const [serverStatus, setServerStatus] = useState<any>(null)
  const [clientStatus, setClientStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkServerStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/video-status")
      const data = await response.json()
      setServerStatus(data)
      console.log("🔍 Server video status:", data)
    } catch (error) {
      console.error("❌ Server status check failed:", error)
      setServerStatus({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  const checkClientStatus = async () => {
    try {
      const response = await fetch("/videos/psychedelic-background.mp4", { method: "HEAD" })
      const contentLength = response.headers.get("content-length")

      const status = {
        accessible: response.ok,
        status: response.status,
        statusText: response.statusText,
        size: contentLength ? `${(Number.parseInt(contentLength) / 1024 / 1024).toFixed(2)} MB` : "Unknown",
        url: response.url,
        headers: Object.fromEntries(response.headers.entries()),
      }

      setClientStatus(status)
      console.log("🌐 Client video status:", status)
    } catch (error) {
      console.error("❌ Client status check failed:", error)
      setClientStatus({ error: error instanceof Error ? error.message : "Unknown error" })
    }
  }

  useEffect(() => {
    checkServerStatus()
    checkClientStatus()
  }, [])

  return (
    <div className="container py-12">
      <h1 className="font-marker text-4xl font-bold mb-8 text-center">Video Debug Test</h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={checkServerStatus} disabled={loading} className="mb-4">
              {loading ? "Checking..." : "Check Server Status"}
            </Button>

            {serverStatus && (
              <pre className="bg-muted p-4 rounded text-sm overflow-auto">{JSON.stringify(serverStatus, null, 2)}</pre>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={checkClientStatus} className="mb-4">
              Check Client Status
            </Button>

            {clientStatus && (
              <pre className="bg-muted p-4 rounded text-sm overflow-auto">{JSON.stringify(clientStatus, null, 2)}</pre>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">Console'u açın ve detaylı debug bilgilerini görün.</p>
      </div>
    </div>
  )
}
