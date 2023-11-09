'use client';

import { useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useChatSocket } from '@/context/store';
import { io } from 'socket.io-client';
import { AuthContext } from '@/context/AuthProvider';


export default function InitChatSocket() {
  const { setSocket } = useChatSocket();
  // const session = useSession();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const chatSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      query: { userLogin: user.login! },
      autoConnect: false,
    });
    if (chatSocket && user && user.login) {
      setSocket(chatSocket);
      chatSocket.connect();
    }
  }, [user]);
}

// ---------------------------------------------------------------------------------------------
