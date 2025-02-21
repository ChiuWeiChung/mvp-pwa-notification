// create a route to handle push notification in POST method
import { sendNotification } from '@/actions/notification';
import { NextRequest, NextResponse } from 'next/server';
import { pushNotificationSchema } from '@/actions/types';


export async function POST(request: NextRequest) {
  const req = await request.json();
  const payload = pushNotificationSchema.safeParse(req);
  
  if (!payload.success) {
    return NextResponse.json({ error: payload.error }, { status: 400 });
  }

  const result = await sendNotification(payload.data);
  console.log('result', result);
  return NextResponse.json(result);
}
