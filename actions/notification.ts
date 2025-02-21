'use server';
import webpush from 'web-push';
import { SendNotification } from './types';
import { vapidPublicKey, vapidPrivateKey } from '@/constants';

webpush.setVapidDetails('mailto:rick@jgallop.com', vapidPublicKey, vapidPrivateKey);

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
