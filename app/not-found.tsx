'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="flex gap-4 h-screen w-screen items-center justify-center">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-10 h-10 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}></div>
      ))}
    </div>
  );
}
