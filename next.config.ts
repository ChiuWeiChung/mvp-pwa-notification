import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public', // Output directory for service worker
  register: true, // Automatically register service worker
  skipWaiting: true, // Activate service worker immediately
  clientsClaim: true, // Claim clients immediately
  sw: 'service-worker.js',
  disable: false, // Disable in development mode
});

export default withPWA({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: false,

  // Your Next.js config
});
