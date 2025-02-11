import NotificationRequest from '@/components/notification';
// import Pwa from '@/components/pwa';
// import Image from 'next/image';
// import Link from 'next/link';
import NewQuest from '../components/new-quest';
import ReadNotification from '@/components/read-notification';
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
      {/* <Link href="/rnd">rnd</Link>
      <Link href="/search-page">search page</Link> */}
      <p className="text-center text-purple-500 font-bold text-5xl">Thi is PWA DEMO</p>

      <NotificationRequest />
      <NewQuest />
      <ReadNotification />
      {/* <Pwa /> */}
    </div>
  );
}
