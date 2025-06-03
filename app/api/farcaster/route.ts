import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Return the frame HTML for Farcaster
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
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #000; color: #fff; font-family: Arial, sans-serif;">
          <img src="https://cortexvortex.art/images/cortex-vortex-logo-main.png" alt="Cortex Vortex" style="max-width: 300px; margin-bottom: 20px;">
          <h1>Cortex Vortex</h1>
          <p>Enter the psychedelic universe where imagination meets artificial intelligence</p>
          <a href="https://cortexvortex.art" style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px;">Enter the Vortex</a>
        </div>
      </body>
    </html>
  `

  return new NextResponse(frameHtml, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=300",
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Handle Farcaster frame interactions
    const { untrustedData, trustedData } = body

    // For Mini Apps, we typically redirect to the main app
    return NextResponse.json({
      type: "frame",
      frameUrl: "https://cortexvortex.art",
    })
  } catch (error) {
    console.error("Farcaster frame error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
