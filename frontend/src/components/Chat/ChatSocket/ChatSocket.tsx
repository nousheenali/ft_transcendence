"use client";

import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketMessage } from "../types";
import { AuthContext } from "@/context/AuthProvider";
import {
  useChatSocket,
  useReceivedMessageState,
  useReRenderAllState,
  useReRenderUserState
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
  const { setReRenderAll } = useReRenderAllState();
  const { setReRenderUser } = useReRenderUserState();
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
      /**-------------------------------------------------------------------------**/

      socket.on("disconnect", (reason) => {
        console.log("Disconnected from the server for reason: ", reason);
      });
      /**-------------------------------------------------------------------------**/

      socket.on("reconnect", (attempt) => {
        console.log("Reconnected to the server on attempt number: ", attempt);
      });
      /**-------------------------------------------------------------------------**/

      socket.on("ServerToClient", (data: SocketMessage) => {
        setReceivedMessage(data);
      });
      /**-------------------------------------------------------------------------**/

      socket.on("JoinChannel", (data) => {
        // TODO // Display message on the channel that new user joined.
        console.log("User joined the channel: ", data);
        setReRenderAll(true);
      });
      /**-------------------------------------------------------------------------**/
      socket.on("ChannelCreated", (data) => {
        setReRenderAll(true);
      });
      /**-------------------------------------------------------------------------**/
      socket.on("ChannelDeleted", (data) => {
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/

      socket.on("LeaveChannel", (data) => {
        // TODO // Display message on the channel that user has left.
        console.log("User left the channel: ", data);
        setReRenderAll(true); // here just to trigger the useEffect in the channel component.
      });
      /**-------------------------------------------------------------------------**/

      socket.on("ServerToChannel", (data: SocketMessage) => {
        console.log("Message received from a channel: => ", data);
        alert(
          "Message received from : => [" +
            data.sender +
            "] : => " +
            data.message
        );
      });
      /**-------------------------------------------------------------------------**/

      return () => {
        socket.off("connect");
        socket.off("reconnect");
        socket.off("disconnect");
        socket.off("JoinChannel");
        socket.off("LeaveChannel");
        socket.off("ChannelCreated");
        socket.off("ChannelDeleted");
        socket.off("ServerToClient");
        socket.off("ServerToChannel");
      };
      /**-------------------------------------------------------------------------**/
    } catch (error) {
      console.log(error);
    }
    /**-------------------------------------------------------------------------**/
  }, [socket, user]);
  return <>{children}</>;
}

// ---------------------------------------------------------------------------------------------
