// This script helps with Farcaster domain verification
// Run with: node scripts/verify-farcaster.js

const crypto = require("crypto")
const fs = require("fs")
const path = require("path")

// Replace these with your actual Farcaster details
const FID = process.env.FARCASTER_FID || "1234"
const USERNAME = process.env.FARCASTER_USERNAME || "cortexvortex"
const CUSTODY_ADDRESS = process.env.FARCASTER_CUSTODY_ADDRESS || "0x1234567890abcdef1234567890abcdef12345678"

// Generate a random verification token
const generateToken = () => {
  return crypto.randomBytes(32).toString("hex")
}

// Create the manifest file
const createManifest = () => {
  const manifestPath = path.join(__dirname, "../public/.well-known")
  const manifestFile = path.join(manifestPath, "farcaster.json")

  // Create directory if it doesn't exist
  if (!fs.existsSync(manifestPath)) {
    fs.mkdirSync(manifestPath, { recursive: true })
  }

  const manifest = {
    name: "Cortex Vortex",
    description: "Generate psychedelic stories in the style of Matt Furie's universe",
    icons: [
      {
        src: "https://cortexvortex.art/images/cortex-vortex-logo-main.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    image: "https://cortexvortex.art/images/cortex-vortex-logo-main.png",
    app: {
      id: "cortex-vortex",
      url: "https://cortexvortex.art",
      entrypoints: [
        {
          type: "url",
          url: "https://cortexvortex.art",
        },
      ],
      capabilities: {
        frames: true,
        notifications: true,
        storage: true,
      },
    },
    accountAssociation: {
      fid: FID,
      username: USERNAME,
      custody_address: CUSTODY_ADDRESS,
      verification_method: "farcaster",
    },
    version: "vNext",
  }

  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2))
  console.log(`Manifest file created at: ${manifestFile}`)
  console.log("")
  console.log("Next steps:")
  console.log("1. Deploy your site with this manifest file")
  console.log("2. Verify your domain in the Farcaster client")
  console.log("3. Test your Mini App by visiting your domain in a Farcaster client")
  console.log("")
  console.log("Manifest content:")
  console.log(JSON.stringify(manifest, null, 2))
}

// Run the script
createManifest()
