import { writeFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

config();

// Get command line arguments
const args = process.argv.slice(2);
const outputDir = args[0];

// basePath 環境變數

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// 定義 manifest 内容
const manifest = {
  id: 'pwa-example',
  name: 'JG CodeBase',
  short_name: 'JG',
  icons: [
    {
      src: `${basePath}/icons/icon-96x96.png`,
      sizes: '96x96',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `${basePath}/icons/icon-120x120.png`,
      sizes: '120x120',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `${basePath}/icons/icon-152x152.png`,
      sizes: '152x152',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `${basePath}/icons/icon-180x180.png`,
      sizes: '180x180',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `${basePath}/icons/icon-192x192.png`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `${basePath}/icons/icon-512x512.png`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
  screenshots: [
    {
      src: `${basePath}/screenshot-1.png`,
      sizes: '1920x1080',
      type: 'image/png',
      form_factor: 'wide',
    },
    {
      src: `${basePath}/screenshot-2.png`,
      sizes: '600x690',
      type: 'image/png',
      form_factor: 'narrow',
    },
  ],
  theme_color: '#ffffff',
  background_color: '#ffffff',
  start_url: `${basePath ?? '/'}`,
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
};

function generateManifest(outputDir) {
  // Write manifest.json to the output directory
  writeFileSync(join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Manifest generated successfully.');
}

// Call the function with command line arguments
generateManifest(outputDir);
