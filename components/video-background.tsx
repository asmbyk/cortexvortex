"use client"

import { useEffect, useRef, useState } from "react"

const VIDEO_URL =
  process.env.NEXT_PUBLIC_VIDEO_URL ||
  "https://7w0vsajavmk5it6q.public.blob.vercel-storage.com/Make_this_image_202505282041-0lyqPS1XRknDQftVP6Xw9oS1hPFGPb.mp4"

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoExists, setVideoExists] = useState(false)

  const checkVideoFile = async () => {
    try {
      const response = await fetch(VIDEO_URL, {
        method: "HEAD",
        cache: "no-cache",
      })
      setVideoExists(response.ok)
    } catch (error) {
      setVideoExists(false)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    checkVideoFile()

    const handleCanPlay = () => {
      setVideoLoaded(true)
      setTimeout(() => {
        video.play().catch(() => {})
      }, 100)
    }

    const handleError = () => {
      setVideoExists(false)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-3000 ${
          videoLoaded && videoExists ? "opacity-40" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Enhanced Cosmic Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-3000 ${
          videoLoaded && videoExists ? "opacity-60" : "opacity-100"
        }`}
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 0, 110, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 75% 75%, rgba(131, 56, 236, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 75% 25%, rgba(58, 134, 255, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 25% 75%, rgba(6, 255, 165, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(255, 190, 11, 0.1) 0%, transparent 80%),
            linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
          `,
          animation: "psychedelic-flow 25s ease infinite",
        }}
      />

      {/* Animated Particles Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-4000"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-5000"></div>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
    </div>
  )
}
