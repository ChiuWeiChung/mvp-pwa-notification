'use server';
// import { createSupabaseServer } from '@/lib/supabase/server';
import webpush from 'web-push';

export const sendNotification = async (message: string, name: string) => {
  const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    privateKey: process.env.VAPID_PRIVATE_KEY!,
  };
  //setting our previously generated VAPID keys
  webpush.setVapidDetails('mailto:rick@jgallop.com', vapidKeys.publicKey, vapidKeys.privateKey);

  //  TODO 串接 取得被推播 user 的 API
  // 這邊的 data.notification_json 是指想要推送推播通知的目的地 (使用者)
  const data = {
    notification_json:
      '{"endpoint":"https://fcm.googleapis.com/fcm/send/eBibSKcp2pk:APA91bGxB1-3F0mUQo68BbziwrSRjPjsQDq4WNHM9fHEZRZQnSa_Gss7HDjZX_cG1W_NdkF2BcgWKXHd8LCQbvHTzxRFE2Xwj_i2iIbmB0pQWH_El9XcgeIGp5vfUcIeQyeh4KOlRZ42","expirationTime":null,"keys":{"p256dh":"BHkgn_ZEfnnk-7jHJZyvfLWA0t5uLKYxTM7Q8hroVdOrtQtZyetS8g1gZpJlH6-EKRd6PKK2MLycCcqSaScbG_s","auth":"VO0yQeBpGOGaLVJ2rbkaBg"}}',
  };
  if (data) {
    try {
      await webpush.sendNotification(
        JSON.parse(data.notification_json),
        JSON.stringify({
          message: name,
          dest: '/rnd',
          //   icon,
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
