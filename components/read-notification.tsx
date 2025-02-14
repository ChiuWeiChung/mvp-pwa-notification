'use client';
import React from 'react';
import { Button } from './ui/button';

export default function ReadNotification() {
  // add an ui button to set app badge to 0
  const clearAppBadge = () => {
    if (navigator.clearAppBadge) {
      navigator.clearAppBadge();
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
