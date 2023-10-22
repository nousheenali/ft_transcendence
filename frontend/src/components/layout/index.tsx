'use client';
import { useRouter } from 'next/router';
import MobileSidebar from '../mobileSidebar/mobileSideBar';
import AsideBar from './asidebar';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const path = usePathname();
  const isGame = !!(path === '/game')
  return (
    <main>
      <MobileSidebar />
      <div className="flex w-full space-x-4 h-screen max-h-screen py-5 px-4">
        {!isGame && <AsideBar isMobile={false} />}

        <main className="w-full">{children}</main>
      </div>
    </main>
  );
}
