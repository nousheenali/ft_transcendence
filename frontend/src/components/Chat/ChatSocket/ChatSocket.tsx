"use client";

import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketMessage } from "../types";
import { AuthContext } from "@/context/AuthProvider";
import {
  useChatSocket,
  useReceivedMessageState,
  useReRenderAllState,
} from "@/context/store";
import { toast } from "react-toastify";

/**
 * ================================================================================================
 * 🟣🟣 ChatSocket: initialize the socket connection with the server.
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
  /**
   * 🟣🟣 This useEffect is used to initialize the socket connection with the server,
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
   * 🟣🟣 This useEffect is used to listen to the events from the server,
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
      socket.on("UserInvitedToChannel", (data) => {
        // TODO // Send notification to the user that he has been invited to the channel.
        const { invitedBy, channelName } = data;
        toast.success(
          `You have been invited to the channel: ${channelName} by ${invitedBy}`
        );
      });

      /**-------------------------------------------------------------------------**/
      socket.on("newChannelJoiner", (data) => {
        // TODO // Display message on the channel that new user joined.
        console.log("newChannelJoiner", data);
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserNotExists", () => {
        toast.warning("User does not exists in the server");
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserAlreadyInChannel", () => {
        toast.info("User already in the channel");
      });

      /**-------------------------------------------------------------------------**/
      socket.on("ChannelCreated", () => {
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/
      socket.on("ChannelDeleted", () => {
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserStatusUpdate", () => {
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/

      socket.on("UserLeftChannel", (data) => {
        // TODO // Display message on the channel that user has left.
        // console.log("UserLeftChannel", data);
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/

      socket.on("ServerToChannel", (data: SocketMessage) => {
        setReceivedMessage(data);
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserKicked", (data: any) => {
        const { kickedUser, channelName } = data;
        console.log("UserKicked", data);
        setReRenderAll(true);
        toast.warn(
          `user ${kickedUser} has been kicked from the channel ${channelName}`
        );
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserKickedFromChannel", (data: any) => {
        setReRenderAll(true);
        toast.warn(
          `You have been kicked from the channel ${data.channelName} by ${data.kickedBy}`,
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
          }
        );
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserMuted", () => {
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/
      socket.on("WrongChannelPassword", () => {
        toast.error("Wrong channel password", {
          autoClose: 1000,
        });
      });

      /**-------------------------------------------------------------------------**/
      socket.on("NewChannelAdmin", () => {
        console.log("Channel Admin Updated");
        setReRenderAll(true);
      });
      
      /**-------------------------------------------------------------------------**/
      socket.on("ReRenderAllUsers", () => {
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/

      return () => {
        socket.off("connect");
        socket.off("reconnect");
        socket.off("UserMuted");
        socket.off("UserKicked");
        socket.off("disconnect");
        socket.off("UserNotExists");
        socket.off("ChannelCreated");
        socket.off("ChannelDeleted");
        socket.off("ServerToClient");
        socket.off("ServerToChannel");
        socket.off("UserLeftChannel");
        socket.off("NewChannelAdmin");
        socket.off("newChannelJoiner");
        socket.off("UserStatusUpdate");
        socket.off("ReRenderAllUsers");
        socket.off("WrongChannelPassword");
        socket.off("UserAlreadyInChannel");
        socket.off("UserInvitedToChannel");
        socket.off("UserKickedFromChannel");
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
