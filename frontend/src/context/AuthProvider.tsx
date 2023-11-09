'use client';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { redirect, useRouter } from 'next/navigation';

type AuthContextType = {
  user: any; // Adjust the type accordingly
  setUser: React.Dispatch<React.SetStateAction<any>>; // Adjust the type accordingly
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function signOut() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  redirect('/login');
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const verifyToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      return null;
      // console.log('error', error);
      // signOut();
    }
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const decodedToken = verifyToken(accessToken);

    if (accessToken && decodedToken) {
      setUser(decodedToken);
    } else {
      router.push('/login');
      // signOut();
      // Handle the case when there's no accessToken or it's not valid
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
