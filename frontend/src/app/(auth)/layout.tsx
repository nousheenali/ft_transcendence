import '../globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/components/Login/Header/Header';
import Background from '@/components/Background/Background';
import { ToastContainer } from 'react-toastify';

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
      <body className="overflow-y-scroll flex justify-center">
        <Background />
        <Header />
        <ToastContainer position='top-right'/>
        {children}
      </body>
    </html>
  );
}
