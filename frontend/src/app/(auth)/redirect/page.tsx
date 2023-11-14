'use client';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthProvider';

export default function RootLoginRedirectPage() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken);
    if (accessToken) {
      const payload = jwtDecode(accessToken);
      if (payload) setUser(payload);
    } else {
      router.push('/login');
    }
  }, [setUser, router]);

  useEffect(() => {
    if (user.login) {
      if (user.TFAEnabled) {
        router.push('/auth/2fa');
      } else {
        router.push('/');
      }
    }
  }, [user, router]);

  return (
    <div>
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <div className="flex flex-row items-center justify-between px-[50px] pt-8 pb-4">
          <div className="relative">
            <img className="w-24 h-24 rounded-full object-cover" src="img" />
            <span className="bottom-1 left-16 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
