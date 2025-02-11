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
    <div>
      <Button onClick={clearAppBadge}>Clear App Badge</Button>
    </div>
  );
}
