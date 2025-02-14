import Link from 'next/link';
import React from 'react';

export default function SomeWhere() {
  // with back button to go back to the previous page

  return (
    <div className="p-4">
      <Link href="/" className="text-blue-500 hover:text-blue-700 flex items-center gap-2 mb-4">
        <span>←</span>
        <span>Back</span>
      </Link>
      <p className="text-2xl font-semibold">SomeWhere</p>
    </div>
  );
}
