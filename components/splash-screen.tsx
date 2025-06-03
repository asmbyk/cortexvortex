"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showCharacters, setShowCharacters] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [showFinalText, setShowFinalText] = useState(false)

  // Karakter sayfasındaki karakterleri kullanıyoruz
  const characters = [
    {
      id: "pepe",
      name: "Pepe the Frog",
      image: "/images/pepe-new.png",
      color: "from-green-400 to-blue-500",
    },
    {
      id: "andy",
      name: "Andy",
      image: "/images/andy.png",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: "brett",
      name: "Brett",
      image: "/images/brett.png",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "landwolf",
      name: "Landwolf",
      image: "/images/landwolf.png",
      color: "from-purple-600 to-pink-500",
    },
    {
      id: "mystery",
      name: "Mystery",
      image: "/images/mystery.png",
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "hoodrat",
      name: "Hoodrat",
      image: "/images/hoodrat.png",
      color: "from-pink-500 to-red-500",
    },
    {
      id: "toki",
      name: "Toki",
      image: "/images/toki.png",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "wat",
      name: "Wat",
      image: "/images/wat.png",
      color: "from-orange-400 to-yellow-500",
    },
    {
      id: "snurchins",
      name: "Snurchins",
      image: "/images/snurchins.jpeg",
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: "tubby-rainbow",
      name: "Tubby Rainbow",
      image: "/images/tubby-rainbow.png",
      color: "from-pink-400 to-purple-500",
    },
    {
      id: "duckess",
      name: "Duckess",
      image: "/images/duckess.png",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "ratsmile",
      name: "Ratsmile",
      image: "/images/ratsmile.png",
      color: "from-orange-500 to-pink-500",
    },
  ]

  // Loading progress simulation - daha yavaş
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 0.5 // Daha yavaş loading
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [])

  // Animation timeline - çok daha uzun süreler
  useEffect(() => {
    const timeline = [
      { time: 1000, action: () => setShowWelcome(true) },
      { time: 2500, action: () => setShowCharacters(true) },
      { time: 5000, action: () => setShowLogo(true) },
      { time: 7000, action: () => setShowFinalText(true) },
      { time: 10000, action: () => onComplete() }, // 10 saniye toplam
    ]

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time))

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        {/* Ana sitenin arka plan tasarımı - sade ve elegant */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(255, 0, 110, 0.08) 0%, transparent 70%),
              radial-gradient(circle at 75% 75%, rgba(131, 56, 236, 0.08) 0%, transparent 70%),
              radial-gradient(circle at 75% 25%, rgba(58, 134, 255, 0.08) 0%, transparent 70%),
              radial-gradient(circle at 25% 75%, rgba(6, 255, 165, 0.08) 0%, transparent 70%),
              radial-gradient(circle at 50% 50%, rgba(255, 190, 11, 0.05) 0%, transparent 80%),
              linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
            `,
          }}
        />

        {/* Çok subtle animasyonlu overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(255, 0, 110, 0.03) 0%, transparent 60%),
              radial-gradient(circle at 70% 60%, rgba(131, 56, 236, 0.03) 0%, transparent 60%)
            `,
          }}
          animate={{
            background: [
              `radial-gradient(circle at 30% 40%, rgba(255, 0, 110, 0.03) 0%, transparent 60%),
               radial-gradient(circle at 70% 60%, rgba(131, 56, 236, 0.03) 0%, transparent 60%)`,
              `radial-gradient(circle at 70% 30%, rgba(58, 134, 255, 0.03) 0%, transparent 60%),
               radial-gradient(circle at 30% 70%, rgba(6, 255, 165, 0.03) 0%, transparent 60%)`,
              `radial-gradient(circle at 50% 20%, rgba(255, 190, 11, 0.03) 0%, transparent 60%),
               radial-gradient(circle at 50% 80%, rgba(255, 0, 110, 0.03) 0%, transparent 60%)`,
              `radial-gradient(circle at 30% 40%, rgba(255, 0, 110, 0.03) 0%, transparent 60%),
               radial-gradient(circle at 70% 60%, rgba(131, 56, 236, 0.03) 0%, transparent 60%)`,
            ],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Çok subtle parçacıklar - ana sitedeki gibi */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-3000"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-4000"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-5000"></div>
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          {/* Welcome Text */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, scale: 0.5, y: -100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <motion.h1
                  className="text-7xl md:text-9xl font-marker font-bold mb-6"
                  style={{
                    color: "white",
                    textShadow: "0 0 30px rgba(255, 0, 110, 0.5), 0 0 60px rgba(131, 56, 236, 0.3)",
                  }}
                  animate={{
                    textShadow: [
                      "0 0 30px rgba(255, 0, 110, 0.5), 0 0 60px rgba(131, 56, 236, 0.3)",
                      "0 0 40px rgba(58, 134, 255, 0.6), 0 0 80px rgba(6, 255, 165, 0.4)",
                      "0 0 30px rgba(255, 0, 110, 0.5), 0 0 60px rgba(131, 56, 236, 0.3)",
                    ],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  Welcome
                </motion.h1>

                <motion.p
                  className="text-2xl md:text-3xl font-comic text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1.5 }}
                  style={{
                    textShadow: "0 0 20px rgba(255,255,255,0.3)",
                  }}
                >
                  to the Psychedelic Universe
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Characters Grid */}
          <AnimatePresence>
            {showCharacters && (
              <motion.div
                className="w-full max-w-6xl mx-auto mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {characters.map((character, index) => (
                    <motion.div
                      key={character.id}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 50, scale: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <motion.div
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/30 p-1 bg-gradient-to-br ${character.color}`}
                        animate={{
                          y: [0, -15, 0],
                          rotate: [0, index % 2 === 0 ? 5 : -5, 0],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.1,
                        }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-black/80">
                          <Image
                            src={character.image || "/placeholder.svg"}
                            alt={character.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>

                      <motion.span
                        className="text-gray-300 font-comic text-xs mt-2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        style={{
                          textShadow: "0 0 10px rgba(0,0,0,0.8)",
                        }}
                      >
                        {character.name}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 2,
                  type: "spring",
                  stiffness: 80,
                }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-2xl rounded-full"></div>
                  <Image
                    src="/images/cortex-vortex-logo-main.png"
                    alt="Cortex Vortex Logo"
                    width={400}
                    height={120}
                    className="h-20 md:h-28 w-auto relative z-10"
                    priority
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Text */}
          <AnimatePresence>
            {showFinalText && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                <motion.p
                  className="text-xl md:text-2xl font-comic text-gray-300 mb-4"
                  style={{
                    textShadow: "0 0 20px rgba(255, 0, 110, 0.3)",
                  }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  Enter the Vortex...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Bar */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-80 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Progress Bar */}
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mb-3 border border-white/30">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full"
                style={{ width: `${loadingProgress}%` }}
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(255, 0, 110, 0.3)",
                    "0 0 20px rgba(131, 56, 236, 0.5)",
                    "0 0 10px rgba(255, 0, 110, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </div>

            {/* Loading Text */}
            <motion.div
              className="text-gray-300 font-comic text-lg font-bold"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              style={{
                textShadow: "0 0 15px rgba(255, 0, 110, 0.3)",
              }}
            >
              Loading... {Math.round(loadingProgress)}%
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
