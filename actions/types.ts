import { z } from "zod";

// define the subscription schema
export const subscriptionSchema = z.object({
  endpoint: z.string(),
  expirationTime: z.number().optional().nullable(),
  keys: z.object({
    auth: z.string(),
    p256dh: z.string(),
  }),
});

// define the request.json schema
export const pushNotificationSchema = z.object({
  subscription: subscriptionSchema,
  message: z.string(),
  body: z.string(),
  unreadCount: z.number().optional(),
  dest: z.string().optional(),
});

export type SendNotification = (req: z.infer<typeof pushNotificationSchema>) => Promise<{isSuccess: boolean, message?: string}>;




