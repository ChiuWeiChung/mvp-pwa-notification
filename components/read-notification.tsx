'use client';
import React from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
export default function ReadNotification() {
  const clearAppBadge = () => {
    if (navigator.clearAppBadge) {
      navigator.clearAppBadge();
      toast.success('App badge cleared');
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-2 w-full">
      <Button onClick={clearAppBadge} variant="destructive">
        Clear App Badge
      </Button>
    </div>
  );
}
