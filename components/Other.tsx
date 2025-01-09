'use client';
import React, { useEffect } from 'react';

const Other = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistration()
        .then((registration) => {
          if (registration) {
            console.log('Service Worker 已經註冊：', registration);
          } else {
            navigator.serviceWorker.register('/service-worker.js')
            console.log('Service Worker 尚未註冊');
          }
        })
        .catch((error) => {
          console.error('無法檢查 Service Worker 註冊狀態：', error);
        });
    } else {
      console.log('瀏覽器不支援 Service Worker');
    }
  }, []);
  return <div>Other</div>;
};

export default Other;
