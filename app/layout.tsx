import type React from "react"
import type { Metadata } from "next"
import { Permanent_Marker, Comic_Neue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"
import VideoBackground from "@/components/video-background"
import SplashScreenWrapper from "@/components/splash-screen-wrapper"
import PrivyWrapper from "@/components/providers/privy-provider"
import { FarcasterProvider } from "@/components/farcaster/farcaster-provider"
import { SafeAreaWrapper } from "@/components/farcaster/safe-area-wrapper"
import { FarcasterHeader } from "@/components/farcaster/farcaster-header"

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
  display: "swap",
})

const comic = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cortex Vortex - Matt Furie's Story Engine",
  description: "Generate psychedelic stories in the style of Matt Furie's universe",
  icons: {
    icon: "/favicon.ico",
  },
  generator: "v0.dev",
  metadataBase: new URL("https://cortexvortex.art"),
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
  },
  other: {
    // Farcaster Mini App specific meta tags
    "fc:frame": "vNext",
    "fc:frame:image": "https://cortexvortex.art/images/cortex-vortex-logo-main.png",
    "fc:frame:button:1": "Enter the Vortex",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://cortexvortex.art",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Mini App detection and SDK loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const url = new URL(window.location.href);
              const isMiniApp = 
                url.pathname.startsWith('/mini') ||
                url.searchParams.get('miniApp') === 'true' ||
                window.parent !== window;
              
              if (isMiniApp) {
                document.documentElement.classList.add('mini-app-mode');
              }
            })();
          `,
          }}
        />
        {/* Farcaster Mini App specific meta tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://cortexvortex.art/images/cortex-vortex-logo-main.png" />
        <meta property="fc:frame:button:1" content="Enter the Vortex" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://cortexvortex.art" />

        {/* Viewport and mobile optimization for Mini Apps */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Preload critical resources */}
        <link rel="preload" href="/images/cortex-vortex-logo-main.png" as="image" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/cortex-vortex-logo-main.png" />

        {/* Farcaster SDK */}
        <script src="https://sdk.farcaster.xyz/v0.1.0/sdk.js" async></script>
      </head>
      <body className={`${marker.variable} ${comic.variable} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ErrorBoundary>
            <FarcasterProvider>
              <PrivyWrapper>
                <SplashScreenWrapper>
                  <SafeAreaWrapper className="relative flex min-h-screen flex-col">
                    <VideoBackground />
                    <div className="relative z-10 flex min-h-screen flex-col">
                      <FarcasterHeader />
                      <Header />
                      <main className="flex-1">{children}</main>
                      <Footer />
                      <Toaster />
                    </div>
                  </SafeAreaWrapper>
                </SplashScreenWrapper>
              </PrivyWrapper>
            </FarcasterProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
