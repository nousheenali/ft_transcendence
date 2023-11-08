"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { SocketMessage } from "../types";
import { useSession } from "next-auth/react";
import { useChatSocket, useReceivedMessageState } from "@/context/store";
/**
 * ================================================================================================
 * ❂➤ ChatSocket: initialize the socket connection with the server.
 * and listen to the events.
 * ================================================================================================*/
export default function ChatSocket({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { socket, setSocket } = useChatSocket();
  const { setReceivedMessage } = useReceivedMessageState();
  /**
   * ❂➤ This useEffect is used to initialize the socket connection with the server,
   * without any dependency, so it will be called only once.
   * ======================================================================== **/
  useEffect(() => {
    try {
      const chatSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
        query: { userLogin: session.data?.user.name! },
        autoConnect: false,
      });
      if (chatSocket && session && session.data?.user.name) {
        setSocket(chatSocket);
        chatSocket.connect();
      }
    } catch (error) {
      console.log(error);
    }
  }, [session]);

  /**
   * ❂➤ This useEffect is used to listen to the events from the server,
   * with the socket as a dependency, so it will be called every time the socket changes,
   * but it will be called only once, because the socket is initialized only once.
   * that
   * ======================================================================== **/
  useEffect(() => {
    try {
      socket.on("connect", () => {
        console.log(`Connected to the server with socket id: ${socket.id}`);
      });
      socket.on("disconnect", (reason) => {
        console.log("Disconnected from the server for reason: ", reason);
      });
      socket.on("reconnect", (attempt) => {
        console.log("Reconnected to the server on attempt number: ", attempt);
      });
      socket.on("ServerToClient", (data: SocketMessage) => {
        setReceivedMessage(data);
        // console.log("Message received from a ", data.sender, " : => ", data);
      });
      socket.on("ServerToChannel", (data: SocketMessage) => {
        console.log("Message received from a channel: => ", data);
        alert(
          "Message received from : => [" +
            data.sender +
            "] : => " +
            data.message
        );
      });
      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("ServerToClient");
        socket.off("ServerToChannel");
      };
    } catch (error) {
      console.log(error);
    }
  }, [socket, session]);
  return <>{children}</>;
}

// ---------------------------------------------------------------------------------------------
