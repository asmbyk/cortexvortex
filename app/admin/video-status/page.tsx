"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, ExternalLink, CheckCircle, XCircle, Cloud } from "lucide-react"

const VERCEL_BLOB_URL =
  "https://7w0vsajavmk5it6q.public.blob.vercel-storage.com/Make_this_image_202505282041-0lyqPS1XRknDQftVP6Xw9oS1hPFGPb.mp4"

export default function VideoStatusPage() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkVideoStatus = async () => {
    setLoading(true)
    try {
      // Check environment variable
      const envVideoUrl = process.env.NEXT_PUBLIC_VIDEO_URL

      // Use the Vercel Blob URL
      const videoUrl = envVideoUrl || VERCEL_BLOB_URL

      console.log("🔍 Checking Vercel Blob video status for:", videoUrl)

      const response = await fetch(videoUrl, { method: "HEAD" })
      const contentLength = response.headers.get("content-length")
      const contentType = response.headers.get("content-type")
      const lastModified = response.headers.get("last-modified")

      const statusData = {
        envVariableSet: !!envVideoUrl,
        videoUrl: videoUrl,
        accessible: response.ok,
        status: response.status,
        statusText: response.statusText,
        size: contentLength ? `${(Number.parseInt(contentLength) / (1024 * 1024)).toFixed(2)} MB` : "Unknown",
        contentType: contentType || "Unknown",
        lastModified: lastModified || "Unknown",
        isBlob: videoUrl.includes("blob.vercel-storage.com"),
        isLocal: videoUrl.startsWith("/"),
        timestamp: new Date().toISOString(),
        headers: Object.fromEntries(response.headers.entries()),
      }

      setStatus(statusData)
      console.log("📊 Vercel Blob video status:", statusData)
    } catch (error) {
      console.error("❌ Status check failed:", error)
      setStatus({
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkVideoStatus()
  }, [])

  const getStatusBadge = () => {
    if (!status) return null

    if (status.error) {
      return <Badge variant="destructive">❌ Error</Badge>
    }

    if (status.accessible && status.isBlob) {
      return <Badge className="bg-green-500">✅ Vercel Blob Active</Badge>
    }

    if (status.accessible && !status.isBlob) {
      return <Badge variant="secondary">⚠️ Not Using Blob</Badge>
    }

    return <Badge variant="destructive">❌ Not Accessible</Badge>
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="font-marker text-4xl font-bold mb-8 text-center glow-text-blue">Vercel Blob Video Status</h1>

      <div className="grid gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-marker text-2xl text-primary flex items-center gap-2">
              <Cloud className="h-6 w-6" />
              Vercel Blob Video Status
            </CardTitle>
            <Button onClick={checkVideoStatus} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            {status ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  {getStatusBadge()}
                </div>

                {status.error ? (
                  <div className="bg-red-900/20 border border-red-500/30 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="font-semibold text-red-400">Error</span>
                    </div>
                    <p className="text-sm">{status.error}</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold">Environment Variable:</span>
                        <div className="flex items-center gap-2 mt-1">
                          {status.envVariableSet ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">
                            {status.envVariableSet ? "NEXT_PUBLIC_VIDEO_URL is set" : "NEXT_PUBLIC_VIDEO_URL not set"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold">Video Source:</span>
                        <div className="flex items-center gap-2 mt-1">
                          {status.isBlob ? (
                            <Badge className="bg-blue-500">☁️ Vercel Blob</Badge>
                          ) : status.isLocal ? (
                            <Badge variant="outline">📁 Local File</Badge>
                          ) : (
                            <Badge variant="outline">🌐 External URL</Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold">Accessibility:</span>
                        <div className="flex items-center gap-2 mt-1">
                          {status.accessible ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">
                            {status.accessible ? `Accessible (${status.status})` : `Not accessible (${status.status})`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold">File Details:</span>
                        <div className="text-sm mt-1 space-y-1">
                          <div>Size: {status.size}</div>
                          <div>Type: {status.contentType}</div>
                          <div>Modified: {new Date(status.lastModified).toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold">Vercel Blob URL:</span>
                        <div className="bg-muted p-2 rounded mt-1 break-all font-mono text-xs">{status.videoUrl}</div>
                        {status.accessible && (
                          <Button variant="outline" size="sm" className="mt-2" asChild>
                            <a href={status.videoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-3 w-3" />
                              Open Video
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {!status.error && status.accessible && status.isBlob && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-semibold text-green-400">Perfect Setup!</span>
                    </div>
                    <p className="text-sm">
                      Your Vercel Blob video is properly configured and accessible. The video should now play on your
                      homepage.
                    </p>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  Last checked: {new Date(status.timestamp).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Checking Vercel Blob video status...</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-card/80 backdrop-blur-sm border-none">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <a href="/">View Homepage</a>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <a href="/video-test">Test Video Playback</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-none">
            <CardHeader>
              <CardTitle className="text-lg">Vercel Blob Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Current URL:</strong>
                <code className="block bg-muted p-2 rounded mt-1 text-xs break-all">{VERCEL_BLOB_URL}</code>
              </div>
              <div>
                <strong>Benefits:</strong>
                <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                  <li>Global CDN distribution</li>
                  <li>Automatic optimization</li>
                  <li>Reliable hosting</li>
                  <li>Fast loading times</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
