import PermissionStatus from '@/enums/permission-status';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * 定義從 Service Worker 傳遞過來訊息的資料結構
 */
interface ServiceWorkerMessage {
  message: string;
  body: string;
  dest?: string;
}

/**
 * 當通知權限為 Granted 時，監聽來自 Service Worker 的訊息
 *
 * @param permissionStatus - 當前的通知權限狀態
 */
const useNotificationListener = (permissionStatus: NotificationPermission) => {
  const router = useRouter();
  useEffect(() => {
    // 只有在通知權限為 Granted 時才建立事件監聽器
    if (permissionStatus !== PermissionStatus.Granted) return;

    const handleServiceWorkerMessage = (event: MessageEvent<ServiceWorkerMessage>) => {
      const { message, body, dest } = event.data;
      const action = dest ? { label: '詳細', onClick: () => router.push(dest) } : undefined;
      toast(message, { description: body, action });
    };

    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

    // 清除事件監聽器
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
    };
  }, [permissionStatus, router]);
};

export default useNotificationListener;
