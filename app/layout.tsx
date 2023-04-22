// 'use client';
import './globals.css';
import Nav from './nav';
import AnalyticsWrapper from './analytics';
import { Suspense } from 'react';
import Loading from './loading';
export const metadata = {
  title: 'Dhan Yojana',
  description:
    'The Dhan Yojana is a powerful and user-friendly web application designed to help users manage their expenses and split costs with friends, roommates, and colleagues.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback={<Loading />}>
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
