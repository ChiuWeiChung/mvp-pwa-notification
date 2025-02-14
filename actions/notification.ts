'use server';
// import { createSupabaseServer } from '@/lib/supabase/server';
import webpush from 'web-push';

export const sendNotification = async (message: string, name: string, endpoint: string) => {
  const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    privateKey: process.env.VAPID_PRIVATE_KEY!,
  };
  //setting our previously generated VAPID keys
  webpush.setVapidDetails('mailto:rick@jgallop.com', vapidKeys.publicKey, vapidKeys.privateKey);

  //  TODO 串接 取得被推播 user 的 API
  // 這邊的 data.notification_json 是指想要推送推播通知的目的地 (使用者)
  const data = { notification_json: endpoint, endpoint };
  if (data) {
    try {
      await webpush.sendNotification(
        JSON.parse(data.notification_json),
        JSON.stringify({
          message: name,
          dest: '/somewhere',
          //   icon,
          // TODO unread notification count from DB
          body: message,
        }),
      );
      return '{}';
    } catch (e) {
      console.log('e', e);
      return JSON.stringify({ error: 'failed to send notification' });
    }
  }
  return '{}';
};
