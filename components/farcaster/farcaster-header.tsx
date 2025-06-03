"use client"

import { useFarcaster } from "./farcaster-provider"
import { FarcasterUserInfo } from "./user-info"

export function FarcasterHeader() {
  const { isInFarcaster, context } = useFarcaster()

  if (!isInFarcaster) {
    return null
  }

  return (
    <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 p-4">
      <div className="container mx-auto">
        <FarcasterUserInfo />
        {context?.location?.type === "cast_embed" && (
          <div className="mt-2 text-center">
            <p className="text-purple-400 text-sm font-comic">
              ✨ Opened from a Farcaster cast - Welcome to the Vortex!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
