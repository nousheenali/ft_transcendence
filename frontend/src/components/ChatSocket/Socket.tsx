"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSocket } from "@/context/store";
import { io } from "socket.io-client";

export default function useChatSocket() {
  const { setSocket } = useSocket();
  const session = useSession();

  useEffect(() => {
    const chatSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      query: { userLogin: session.data?.user.name! },
      autoConnect: false,
    });
    if (chatSocket && session && session.data?.user.name) {
      setSocket(chatSocket);
      chatSocket.connect();
    }
  }, [session]);
}

// ---------------------------------------------------------------------------------------------
