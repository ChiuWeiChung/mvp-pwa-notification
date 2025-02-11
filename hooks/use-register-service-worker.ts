'use client';

import { useEffect } from 'react';
import { serviceWorkerPath } from '@/constants';

const useRegisterServiceWorker = () => {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if (!('serviceWorker' in navigator)) console.log('瀏覽器不支援 Service Worker');
      else {
        try {
          const registration = await navigator.serviceWorker.getRegistration(serviceWorkerPath);
          if (registration) console.log('Service Worker 已經註冊：', registration);
          else {
            const newRegistration = await navigator.serviceWorker.register(serviceWorkerPath);
            console.log('Service Worker 註冊成功：', newRegistration);
          }
        } catch (error) {
          console.error('Service Worker 註冊失敗：', error);
        }
      }
    };

    registerServiceWorker();
  }, []);
};

export default useRegisterServiceWorker;
