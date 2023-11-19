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
        const { invitedBy, channelName } = data;
        setReRenderAll(true);
        toast.info(
          `You have been invited to the channel: ${channelName} by ${invitedBy}`,
          {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });

      /**-------------------------------------------------------------------------**/
      socket.on("newChannelJoiner", (data) => {
        const { newJoiner, channelName } = data;
        setReRenderAll(true);
        toast.success(`user ${newJoiner} has joined the channel ${channelName}`, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserNotExists", () => {
        toast.warning("User does not exists in the server", {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserAlreadyInChannel", () => {
        toast.warning("User already in the channel", {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
        const { leaver, channelName } = data;
        setReRenderAll(true);

// ============================== TO BE EDITED ==============================//
        socket.disconnect();
        socket.connect();
// ============================== TO BE EDITED ==============================//


        toast.info(`user ${leaver} has left the channel ${channelName}`, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

      /**-------------------------------------------------------------------------**/

      socket.on("ServerToChannel", (data: SocketMessage) => {
        setReceivedMessage(data);
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserKicked", (data: any) => {
        const { kickedUser, channelName } = data;
        setReRenderAll(true);
        toast.warning(
          `user ${kickedUser} has been kicked from the channel ${channelName}`,
          {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserKickedFromChannel", (data: any) => {
        setReRenderAll(true);
        toast.warning(
          `You have been kicked from the channel ${data.channelName} by ${data.kickedBy}`,
          {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });

      /**-------------------------------------------------------------------------**/
      socket.on("UserMuted", () => {
        setReRenderAll(true);
      });

      /**-------------------------------------------------------------------------**/
      socket.on("WrongChannelPassword", () => {
        toast.warning("Wrong channel password", {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

      /**-------------------------------------------------------------------------**/
      socket.on("NewChannelAdmin", () => {
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
