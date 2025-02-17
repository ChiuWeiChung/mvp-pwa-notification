'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { urlB64ToUint8Array } from '@/lib/utils';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { LoadingSpinner } from './ui/spinner';
import useNotificationListener from '@/hooks/use-notification-listener';
import PermissionStatus from '@/enums/permission-status';
import useRegisterServiceWorker from '@/hooks/use-register-service-worker';
import { Button } from './ui/button';
import { basePath } from '@/constants';

/** 推播通知元件 */
const NotificationToggle = () => {
  useRegisterServiceWorker();
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(PermissionStatus.Default);
  const [subscriptionEndpoint, setSubscriptionEndpoint] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  useNotificationListener(permissionStatus);

  /** 取得目前的通知權限，並確認該裝置是否已經訂閱 */
  const getNotificationPermission = async (): Promise<void> => {
    let status = PermissionStatus.Default;
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      status = PermissionStatus.Denied;
    } else {
      const registration = await navigator.serviceWorker.getRegistration(`${basePath}/service-worker.js`);
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        status = PermissionStatus.Granted;
        setSubscriptionEndpoint(JSON.stringify(subscription));
      } else {
        status = PermissionStatus.Default;
      }
    }
    setPermissionStatus(status);
  };

  /** 當使用者按下按鈕時，請求通知權限 */
  const requestNotificationPermission = async (): Promise<void> => {
    const newPermission = await Notification.requestPermission();
    setPermissionStatus(newPermission);
    if (newPermission === PermissionStatus.Granted) await subscribeUser();
    else toast.info('請至系統中將 APP 通知開啟');
  };

  /** 註冊 Service Worker 並訂閱推播通知 */
  const subscribeUser = async (): Promise<void> => {
    if (!('serviceWorker' in navigator)) {
      toast.error('Service workers are not supported in this browser');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration(`${basePath}/service-worker.js`);
      if (registration) await subscribePush(registration);
      // if (!registration) {
      //   await navigator.serviceWorker.register(`${basePath}/service-worker.js`);
      //   registration = await navigator.serviceWorker.ready;
      // }
    } catch (err) {
      console.error('Error during service worker registration or subscription:', err);
      toast.error('Error during service worker registration or subscription.');
    }
  };

  /**
   * 利用取得的 Service Worker 註冊資訊進行推播訂閱
   */
  const subscribePush = async (registration: ServiceWorkerRegistration): Promise<void> => {
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      console.error('VAPID public key is not defined');
      toast.error('VAPID public key is not defined');
      return;
    }

    const applicationServerKey = urlB64ToUint8Array(vapidPublicKey);
    const options: PushSubscriptionOptionsInit = {
      applicationServerKey,
      userVisibleOnly: true, // 確保通知一定對使用者可見
    };

    const subscription = await registration.pushManager.subscribe(options);
    const subscriptionJson = JSON.stringify(subscription);
    // TODO 串接 儲存訂閱 API (將 subscriptionJSON 存入 DB)
    setSubscriptionEndpoint(subscriptionJson);
  };

  /**
   * 模擬取消通知的功能（若需要取消 push 訂閱，可以在此處加入取消邏輯）
   */
  const unsubscribeUser = async (): Promise<void> => {
    // 檢查瀏覽器是否支援 Service Worker
    if (!('serviceWorker' in navigator)) {
      toast.error('此瀏覽器不支援 Service Worker');
      return;
    }

    try {
      // 取得已註冊的 Service Worker
      const registration = await navigator.serviceWorker.getRegistration(`${basePath}/service-worker.js`);
      if (!registration) {
        console.error('找不到 Service Worker 註冊');
        return;
      }

      // 取得現有的 push 訂閱
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        console.log('目前沒有 push 訂閱');
        setPermissionStatus(PermissionStatus.Default);
        return;
      }

      // 呼叫 unsubscribe() 取消訂閱
      const successful = await subscription.unsubscribe();
      if (successful) {
        // TODO 串接 取消訂閱 API (在 DB 移除對應的 endpoint)
        setPermissionStatus(PermissionStatus.Default);
        setSubscriptionEndpoint('');
        toast.info('已取消訂閱');
      } else toast.error('取消訂閱失敗');
    } catch (err) {
      console.error(err);
      toast.error('取消訂閱過程中發生錯誤');
    }
  };

  const onCheckedChange = async (checked: boolean): Promise<void> => {
    setShowLoader(true);
    if (checked) await requestNotificationPermission();
    else await unsubscribeUser();
    setShowLoader(false);
  };

  /** 先確認當前的通知權限&訂閱狀態 */
  useEffect(() => {
    getNotificationPermission();
  }, []);

  return (
    <div className="flex flex-col gap-6 bg-gray-100 p-4 rounded-md border border-gray-300">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" checked={permissionStatus === PermissionStatus.Granted} onCheckedChange={onCheckedChange} disabled={showLoader} />
        <Label htmlFor="airplane-mode">訂閱通知</Label>
        {showLoader && <LoadingSpinner />}
      </div>
      {/* add an copy button when subscriptionEndpoint is not empty */}
      {subscriptionEndpoint && (
        <>
          <div className="max-h-[200px] max-w-full overflow-y-auto overflow-x-auto">
            <code className="whitespace-pre-wrap break-all">{subscriptionEndpoint}</code>
          </div>
          {/* toast the success information when the copy button is clicked */}
          <Button
            onClick={() => {
              navigator.clipboard.writeText(subscriptionEndpoint);
              toast.success('已複製到剪貼簿');
            }}
          >
            複製「推播 endpoint」
          </Button>
        </>
      )}
    </div>
  );
};

export default NotificationToggle;
