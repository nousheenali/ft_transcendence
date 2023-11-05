"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useChatSocket } from "@/context/store";
import { io } from "socket.io-client";
import { Message } from "../types";

export default function InitChatSocket() {
  const { socket, setSocket } = useChatSocket();
  const session = useSession();

  //========================================================================
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

  //========================================================================
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to the server with socket id: ${socket.id}`);
    });
    socket.on("ServerToClient", (data: Message) => {
      console.log("Message received from a client: => ", data);
    });
    socket.on("ServerToChannel", (data: Message) => {
      console.log("Message received from a channel: => ", data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("ServerToClient");
      socket.off("ServerToChannel");
    };
  }, [socket]
  );
}

// ---------------------------------------------------------------------------------------------
