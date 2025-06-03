import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get("action")

  // Basic frame response
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="https://cortexvortex.art/images/cortex-vortex-logo-main.png">
        <meta property="fc:frame:button:1" content="Enter the Vortex">
        <meta property="fc:frame:button:1:action" content="link">
        <meta property="fc:frame:button:1:target" content="https://cortexvortex.art">
        <meta property="og:title" content="Cortex Vortex - AI-Powered Psychedelic Stories">
        <meta property="og:description" content="Enter the psychedelic universe where imagination meets artificial intelligence">
        <meta property="og:image" content="https://cortexvortex.art/images/cortex-vortex-logo-main.png">
        <title>Cortex Vortex</title>
      </head>
      <body>
        <h1>Cortex Vortex</h1>
        <p>Enter the psychedelic universe where imagination meets artificial intelligence</p>
        <a href="https://cortexvortex.art">Enter the Vortex</a>
      </body>
    </html>
  `

  return new NextResponse(frameHtml, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Handle Farcaster frame interactions
    const { untrustedData, trustedData } = body

    // For now, just redirect to the main app
    return NextResponse.json({
      type: "frame",
      frameUrl: "https://cortexvortex.art",
    })
  } catch (error) {
    console.error("Farcaster frame error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
