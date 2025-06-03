import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Palette, Zap, Globe, Code, Heart, Sparkles, Rocket } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Advanced AI Technology",
      description: "Powered by cutting-edge language models trained on Matt Furie's distinctive storytelling style",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Authentic Art Style",
      description: "Stories that capture the essence of Furie's psychedelic, absurd, and emotional universe",
      color: "from-pink-500 to-purple-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Generation",
      description: "Transform any prompt into a fully-formed story in seconds with our optimized AI engine",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web3 Ready",
      description: "Future NFT minting capabilities on Base network for true ownership of your stories",
      color: "from-green-400 to-emerald-500",
    },
  ]

  const techStack = [
    { name: "Next.js 15", description: "React framework for production", color: "bg-black" },
    { name: "OpenAI GPT-4", description: "Advanced language model", color: "bg-green-600" },
    { name: "Vercel", description: "Deployment and hosting", color: "bg-black" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework", color: "bg-blue-500" },
    { name: "TypeScript", description: "Type-safe JavaScript", color: "bg-blue-600" },
    { name: "Base Network", description: "Ethereum L2 for NFTs", color: "bg-blue-400" },
  ]

  const faqs = [
    {
      question: "Is this an official Matt Furie project?",
      answer:
        "This is a fan-made tribute to Matt Furie's work. While we strive to capture the essence of his art and characters, this is not an official project affiliated with Matt Furie.",
    },
    {
      question: "How does the AI story generator work?",
      answer:
        "Our AI models have been trained on Matt Furie's characters, their personalities, and storytelling style. When you enter a prompt, the AI creates a unique story featuring characters from the Furie universe.",
    },
    {
      question: "Can I own the stories I generate?",
      answer:
        "When NFT minting becomes available, you'll own that specific instance of the story. However, the characters and universe elements remain the intellectual property of Matt Furie.",
    },
    {
      question: "What blockchain technology do you use?",
      answer:
        "We use the Base network for our upcoming NFT functionality. Base is an Ethereum L2 solution that offers lower gas fees and faster transactions while maintaining security.",
    },
  ]

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 left-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-64 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white border-none text-lg font-comic">
            <Heart className="mr-2 h-4 w-4" />
            About Our Universe
          </Badge>

          <h1 className="text-6xl md:text-7xl font-marker font-bold mb-6 glow-text-rainbow">
            The Story
            <br />
            <span className="glow-text-neon">Behind the Vortex</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-comic">
            Discover how we're using <span className="glow-text-pink font-bold">cutting-edge AI</span> to celebrate and
            expand Matt Furie's <span className="glow-text-blue font-bold">psychedelic universe</span>
          </p>
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="cosmic-card p-8">
            <h2 className="text-3xl md:text-4xl font-marker font-bold mb-6 glow-text-pink">Our Vision</h2>
            <div className="space-y-6 text-lg font-comic text-gray-300">
              <p>
                Cortex Vortex is a digital playground where fans can create and explore stories set in the psychedelic
                universe of Matt Furie's characters.
              </p>
              <p>
                Our goal is to celebrate and expand upon the unique artistic style and storytelling of Matt Furie,
                creator of Boy's Club, The Night Riders, and Mindviscosity, by allowing users to generate their own
                narratives featuring his iconic characters.
              </p>
              <p>
                We've combined cutting-edge AI technology with Furie's distinctive visual aesthetic to create a platform
                that captures the absurd, emotional, and chaotic nature of his work while offering new ways to engage
                with it.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="cosmic-card overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Matt Furie Art Style"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-marker font-bold mb-4 glow-text-blue">How It Works</h2>
            <p className="text-lg text-gray-400 font-comic">The technology powering your psychedelic adventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="cosmic-card p-8 group">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-marker font-bold mb-4 glow-text-blue">{feature.title}</h3>
                <p className="text-gray-400 font-comic">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-marker font-bold mb-4 glow-text-green">Technology Stack</h2>
            <p className="text-lg text-gray-400 font-comic">Built with modern, cutting-edge technologies</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="cosmic-card p-6 text-center group">
                <div
                  className={`w-12 h-12 ${tech.color} rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-marker text-lg font-bold mb-2 glow-text-blue">{tech.name}</h3>
                <p className="text-gray-400 font-comic text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-marker font-bold mb-4 glow-text-purple">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400 font-comic">Everything you need to know about Cortex Vortex</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="cosmic-card p-8">
                <h3 className="text-xl font-marker font-bold mb-4 glow-text-pink">{faq.question}</h3>
                <p className="text-gray-300 font-comic leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="cosmic-card p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-marker font-bold mb-6 glow-text-neon">Ready to Create?</h2>
            <p className="text-lg text-gray-300 mb-8 font-comic">
              Jump into the psychedelic world of Matt Furie and start generating your own absurd, emotional, and chaotic
              stories!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <Button className="cosmic-button text-lg px-8 py-4">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Your First Story
                </Button>
              </Link>
              <Link href="/characters">
                <Button
                  variant="outline"
                  className="border-2 border-white/20 hover:border-purple-500/50 bg-white/5 hover:bg-white/10 text-white text-lg px-8 py-4 font-comic"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Meet the Characters
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
