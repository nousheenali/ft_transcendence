// import SideBar from "@/components/SideBar";
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSocket } from "@/context/store";
import { io, Socket } from "socket.io-client";

export default function useChatSocket() {
  const { setSocket } = useSocket();
  const session = useSession();

  // use effect for socket connection, disconnection, and message
  useEffect(() => {
    //--------------------------------------------------
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      query: { userLogin: session.data?.user.name! },
      autoConnect: false,
    });
    setSocket(socket);
    socket.connect();
    //--------------------------------------------------
    // connect to the server
    socket.on("connect", () => {
      console.log(`Connected to the server with socket id: ${socket.id}`);
    });

    //--------------------------------------------------
    // handle the error during connection
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    //--------------------------------------------------
    // listen for messages from the server
    socket.on("ServerToClient", (data: any) => {
      console.log("Message received from a client: => ", data);
    });

    //--------------------------------------------------
    // listen for messages from the server
    socket.on("ServerToChannel", (data: any) => {
      console.log("Message received from a channel: => ", data);
    });

    //--------------------------------------------------
    // cleanup function, will be called when the component unmounts
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("ServerToClient");
    };
  }, [session]);
}

// ---------------------------------------------------------------------------------------------