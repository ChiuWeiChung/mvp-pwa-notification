import NotificationToggle from '@/components/notification-toggle';
import NotificationSender from '../components/notification-sender';
import ReadNotification from '@/components/read-notification';
import PWAInstallButton from '@/components/pwa-install-button';

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 gap-4 items-center p-4">
      <p className="text-center text-purple-500 font-bold text-3xl md:text-4xl lg:text-5xl">This is PWA DEMO</p>
      <div className="w-full md:max-w-lg lg:max-w-xl flex flex-col gap-4">
        <PWAInstallButton />
        <NotificationToggle />
        <NotificationSender />
        <ReadNotification />
      </div>
    </div>
  );
}
