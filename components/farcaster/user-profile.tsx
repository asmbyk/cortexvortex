"use client"

import { useFarcaster } from "@/components/providers/farcaster-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, User } from "lucide-react"

export function FarcasterUserProfile() {
  const { isInFarcaster, context, loading } = useFarcaster()

  if (loading) {
    return null
  }

  if (!isInFarcaster || !context?.user) {
    return null
  }

  const { user } = context

  return (
    <Card className="cosmic-card border-2 border-purple-500/30 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-purple-500/50">
            {user.pfpUrl ? (
              <AvatarImage
                src={user.pfpUrl || "/placeholder.svg"}
                alt={user.displayName || user.username || `User ${user.fid}`}
              />
            ) : (
              <AvatarFallback className="bg-purple-900/50">
                <User className="h-6 w-6 text-purple-300" />
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-marker text-lg text-white">
                {user.displayName || user.username || `Farcaster User`}
              </h3>
              <Badge variant="outline" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                FID: {user.fid}
              </Badge>
            </div>

            {user.username && <p className="text-sm text-gray-400 font-comic">@{user.username}</p>}

            {user.location && (
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                <span>{user.location.description}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
