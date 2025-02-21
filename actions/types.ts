import { z } from 'zod';

// define the subscription schema
export const subscriptionSchema = z.object({
  endpoint: z.string().describe('推播服務提供的端點 URL'),
  expirationTime: z
    .union([z.number().describe('訂閱過期時間（可選）'), z.null().describe('訂閱過期時間（可選）')])
    .describe('訂閱過期時間（可選）')
    .optional(),
  keys: z
    .object({
      auth: z.string().describe('認證密鑰'),
      p256dh: z.string().describe('用戶的公鑰'),
    })
    .describe('用於加密推播訊息的金鑰'),
});

// define the request.json schema
export const pushNotificationSchema = z.object({
  subscription: subscriptionSchema.describe('推播訂閱資訊'),
  message: z.string().describe('推播通知的標題'),
  body: z.string().describe('推播通知的內容'),
  unreadCount: z.number().optional().describe('未讀訊息數量'),
  dest: z.string().optional().describe('點擊通知後的導向路徑'),
});

export type SendNotification = (req: z.infer<typeof pushNotificationSchema>) => Promise<{ isSuccess: boolean; message?: string }>;
