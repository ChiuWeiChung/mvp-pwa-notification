'use client';
import { Button } from '@/components/ui/button';
import { sendNotification } from '@/actions/notification';
import { toast } from 'sonner';
import { useState } from 'react';

export default function NewQuest() {
  const [endpoint, setEndpoint] = useState('');

  const handlePushNotification = async () => {
    if (!endpoint) toast.error('Please enter an endpoint');
    else {
      const submitResult = await sendNotification('just completed a quest', 'meow', endpoint);
      const parsedResult = JSON.parse(submitResult);
      if (parsedResult.error) toast.error(parsedResult.error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-1/2">
      <input type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="Enter notification endpoint" className="border border-gray-300 rounded-md p-2" />
      <Button onClick={handlePushNotification}>Submit</Button>
    </div>
  );
}
