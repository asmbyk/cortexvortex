import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Güvenli bir şekilde RPC URL'lerini oluştur
    const rpcConfig = {
      baseRpcUrl: getRpcUrl(),
      chainId: 8453, // Base chain ID
      provider: getProviderName(),
    }

    return NextResponse.json(rpcConfig, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // 5 dakika cache
      },
    })
  } catch (error) {
    console.error("Error creating RPC config:", error)

    // Fallback config
    return NextResponse.json({
      baseRpcUrl: "https://mainnet.base.org",
      chainId: 8453,
      provider: "Public RPC",
    })
  }
}

// Server-side'da güvenli bir şekilde RPC URL oluştur
function getRpcUrl(): string {
  // Server-side environment variables - client'a gönderilmez
  if (process.env.COINBASE_CLOUD_API_KEY) {
    return `https://api.developer.coinbase.com/rpc/v1/base/${process.env.COINBASE_CLOUD_API_KEY}`
  }

  if (process.env.ALCHEMY_API_KEY) {
    return `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  }

  // Fallback to public RPC
  return "https://mainnet.base.org"
}

// Provider adını belirle
function getProviderName(): string {
  if (process.env.COINBASE_CLOUD_API_KEY) {
    return "Coinbase Cloud"
  }

  if (process.env.ALCHEMY_API_KEY) {
    return "Alchemy"
  }

  return "Public RPC"
}
