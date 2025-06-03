"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function UploadVideoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "video/mp4") {
        toast({
          title: "Invalid file type",
          description: "Please select an MP4 video file.",
          variant: "destructive",
        })
        return
      }

      const fileSizeInMB = selectedFile.size / (1024 * 1024)
      if (fileSizeInMB > 100) {
        toast({
          title: "File too large",
          description: `File size is ${fileSizeInMB.toFixed(2)}MB. Maximum allowed is 100MB.`,
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      console.log("📁 File selected:", {
        name: selectedFile.name,
        size: `${fileSizeInMB.toFixed(2)} MB`,
        type: selectedFile.type,
      })
    }
  }

  const uploadVideo = async () => {
    if (!file) return

    setUploading(true)
    setUploadResult(null)

    try {
      console.log("🚀 Starting upload to Vercel Blob...")

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      setUploadResult(result)

      console.log("✅ Upload successful:", result)

      toast({
        title: "Upload successful!",
        description: "Video has been uploaded to Vercel Blob.",
      })
    } catch (error) {
      console.error("❌ Upload failed:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="font-marker text-4xl font-bold mb-8 text-center glow-text-pink">Upload Video to Vercel Blob</h1>

      <Card className="bg-card/80 backdrop-blur-sm border-none">
        <CardHeader>
          <CardTitle className="font-marker text-2xl text-primary">Video Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="video-file" className="block text-sm font-medium mb-2">
              Select MP4 Video File (Max 100MB)
            </label>
            <Input
              id="video-file"
              type="file"
              accept="video/mp4"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>

          {file && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Selected File:</h3>
              <div className="text-sm space-y-1">
                <div>Name: {file.name}</div>
                <div>Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                <div>Type: {file.type}</div>
              </div>
            </div>
          )}

          <Button onClick={uploadVideo} disabled={!file || uploading} className="w-full">
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload to Vercel Blob
              </>
            )}
          </Button>

          {uploadResult && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-green-400">Upload Successful!</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <strong>Blob URL:</strong>
                  <div className="bg-muted p-2 rounded mt-1 break-all font-mono text-xs">{uploadResult.url}</div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-3 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <strong className="text-yellow-400">Next Steps:</strong>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Copy the Blob URL above</li>
                    <li>Go to your Vercel project settings</li>
                    <li>Add environment variable: NEXT_PUBLIC_VIDEO_URL</li>
                    <li>Set the value to the Blob URL</li>
                    <li>Redeploy your application</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
