// Farcaster SDK types and utilities
export type SafeAreaInsets = {
  top: number
  bottom: number
  left: number
  right: number
}

export type FrameNotificationDetails = {
  url: string
  token: string
}

export type CastEmbedLocationContext = {
  type: "cast_embed"
  embed: string
  cast: {
    fid: number
    hash: string
  }
}

export type NotificationLocationContext = {
  type: "notification"
  notification: {
    notificationId: string
    title: string
    body: string
  }
}

export type LauncherLocationContext = {
  type: "launcher"
}

export type ChannelLocationContext = {
  type: "channel"
  channel: {
    key: string
    name: string
    imageUrl?: string
  }
}

export type LocationContext =
  | CastEmbedLocationContext
  | NotificationLocationContext
  | LauncherLocationContext
  | ChannelLocationContext

export type UserContext = {
  fid: number
  username?: string
  displayName?: string
  pfpUrl?: string
  location?: {
    placeId: string
    description: string
  }
}

export type ClientContext = {
  clientFid: number
  added: boolean
  safeAreaInsets?: SafeAreaInsets
  notificationDetails?: FrameNotificationDetails
}

export type FrameContext = {
  user: UserContext
  location?: LocationContext
  client: ClientContext
}

// Mock SDK for environments where Farcaster SDK isn't available
const mockSdk = {
  context: {
    user: { fid: 0 },
    client: { clientFid: 0, added: false },
  } as FrameContext,
  getCapabilities: async () => [] as string[],
  haptics: {
    impactOccurred: async (style: string) => {},
    notificationOccurred: async (type: string) => {},
    selectionChanged: async () => {},
  },
}

// Get the SDK (either from window or use mock)
export const getFarcasterSdk = () => {
  if (typeof window !== "undefined" && "farcaster" in window) {
    return (window as any).farcaster
  }
  return mockSdk
}

// Helper to check if running in Farcaster environment
export const isInFarcasterApp = () => {
  if (typeof window !== "undefined") {
    return "farcaster" in window
  }
  return false
}

// Helper to get safe area insets with defaults
export const getSafeAreaInsets = (): SafeAreaInsets => {
  const sdk = getFarcasterSdk()
  return sdk.context.client.safeAreaInsets || { top: 0, bottom: 0, left: 0, right: 0 }
}

// Helper to check capabilities
export const hasCapability = async (capability: string): Promise<boolean> => {
  const sdk = getFarcasterSdk()
  const capabilities = await sdk.getCapabilities()
  return capabilities.includes(capability)
}

// Trigger haptic feedback if available
export const triggerHaptic = async (type: "impact" | "notification" | "selection", style?: string) => {
  const sdk = getFarcasterSdk()

  try {
    if (type === "impact" && (await hasCapability("haptics.impactOccurred"))) {
      await sdk.haptics.impactOccurred(style || "medium")
    } else if (type === "notification" && (await hasCapability("haptics.notificationOccurred"))) {
      await sdk.haptics.notificationOccurred(style || "success")
    } else if (type === "selection" && (await hasCapability("haptics.selectionChanged"))) {
      await sdk.haptics.selectionChanged()
    }
  } catch (error) {
    console.error("Haptic feedback error:", error)
  }
}
