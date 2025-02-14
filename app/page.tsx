import NotificationRequest from '@/components/notification';
import NewQuest from '../components/new-quest';
import ReadNotification from '@/components/read-notification';
import InstallPrompt from '@/components/install-prompt';
// import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center h-screen bg-gray-100 gap-4 items-center">
      {/* <Link href="/rnd">rnd</Link>
      <Link href="/search-page">search page</Link> */}
      <p className="text-center text-purple-500 font-bold text-5xl">Thi is PWA DEMO</p>
      <InstallPrompt />
      <NotificationRequest />
      <NewQuest />
      <ReadNotification />
    </div>
  );
}
