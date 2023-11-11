"use client";

import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketMessage } from "../types";
import { AuthContext } from "@/context/AuthProvider";
import {
  useChatSocket,
  useReceivedMessageState,
  useChannelUsersState,
} from "@/context/store";
import { toast } from "react-toastify";
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
  const { user } = useContext(AuthContext);
  const { socket, setSocket } = useChatSocket();
  const { setReceivedMessage } = useReceivedMessageState();
  const { setUserJoined } = useChannelUsersState();
  /**
   * ❂➤ This useEffect is used to initialize the socket connection with the server,
   * without any dependency, so it will be called only once.
   * ======================================================================== **/
  useEffect(() => {
    try {
      const chatSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
        query: { userLogin: user.login },
        autoConnect: false,
      });
      if (chatSocket && user && user.login) {
        setSocket(chatSocket);
        chatSocket.connect();
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

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
      socket.on("JoinChannel", (data) => {
        // TODO // Display message on the channel that new user joined.
        setUserJoined(true);
        console.log(data);
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
        socket.off("reconnect");
        socket.off("disconnect");
        socket.off("JoinChannel");
        socket.off("ServerToClient");
        socket.off("ServerToChannel");
      };
    } catch (error) {
      console.log(error);
    }
  }, [socket, user]);
  return <>{children}</>;
}

// ---------------------------------------------------------------------------------------------
