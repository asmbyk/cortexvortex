import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("📥 Received video upload request")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("❌ No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("📁 File details:", {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type,
    })

    // Validate file type
    if (file.type !== "video/mp4") {
      console.error("❌ Invalid file type:", file.type)
      return NextResponse.json({ error: "Only MP4 files are allowed" }, { status: 400 })
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024 // 100MB in bytes
    if (file.size > maxSize) {
      console.error("❌ File too large:", file.size)
      return NextResponse.json({ error: "File size must be less than 100MB" }, { status: 400 })
    }

    console.log("☁️ Uploading to Vercel Blob...")

    // Upload to Vercel Blob
    const blob = await put("psychedelic-background.mp4", file, {
      access: "public",
      contentType: "video/mp4",
    })

    console.log("✅ Upload successful:", blob.url)

    return NextResponse.json({
      success: true,
      url: blob.url,
      size: file.size,
      filename: file.name,
      uploadedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Upload error:", error)

    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
