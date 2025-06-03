import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  try {
    const videoPath = path.join(process.cwd(), "public", "videos", "psychedelic-background.mp4")

    try {
      const stats = await fs.stat(videoPath)

      return NextResponse.json({
        exists: true,
        size: stats.size,
        sizeFormatted: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
        lastModified: stats.mtime,
        path: "/videos/psychedelic-background.mp4",
        absolutePath: videoPath,
        isFile: stats.isFile(),
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      })
    } catch (fileError) {
      return NextResponse.json({
        exists: false,
        error: `File not found: ${fileError instanceof Error ? fileError.message : "Unknown error"}`,
        path: "/videos/psychedelic-background.mp4",
        absolutePath: videoPath,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    return NextResponse.json(
      {
        exists: false,
        error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}`,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
