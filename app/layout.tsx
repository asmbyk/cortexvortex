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
import PrivyErrorBoundary from "@/components/providers/privy-error-boundary"

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${marker.variable} ${comic.variable} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ErrorBoundary>
            <PrivyErrorBoundary>
              <PrivyWrapper>
                <SplashScreenWrapper>
                  <div className="relative flex min-h-screen flex-col">
                    <VideoBackground />
                    <div className="relative z-10 flex min-h-screen flex-col">
                      <Header />
                      <main className="flex-1">{children}</main>
                      <Footer />
                      <Toaster />
                    </div>
                  </div>
                </SplashScreenWrapper>
              </PrivyWrapper>
            </PrivyErrorBoundary>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
