"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useChatSocket } from "@/context/store";
import { io } from "socket.io-client";

export default function InitChatSocket() {
  const { setSocket } = useChatSocket();
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
