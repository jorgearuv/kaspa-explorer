const sharp = require('sharp')
const fs = require('fs').promises
const path = require('path')
const ico = require('to-ico')

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

async function generateFavicons() {
  try {
    const inputSvg = path.join(__dirname, '../public/kaspa-logo.svg')
    const outputDir = path.join(__dirname, '../public')

    // Ensure output directory exists
    await ensureDirectoryExists(outputDir)

    // Verify input file exists
    try {
      await fs.access(inputSvg)
    } catch {
      console.error('Error: kaspa-logo.svg not found in public directory')
      console.log('Creating default logo...')
      // Create default logo if not exists
      await fs.writeFile(
        inputSvg,
        `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="256" fill="#4F46E5"/>
  <path d="M384 256C384 326.692 326.692 384 256 384C185.308 384 128 326.692 128 256C128 185.308 185.308 128 256 128C326.692 128 384 185.308 384 256ZM170.667 256C170.667 303.069 208.931 341.333 256 341.333C303.069 341.333 341.333 303.069 341.333 256C341.333 208.931 303.069 170.667 256 170.667C208.931 170.667 170.667 208.931 170.667 256Z" fill="white"/>
  <path d="M256 298.667C279.455 298.667 298.667 279.455 298.667 256C298.667 232.545 279.455 213.333 256 213.333C232.545 213.333 213.333 232.545 213.333 256C213.333 279.455 232.545 298.667 256 298.667Z" fill="white"/>
</svg>`,
      )
    }

    // Read the SVG file
    const svgBuffer = await fs.readFile(inputSvg)

    // Generate PNG favicons
    const sizes = {
      16: 'favicon-16x16.png',
      32: 'favicon-32x32.png',
      180: 'apple-touch-icon.png',
      192: 'android-chrome-192x192.png',
      512: 'android-chrome-512x512.png',
    }

    // Generate each size
    const pngBuffers = {}
    for (const [size, filename] of Object.entries(sizes)) {
      try {
        const buffer = await sharp(svgBuffer)
          .resize(parseInt(size), parseInt(size))
          .png()
          .toBuffer()

        // Save the file
        await fs.writeFile(path.join(outputDir, filename), buffer)
        console.log(`✓ Generated ${filename}`)

        // Store buffers for ICO generation
        if (size === '16' || size === '32') {
          pngBuffers[size] = buffer
        }
      } catch (error) {
        console.error(`✗ Error generating ${filename}:`, error.message)
      }
    }

    // Generate ICO file using to-ico
    try {
      const icoBuffer = await ico([pngBuffers['16'], pngBuffers['32']])
      await fs.writeFile(path.join(outputDir, 'favicon.ico'), icoBuffer)
      console.log('✓ Generated favicon.ico')
    } catch (error) {
      console.error('✗ Error generating favicon.ico:', error.message)
    }

    // Generate OG Image
    try {
      await sharp(svgBuffer)
        .resize(1200, 630, { fit: 'contain', background: '#4F46E5' })
        .composite([
          {
            input: Buffer.from(
              `<svg width="1200" height="630">
                <text
                  x="50%"
                  y="85%"
                  font-family="Arial"
                  font-size="72"
                  fill="white"
                  text-anchor="middle"
                >
                  Kaspa Token Explorer
                </text>
              </svg>`,
            ),
          },
        ])
        .png()
        .toFile(path.join(outputDir, 'og-image.png'))
      console.log('✓ Generated og-image.png')
    } catch (error) {
      console.error('✗ Error generating og-image.png:', error.message)
    }

    console.log('\n✨ Favicon generation complete!')
  } catch (error) {
    console.error('\n❌ Fatal error during favicon generation:', error.message)
    // Exit with error code to indicate failure
    process.exit(1)
  }
}

// Run the script
console.log('🎨 Generating favicons...\n')
generateFavicons().catch(error => {
  console.error('\n❌ Unhandled error:', error)
  process.exit(1)
})
