import NotificationRequest from '@/components/notification';
import Pwa from '@/components/pwa';
import Image from 'next/image';
import NewQuest from '../components/new-quest';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/rnd">rnd</Link>
      <Link href="/search-page">search page</Link>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
      </main>
      <p className="text-center text-purple-500 font-bold text-5xl">hi</p>
      <NewQuest />
      <NotificationRequest />
      <Pwa />
    </div>
  );
}
