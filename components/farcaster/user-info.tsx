"use client"

import Image from "next/image"
import { useFarcaster } from "./farcaster-provider"
import { Card, CardContent } from "@/components/ui/card"

export function FarcasterUserInfo() {
  const { context, isInFarcaster, isLoading } = useFarcaster()

  if (isLoading) {
    return (
      <Card className="bg-white/10 border-white/20">
        <CardContent className="p-4">
          <div className="animate-pulse flex items-center space-x-4">
            <div className="rounded-full bg-white/20 h-12 w-12"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
              <div className="h-3 bg-white/20 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isInFarcaster || !context) {
    return null
  }

  const { user, location, client } = context

  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {user.pfpUrl && (
            <Image
              src={user.pfpUrl || "/placeholder.svg"}
              alt={user.displayName || user.username || "User"}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div className="flex-1">
            <h3 className="font-comic font-bold text-white">
              {user.displayName || user.username || `User #${user.fid}`}
            </h3>
            <p className="text-gray-400 text-sm">FID: {user.fid}</p>
            {location && (
              <p className="text-gray-500 text-xs capitalize">Opened from: {location.type.replace("_", " ")}</p>
            )}
          </div>
          {client.added && <div className="text-green-400 text-xs bg-green-400/20 px-2 py-1 rounded">Added to App</div>}
        </div>
      </CardContent>
    </Card>
  )
}
