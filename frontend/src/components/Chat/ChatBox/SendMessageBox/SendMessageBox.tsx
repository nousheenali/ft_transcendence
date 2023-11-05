import Image from "next/image";
import { useSession } from "next-auth/react";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "@/context/store";
import React, { useState, useEffect } from "react";
import { ChannelsProps, Message } from "@/components/Chat/types";
import { userInformation } from "@/components/Profile/types";

//========================================================================
export default function SendMessageBox({
  receiver,
}: {
  receiver: userInformation | ChannelsProps;
}) {
  //---------------------------------------------------------------
  const session = useSession();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const { socket } = useSocket();
  //---------------------------------------------------------------
  useEffect(() => {
    //--------------------------------------------------
    // connect to the server
    if (socket) {
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
      socket.on("ServerToClient", (data: Message) => {
        console.log("Message received from a client: => ", data);
      });

      //--------------------------------------------------
      // listen for messages from the server
      socket.on("ServerToChannel", (data: Message) => {
        console.log("Message received from a channel: => ", data);
      });

      //--------------------------------------------------
      // cleanup function, will be called when the component unmounts
      return () => {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("disconnect");
        socket.off("ServerToClient");
        socket.off("ServerToChannel");
      };
    }
  }, [socket]);
  //---------------------------------------------------------------
  // send message to the server and then to the receiver.
  const sendMessage = () => {
    const trimmedMessage = currentMessage.trim();
    if (trimmedMessage === "") {
      return;
    }

    // Send the message to the a user or a channel
    if ("login" in receiver && socket) {
      // It's a user
      socket.emit("ClientToServer", {
        socketId: socket.id,
        username: session?.data?.user?.name,
        receiver: receiver.login,
        message: trimmedMessage,
      });
    } else if ("channelName" in receiver && socket) {
      // It's a channel
      socket.emit("ChannelToServer", {
        socketId: socket.id,
        username: session?.data?.user?.name,
        channel: receiver.channelName,
        channelType: receiver.channelType,
        message: trimmedMessage,
      });
    }
    // ##############################################################
    // POST THE MESSAGE TO THE DATABASE
    //----------------------------------

    // ##############################################################
    setCurrentMessage("");
  };

  //---------------------------------------------------------------
  // use effect for enter key
  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        sendMessage();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [currentMessage]);

  //---------------------------------------------------------------

  if (receiver === undefined)
    return (
      <div className="flex items-center justify-between w-full h-20 px-4 py-2 bg-sender-chatbox-bg rounded-xl font-saira-condensed text-lg"></div>
    );
  return (
    <div className="flex items-center justify-between w-full h-20 px-4 py-2 bg-sender-chatbox-bg rounded-xl font-saira-condensed text-lg">
      <input
        className="flex-grow h-full px-4 py-2 rounded-xl focus:outline-none"
        placeholder="Type a message"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <button className="p-2 rounded-full hover:bg-main-text focus:outline-none">
          <Image
            src="/chat/emoji.svg"
            alt="emoji icon"
            width={24}
            height={24}
          />
        </button>
        <button
          onClick={sendMessage}
          className="p-2 rounded-full hover:bg-main-text focus:outline-none"
        >
          <Image src="/chat/send.svg" alt="send icon" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}

//========================================================================
