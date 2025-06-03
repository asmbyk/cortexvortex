import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { VideoBackground } from "@/components/video-background"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SplashScreenWrapper } from "@/components/splash-screen-wrapper"
import { PrivyErrorBoundary } from "@/components/providers/privy-error-boundary"
import { PrivyProvider } from "@/components/providers/privy-provider"
import { OnchainKitProvider } from "@/components/providers/onchainkit-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cortex Vortex - AI-Powered Psychedelic Stories",
  description:
    "Enter the psychedelic universe where imagination meets artificial intelligence. Transform any idea into a story featuring Matt Furie's iconic characters.",
  keywords: ["AI stories", "Matt Furie", "psychedelic", "Pepe", "NFT", "blockchain", "creative writing"],
  authors: [{ name: "Cortex Vortex Team" }],
  creator: "Cortex Vortex",
  publisher: "Cortex Vortex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cortexvortex.art"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cortex Vortex - AI-Powered Psychedelic Stories",
    description:
      "Enter the psychedelic universe where imagination meets artificial intelligence. Transform any idea into a story featuring Matt Furie's iconic characters.",
    url: "https://cortexvortex.art",
    siteName: "Cortex Vortex",
    images: [
      {
        url: "/images/cortex-vortex-logo-main.png",
        width: 1200,
        height: 630,
        alt: "Cortex Vortex - Psychedelic AI Stories",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortex Vortex - AI-Powered Psychedelic Stories",
    description:
      "Enter the psychedelic universe where imagination meets artificial intelligence. Transform any idea into a story featuring Matt Furie's iconic characters.",
    images: ["/images/cortex-vortex-logo-main.png"],
    creator: "@cortexvortex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    // Farcaster Mini App specific meta tags
    "fc:frame": "vNext",
    "fc:frame:image": "https://cortexvortex.art/images/cortex-vortex-logo-main.png",
    "fc:frame:button:1": "Enter the Vortex",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://cortexvortex.art",
    "farcaster:app": "cortex-vortex",
    "farcaster:app:url": "https://cortexvortex.art",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Farcaster Mini App specific meta tags */}
        <meta name="farcaster:app" content="cortex-vortex" />
        <meta name="farcaster:app:url" content="https://cortexvortex.art" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://cortexvortex.art/images/cortex-vortex-logo-main.png" />
        <meta property="fc:frame:button:1" content="Enter the Vortex" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://cortexvortex.art" />

        {/* Viewport and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Preload critical resources */}
        <link rel="preload" href="/images/cortex-vortex-logo-main.png" as="image" />
        <link rel="preload" href="/videos/psychedelic-background.mp4" as="video" type="video/mp4" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/cortex-vortex-logo-main.png" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <VideoBackground />
        <PrivyErrorBoundary>
          <PrivyProvider>
            <OnchainKitProvider>
              <SplashScreenWrapper>
                <div className="relative z-10 min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </SplashScreenWrapper>
            </OnchainKitProvider>
          </PrivyProvider>
        </PrivyErrorBoundary>
      </body>
    </html>
  )
}
