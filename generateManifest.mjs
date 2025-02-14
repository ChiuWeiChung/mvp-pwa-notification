// generateManifest.js
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

// Get current directory
const __dirname = fileURLToPath(new URL('.', import.meta.url));

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
      src: `${basePath}/nextjs.png`,
      sizes: '1920x1080',
      type: 'image/png',
      form_factor: 'wide',
    },
    {
      src: `${basePath}/geton.png`,
      sizes: '600x690',
      type: 'image/png',
      form_factor: 'narrow',
    },
  ],
  theme_color: '#ffffff',
  background_color: '#ffffff',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
};

// 將內容寫成 manifest.json 放入 public 資料夾中
writeFileSync(join(__dirname, 'public', 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Manifest generated successfully.');
