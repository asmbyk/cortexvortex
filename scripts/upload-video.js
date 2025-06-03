// Bu script'i çalıştırmak için: node scripts/upload-video.js
const { put } = require("@vercel/blob")
const fs = require("fs")
const path = require("path")

async function uploadVideo() {
  try {
    console.log("🎬 Starting video upload to Vercel Blob...")

    const videoPath = path.join(process.cwd(), "public", "videos", "psychedelic-background.mp4")

    // Video dosyasının varlığını kontrol et
    if (!fs.existsSync(videoPath)) {
      console.error("❌ Video file not found at:", videoPath)
      console.log("📁 Available files in public/videos:")
      const videosDir = path.join(process.cwd(), "public", "videos")
      if (fs.existsSync(videosDir)) {
        const files = fs.readdirSync(videosDir)
        files.forEach((file) => console.log(`   - ${file}`))
      } else {
        console.log("   Directory does not exist")
      }
      return
    }

    // Dosya boyutunu kontrol et
    const stats = fs.statSync(videoPath)
    const fileSizeInMB = stats.size / (1024 * 1024)
    console.log(`📊 Video file size: ${fileSizeInMB.toFixed(2)} MB`)

    if (fileSizeInMB > 100) {
      console.warn("⚠️  Warning: File is larger than 100MB, upload might be slow")
    }

    // Video dosyasını oku
    const videoBuffer = fs.readFileSync(videoPath)

    console.log("☁️  Uploading to Vercel Blob...")

    // Vercel Blob'a yükle
    const blob = await put("psychedelic-background.mp4", videoBuffer, {
      access: "public",
      contentType: "video/mp4",
    })

    console.log("✅ Upload successful!")
    console.log("🔗 Blob URL:", blob.url)
    console.log("")
    console.log("📝 Next steps:")
    console.log("1. Add this to your .env.local file:")
    console.log(`   NEXT_PUBLIC_VIDEO_URL=${blob.url}`)
    console.log("")
    console.log("2. Add this to your Vercel environment variables:")
    console.log(`   NEXT_PUBLIC_VIDEO_URL=${blob.url}`)
    console.log("")
    console.log("3. Redeploy your application")
  } catch (error) {
    console.error("❌ Upload failed:", error)

    if (error.message.includes("BLOB_READ_WRITE_TOKEN")) {
      console.log("")
      console.log("🔑 Missing Vercel Blob token. Please:")
      console.log("1. Go to your Vercel dashboard")
      console.log("2. Navigate to Storage > Blob")
      console.log("3. Create a new store if you haven't already")
      console.log("4. Copy the BLOB_READ_WRITE_TOKEN")
      console.log("5. Add it to your .env.local file:")
      console.log("   BLOB_READ_WRITE_TOKEN=your_token_here")
    }
  }
}

uploadVideo()
