"use client"

import { useEffect, useState } from "react"

export default function VideoStatusChecker() {
  const [status, setStatus] = useState({
    fileExists: null as boolean | null,
    fileSize: null as string | null,
    videoElement: null as boolean | null,
    canPlay: null as boolean | null,
    isPlaying: null as boolean | null,
    error: null as string | null,
  })

  useEffect(() => {
    const checkVideoStatus = async () => {
      // 1. Video dosyasının varlığını kontrol et
      try {
        const response = await fetch("/videos/psychedelic-background.mp4", { method: "HEAD" })
        const contentLength = response.headers.get("content-length")

        setStatus((prev) => ({
          ...prev,
          fileExists: response.ok,
          fileSize: contentLength ? `${(Number.parseInt(contentLength) / 1024 / 1024).toFixed(2)} MB` : "Unknown",
        }))

        if (!response.ok) {
          setStatus((prev) => ({ ...prev, error: `HTTP ${response.status}: ${response.statusText}` }))
          return
        }
      } catch (error) {
        setStatus((prev) => ({
          ...prev,
          fileExists: false,
          error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
        }))
        return
      }

      // 2. Video element'ini kontrol et
      const videoElement = document.querySelector("video")
      setStatus((prev) => ({ ...prev, videoElement: !!videoElement }))

      if (!videoElement) {
        setStatus((prev) => ({ ...prev, error: "Video element not found in DOM" }))
        return
      }

      // 3. Video yükleme durumunu kontrol et
      const checkVideoLoad = () => {
        setStatus((prev) => ({
          ...prev,
          canPlay: videoElement.readyState >= 3, // HAVE_FUTURE_DATA
          isPlaying: !videoElement.paused && !videoElement.ended && videoElement.readyState > 2,
        }))
      }

      // Event listener'ları ekle
      videoElement.addEventListener("canplay", checkVideoLoad)
      videoElement.addEventListener("playing", checkVideoLoad)
      videoElement.addEventListener("error", () => {
        setStatus((prev) => ({
          ...prev,
          error: `Video error: ${videoElement.error?.message || "Unknown video error"}`,
        }))
      })

      // İlk kontrol
      checkVideoLoad()

      // Cleanup
      return () => {
        videoElement.removeEventListener("canplay", checkVideoLoad)
        videoElement.removeEventListener("playing", checkVideoLoad)
      }
    }

    // 1 saniye bekle ki video element DOM'a eklensin
    const timer = setTimeout(checkVideoStatus, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getStatusIcon = (value: boolean | null) => {
    if (value === null) return "⏳"
    return value ? "✅" : "❌"
  }

  const getStatusText = (value: boolean | null) => {
    if (value === null) return "Checking..."
    return value ? "OK" : "Failed"
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/90 text-white p-4 rounded-lg text-sm max-w-sm">
      <h3 className="font-bold mb-2 text-yellow-400">🎬 Video Status Check</h3>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>File exists:</span>
          <span>
            {getStatusIcon(status.fileExists)} {getStatusText(status.fileExists)}
          </span>
        </div>

        {status.fileSize && (
          <div className="flex justify-between">
            <span>File size:</span>
            <span className="text-blue-400">{status.fileSize}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Video element:</span>
          <span>
            {getStatusIcon(status.videoElement)} {getStatusText(status.videoElement)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Can play:</span>
          <span>
            {getStatusIcon(status.canPlay)} {getStatusText(status.canPlay)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Is playing:</span>
          <span>
            {getStatusIcon(status.isPlaying)} {getStatusText(status.isPlaying)}
          </span>
        </div>

        {status.error && (
          <div className="mt-2 p-2 bg-red-900/50 rounded text-red-300 text-xs">
            <strong>Error:</strong> {status.error}
          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-400">Auto-refresh every page load</div>
    </div>
  )
}
