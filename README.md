# PWA 推播通知 DEMO

這個專案是一個 Progressive Web App (PWA) 範例，主要功能包括推播通知和 PWA 安裝。以下是專案的簡單介紹：

## 專案目標
該專案主要在展示如何使用 Next.js 和相關技術來實現 PWA 的功能，特別是推播通知的實現。

## 功能概述
- **推播通知**：用戶可以訂閱推播通知，並在收到通知時顯示在設備上。
- **PWA 安裝**：用戶可以將應用安裝到桌面，提供類似原生應用的體驗。
- **通知管理**：用戶可以開啟或關閉通知訂閱，並查看通知內容。

## 技術棧
- **Next.js**：用於構建 React 應用的框架。
- **Web Push**：用於推播通知的服務。
- **Service Worker**：用於處理推播通知和離線功能。
- **Tailwind CSS**：用於設計和樣式的工具。

## 主要文件和結構
- **README.md**：提供了如何生成 VAPID keys 和設置環境變數的指南。
- **generateManifest.mjs** 和 **generateResizedImages.mjs**：用於生成 PWA 所需的 manifest 和圖標。
- **components/**：包含各種 UI 元件，如通知開關、安裝按鈕等。
- **hooks/**：包含自定義的 React hooks，用於註冊 Service Worker 和監聽通知。
- **worker/index.js**：Service Worker 的實現，用於處理推播通知。

## 環境設定

### 1. 產生 VAPID Keys

首先需要產生推播通知所需的 VAPID (Voluntary Application Server Identification) keys：

```bash
npx web-push generate-vapid-keys
```

### 2. 設置環境變數

將生成的 VAPID keys 設置到環境變數中：

```bash
# .env
# 設置 vapid public key
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BBmjtePily0Ij9mYW6F-xfwtC1LwyNZ5HGbsPrTTGUMyci973JQy6ly8L8iPvrMb360eKNWdk6F6gOyWOx6F8pg
# 設置 vapid private key
VAPID_PRIVATE_KEY=5qN7FUqNd7_3CSR1xreutDXMKJL5fvbil-ggpx-MtHg
# 設置 base path
NEXT_PUBLIC_BASE_PATH=/jg-push-notification
```

### 3. 產生 manifest.json 以及所需圖片

```bash
./generate_assets.sh ./example.png ./public
```

該指令會產生 manifest.json 以及所需圖片，並放置於 public 資料夾下

### 4. 安裝並執行專案

```bash
npm install
npm run dev
```

## 與推播通知功能相關的資料夾結構

```plaintext    

├── actions
│   └── notification.ts // 發送推播通知的 server action
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── somewhere
├── components
│   ├── notification-sender.tsx // 發送推播通知的元件
│   ├── notification-toggle.tsx // 切換推播通知的元件
│   ├── pwa-install-button.tsx // 安裝 PWA 的元件
│   ├── read-notification.tsx // 閱讀推播通知的元件
│   └── ui // 推播通知的 UI 元件
├── constants
│   └── index.ts // 存放 service-worker.js 的路徑變數
├── enums
│   └── permission-status.ts // 存放推播通知的狀態
├── example.png // 推播通知的範例圖片
├── generateManifest.mjs // 產生 manifest.json 的指令 (透過 generate_assets.sh 呼叫)
├── generateResizedImages.mjs // 產生不同尺寸的圖片 (透過 generate_assets.sh 呼叫)
├── generate_assets.sh // 腳本，用來產生圖片和 manifest.json
├── hooks
│   ├── use-notification-listener.ts // 監聽推播通知的 hook
│   └── use-register-service-worker.ts // 註冊 Service Worker 的 hook
├── lib
│   └── utils.ts // 存放常用的工具函式
├── next.config.ts // 設定 next.config.ts (包含 next-pwa 的設定)
├── public
│   ├── apple-touch-icon-precomposed.png // 蘋果的圖示
│   ├── apple-touch-icon.png // 蘋果的圖示
│   ├── geton.png // 推播通知的範例圖片
│   ├── icons // 存放不同尺寸的圖片
│   ├── manifest.json // 存放 manifest.json 的內容
│   ├── nextjs.png // 推播通知的範例圖片
└── worker
    └── index.js // Service Worker 檔案，處理推播通知的接收、顯示，以及點擊通知後的行為
```


## 參考文件

- [如何註冊 service worker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)
- [Web Push GitHub](https://github.com/web-push-libs/web-push)
- [更新 PWA 圖示的徽章](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Display_badge_on_app_icon#update_badges_in_real-time)

