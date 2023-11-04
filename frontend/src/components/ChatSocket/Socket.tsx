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
      //--------------------------------------------------
      // connect to the server
      chatSocket.on("connect", () => {
        console.log(`Connected to the server with socket id: ${chatSocket.id}`);
      });

      //--------------------------------------------------
      // handle the error during connection
      chatSocket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      //--------------------------------------------------
      // listen for messages from the server
      chatSocket.on("ServerToClient", (data: any) => {
        console.log("Message received from a client: => ", data);
      });

      //--------------------------------------------------
      // listen for messages from the server
      chatSocket.on("ServerToChannel", (data: any) => {
        console.log("Message received from a channel: => ", data);
      });

      //--------------------------------------------------
      // cleanup function, will be called when the component unmounts
      return () => {
        chatSocket.off("connect");
        chatSocket.off("connect_error");
        chatSocket.off("disconnect");
        chatSocket.off("ServerToClient");
        chatSocket.off("ServerToChannel");
      };
    }
  }, [session]);
}

// ---------------------------------------------------------------------------------------------
