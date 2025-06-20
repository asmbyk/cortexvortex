"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, MessageCircle, Twitter, BarChart3, Bug } from "lucide-react"
import { ConnectWallet } from "@/components/wallet/connect-wallet"

const navItems = [
  { name: "Home", path: "/", icon: "🏠" },
  { name: "Create", path: "/create", icon: "✨" },
  { name: "Characters", path: "/characters", icon: "🎭" },
  { name: "Timeline", path: "/timeline", icon: "📅" },
  { name: "How to Buy", path: "/how-to-buy", icon: "💰" },
  { name: "About", path: "/about", icon: "ℹ️" },
]

// Development ortamında debug linkini ekle
if (process.env.NODE_ENV === "development") {
  navItems.push({ name: "Debug", path: "/debug", icon: "🐛" })
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 sm:h-24 items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="relative group">
          <div className="absolute -inset-3 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="relative flex items-center">
            <Image
              src="/images/cortex-vortex-logo-main.png"
              alt="Cortex Vortex Logo"
              width={240}
              height={80}
              className="h-16 sm:h-20 w-auto group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-4 py-2 rounded-xl font-comic font-medium transition-all duration-300 ${
                pathname === item.path
                  ? "text-white bg-white/10 border border-white/20"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </span>
              {pathname === item.path && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-xl blur-sm"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Social Links & Wallet */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://t.me/cortexvortex"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-pink-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Telegram"
          >
            <MessageCircle className="h-5 w-5 text-gray-300 hover:text-pink-400" />
          </a>
          <a
            href="https://x.com/cortexvortexx"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5 text-gray-300 hover:text-blue-400" />
          </a>
          <a
            href="https://dexscreener.com/cortexvortex"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-green-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="DexScreener"
          >
            <BarChart3 className="h-5 w-5 text-gray-300 hover:text-green-400" />
          </a>
          {/* Development Debug Button */}
          {process.env.NODE_ENV === "development" && (
            <Link href="/debug">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-yellow-500/20">
                <Bug className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
              </Button>
            </Link>
          )}
          <ConnectWallet />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="container py-6">
            {/* Mobile Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/cortex-vortex-logo-main.png"
                alt="Cortex Vortex Logo"
                width={160}
                height={50}
                className="h-10 w-auto"
              />
            </div>

            <nav className="flex flex-col gap-2 mb-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-comic font-medium transition-all duration-300 ${
                    pathname === item.path
                      ? "text-white bg-white/10 border border-white/20"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={closeMenu}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Wallet Button */}
            <div className="mb-6 flex justify-center">
              <ConnectWallet />
            </div>

            {/* Mobile Social Links */}
            <div className="flex justify-center gap-4 pt-6 border-t border-white/10">
              <a
                href="https://t.me/cortexvortex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-pink-500/20 flex items-center justify-center transition-all duration-300"
                aria-label="Telegram"
                onClick={closeMenu}
              >
                <MessageCircle className="h-6 w-6 text-gray-300" />
              </a>
              <a
                href="https://x.com/cortexvortexx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
                onClick={closeMenu}
              >
                <Twitter className="h-6 w-6 text-gray-300" />
              </a>
              <a
                href="https://dexscreener.com/cortexvortex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-green-500/20 flex items-center justify-center transition-all duration-300"
                aria-label="DexScreener"
                onClick={closeMenu}
              >
                <BarChart3 className="h-6 w-6 text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
