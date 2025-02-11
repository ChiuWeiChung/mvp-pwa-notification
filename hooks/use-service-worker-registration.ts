'use client';

import { useEffect } from 'react';

const useServiceWorkerRegistration = () => {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if (!('serviceWorker' in navigator)) {
        console.log('瀏覽器不支援 Service Worker');
        return;
      }

      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          console.log('Service Worker 已經註冊：', registration);
        } else {
          const newRegistration = await navigator.serviceWorker.register('/service-worker.js');
          console.log('Service Worker 註冊成功：', newRegistration);
        }
      } catch (error) {
        console.error('Service Worker 註冊失敗：', error);
      }
    };

    // 直接調用 registerServiceWorker
    registerServiceWorker();

    // 不需要清理函數，因為我們沒有添加事件監聽器
  }, []);
};

export default useServiceWorkerRegistration;
