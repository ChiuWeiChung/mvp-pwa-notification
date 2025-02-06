'use client';
import React, { useEffect } from 'react';

const Pwa = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async function () {
        navigator.serviceWorker
          .getRegistration()
          .then((registration) => {
            if (registration) {
              console.log('Service Worker 已經註冊：', registration);
            } else {
              console.log('Service Worker 尚未註冊');
              navigator.serviceWorker.register('/service-worker.js');
            }
          })
          .catch((error) => {
            console.error('無法檢查 Service Worker 註冊狀態：', error);
          });
      });
    } else {
      console.log('瀏覽器不支援 Service Worker');
    }
  }, []);
  return <></>;
};

export default Pwa;
