import { NextResponse } from "next/server"

export async function GET() {
  const manifest = {
    accountAssociation: {
      header:
        "eyJmaWQiOjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg0ODY5NGY5NzAyNzM5NzNjNzQ2NTc4NzQ2ZjZlNmM3OTIwNjk2ZTIwNzQ2ODY1MjA2ZTY1Nzg3NDIwNzY2NTcyNzM2OTZmNmUifQ",
      payload: "eyJkb21haW4iOiJjb3J0ZXh2b3J0ZXguYXJ0In0",
      signature: "MHhkNjI5YzU5YTZlZWFhZGNjM2NjNzUxYjU4NWRkYzI1ZGRjNGFlNTQ5ZDJlMjZkNzNhZGM1YjMwNjllMzI3MTJjMWI=",
    },
    appUrl: "https://cortexvortex.art",
    version: "1.0.0",
    name: "Cortex Vortex",
    iconUrl: "https://cortexvortex.art/images/cortex-vortex-logo-main.png",
    splashImageUrl: "https://cortexvortex.art/images/cortex-vortex-logo-main.png",
    splashBackgroundColor: "#000000",
    homeUrl: "https://cortexvortex.art",
    description:
      "Enter the psychedelic universe where imagination meets artificial intelligence. Transform any idea into a story featuring Matt Furie's iconic characters.",
    imageUrl: "https://cortexvortex.art/images/cortex-vortex-logo-main.png",
    buttonTitle: "Enter the Vortex",
    frameUrl: "https://cortexvortex.art",
  }

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
