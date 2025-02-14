'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

 const PWAInstallButton: React.FC = () => {
   const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
   const [isInstallable, setIsInstallable] = useState(false);

   useEffect(() => {
     const controller = new AbortController();
     const { signal } = controller;

     const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
       event.preventDefault(); // Prevent the default behavior of the event
       setInstallPrompt(event); // Store the event for later use
       setIsInstallable(true); // Set the state to indicate that the app is installable
     };

     const handleAppInstalled = () => {
       setInstallPrompt(null);
       setIsInstallable(false);
     };

     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener, { signal });
     window.addEventListener('appinstalled', handleAppInstalled, { signal });

     return () => {
       controller.abort();
     };
   }, []);

   const handleInstallClick = async () => {
     if (!installPrompt) return;
     await installPrompt.prompt();
     setInstallPrompt(null);
     setIsInstallable(false);
   };

   return (
     isInstallable && (
       <Button className="bg-purple-500 hover:bg-purple-600" onClick={handleInstallClick}>
         安裝桌面版
       </Button>
     )
   );
 };

 export default PWAInstallButton;
