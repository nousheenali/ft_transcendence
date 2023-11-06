import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import Background from '@/components/Background/Background';
import AuthProvider from './context/AuthProvider';

export const metadata: Metadata = {
  title: 'Spin Masters',
  description: 'Transcendence project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="Logo.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
