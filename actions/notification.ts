'use server';
import webpush from 'web-push';
import { SendNotification } from './types';

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};
webpush.setVapidDetails('mailto:rick@jgallop.com', vapidKeys.publicKey, vapidKeys.privateKey);

export const sendNotification: SendNotification = async ({
  body,
  message,
  subscription,
  unreadCount = 10, // 預設未讀數量 TODO: 串接 API 取得
  dest = '/somewhere',
}) => {
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        body,
        message,
        dest,
        unreadCount,
      }),
    );
    return { isSuccess: true };
  } catch (e) {
    console.log('e', e);
    return { isSuccess: false, message: 'failed to send notification' };
  }
};
