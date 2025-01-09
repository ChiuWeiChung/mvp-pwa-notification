import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public', // Output directory for service worker
  register: true, // Automatically register service worker
  skipWaiting: true, // Activate service worker immediately
  // scope: '/app',
  sw: 'service-worker.js',
  disable: false, // Disable in development mode
});

export default withPWA({
  reactStrictMode: false,

  // Your Next.js config
});
