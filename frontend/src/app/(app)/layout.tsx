'use client';

import MainLayout from '@/components/layout';
import { ToastContainer, toast } from 'react-toastify';
import Background from '@/components/Background/Background';
import ChatSocket from '@/components/Chat/ChatSocket/ChatSocket';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser, userUpdated } = useContext(AuthContext);

  const [settingsModel, setSettingsModel] = useState();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/auth/check`,
          {
            withCredentials: true,
          }
        );
        if (data.TFAEnabled === true && data.TFAVerified === false) {
          router.push('/login?show2faModal=true');
        }
        // console.log(data);
        setUser(data);
      } catch (error) {
        if (user) {
          router.push(`${process.env.NEXT_PUBLIC_BACKEND}/auth/logout`);
        }
        router.push('/login');
      }
    };
    checkLogin();

    // axios.interceptors.response.use(
    //   (response) => {
    //     return response;
    //   },
    //   (error) => {
    //     if (error.response.status === 401) {
    //       // Redirect user to the login page
    //       window.location.href = '/login';
    //     }
    //     return Promise.reject(error);
    //   }
    // );

  }, [userUpdated]);

  if (
    !user?.login ||
    (user?.TFAEnabled === true && user?.TFAVerified === false)
  )
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Background />
        <span className="loading loading-ring loading-lg text-main-yellow"></span>
      </div>
    );
  return (
    <html lang="en">
      <body>
        <Background />
        <MainLayout>
          <ChatSocket>{children}</ChatSocket>
          <ToastContainer position="top-right" />
        </MainLayout>
      </body>
    </html>
  );
}
