'use client';
import { cookies } from 'next/headers';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { API_ENDPOINTS } from '../../config/apiEndpoints';
import { getUserData } from '../../services/user';
import { userInformation } from '@/components/Profile/types';

// type AuthContextType = {
//   payload: TokenPayload;
//   setPayload: React.Dispatch<React.SetStateAction<TokenPayload>>;
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
// };

export type TokenPayload = {
  sub: string;
  email: string;
  login: string;
  mfaEnabled: boolean;
  mfaAuthenticated: boolean;
  iat: number;
  exp: number;
};

// export type User = {
//   id: string;
//   login: string;
//   displayName: string;
//   email: string;
//   avatar: string;
//   status: 'online' | 'offline' | 'away' | 'busy';
//   victory: number;
//   mfaEnabled: boolean;
// };

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function signOut() {
  Cookies.remove('accesssToken');
  Cookies.remove('refreshToken');
  redirect('/login');
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [payload, setPayload] = useState<TokenPayload>({} as TokenPayload);
  const [user, setUser] = useState<userInformation>({} as userInformation);

  const verifyToken = useCallback((token: string) => {
    try {
      const decoded = jwtDecode(token); // Add your verification logic as necessary
      return decoded;
    } catch (error) {
      console.error('Token verification error:', error);
      return {};
    }
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    console.log('accesssToken :::::::', accessToken);
    const decodedToken = verifyToken(accessToken);
    console.log(decodedToken);
    if (accessToken && decodedToken) {
      // const userData =

      // const getUser = async () => {
      //   await getUserData(decodedToken.login!, API_ENDPOINTS.getUserbyLogin);
      // };

      setUser(decodedToken);
    } else {
      signOut();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        payload,
        setPayload,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
