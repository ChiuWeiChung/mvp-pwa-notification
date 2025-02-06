'use client';
import { Button } from '@/components/ui/button';
import { sendNotification } from '@/actions/notification';
import { toast } from 'sonner';

export default function NewQuest() {
  const handlePushNotification = async () => {
    const submitResult = await sendNotification('just completed a quest', 'meow');
    const parsedResult = JSON.parse(submitResult);
    if (parsedResult.error) toast.error(parsedResult.error);
  };

  return <Button onClick={handlePushNotification}>Submit</Button>;
}
