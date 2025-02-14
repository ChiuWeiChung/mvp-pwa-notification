import sharp from 'sharp';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

// Get command line arguments
const args = process.argv.slice(2);
const inputImagePath = args[0];
const outputDir = args[1];

// Ensure the output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const sizes = [
  { width: 96, height: 96 },
  { width: 120, height: 120 },
  { width: 152, height: 152 },
  { width: 180, height: 180 },
  { width: 192, height: 192 },
  { width: 512, height: 512 },
];

function generateResizedImages(inputImagePath, outputDir, sizes) {
  sizes.forEach((size) => {
    const outputFilePath = join(`${outputDir}/icons`, `icon-${size.width}x${size.height}.png`);

    sharp(inputImagePath)
      .resize(size.width, size.height)
      .toFile(outputFilePath, (err) => {
        if (err) {
          console.error(`Error resizing image to ${size.width}x${size.height}:`, err);
        } else {
          console.log(`Image resized to ${size.width}x${size.height} and saved to ${outputFilePath}`);
        }
      });
  });
}

// Call the function with command line arguments
generateResizedImages(inputImagePath, outputDir, sizes);
