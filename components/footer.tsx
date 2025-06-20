import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Twitter, BarChart3, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-transparent">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5"></div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Image
                src="/images/cortex-vortex-logo-main.png"
                alt="Cortex Vortex Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 font-comic max-w-sm mx-auto md:mx-0">
              Transform your imagination into psychedelic stories featuring Matt Furie's iconic characters through the
              power of AI.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-marker text-xl font-bold mb-6 glow-text-blue">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/create" className="text-gray-400 hover:text-pink-400 transition-colors font-comic">
                  Create Story
                </Link>
              </li>
              <li>
                <Link href="/characters" className="text-gray-400 hover:text-purple-400 transition-colors font-comic">
                  Characters
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-gray-400 hover:text-blue-400 transition-colors font-comic">
                  Timeline
                </Link>
              </li>
              <li>
                <Link href="/how-to-buy" className="text-gray-400 hover:text-green-400 transition-colors font-comic">
                  How to Buy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors font-comic">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="text-center">
            <h4 className="font-marker text-xl font-bold mb-6 glow-text-green">Connect</h4>
            <div className="flex justify-center gap-4 mb-6">
              <a
                href="https://t.me/cortexvortex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-pink-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Telegram"
              >
                <MessageCircle className="h-6 w-6 text-gray-300 hover:text-pink-400" />
              </a>
              <a
                href="https://x.com/cortexvortexx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6 text-gray-300 hover:text-blue-400" />
              </a>
              <a
                href="https://dexscreener.com/cortexvortex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-green-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="DexScreener"
              >
                <BarChart3 className="h-6 w-6 text-gray-300 hover:text-green-400" />
              </a>
            </div>
            <p className="text-gray-400 font-comic text-sm">
              Join our community and stay updated with the latest psychedelic adventures!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="section-divider mb-8"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 font-comic text-sm">
            © {new Date().getFullYear()} Cortex Vortex. Made with{" "}
            <Heart className="inline h-4 w-4 text-pink-500 mx-1" />
            for the psychedelic universe.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors font-comic">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors font-comic">
              Terms
            </Link>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400 font-comic">Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
