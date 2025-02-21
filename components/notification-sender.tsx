'use client';
import { Button } from '@/components/ui/button';
import { sendNotification } from '@/actions/notification';
import { toast } from 'sonner';
import { useState } from 'react';
import { subscriptionSchema } from '@/actions/types';

export default function NotificationSender() {
  const [endpoint, setEndpoint] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePushNotification = async () => {
    if (!endpoint) toast.error('Please enter an endpoint');
    else {
      setLoading(true);
      const parsedEndpoint = JSON.parse(endpoint);
      // validate the subscription
      console.log('parsedEndpoint', parsedEndpoint);
      const { data: subscription, success, error } = subscriptionSchema.safeParse(parsedEndpoint);
      if (!success) {
        toast.error('Invalid subscription');
        console.log('error', error);
        setLoading(false);
      }
      else {
        const params = {message:'meow', body:'just completed a quest', subscription};
        const submitResult = await sendNotification(params);
        if(!submitResult.isSuccess) toast.error(submitResult.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 border w-full border-gray-300 rounded-md p-2 py-6">
      <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="Enter notification endpoint" className="border border-gray-300 rounded-md p-2" />
      <Button onClick={handlePushNotification} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </div>
  );
}
