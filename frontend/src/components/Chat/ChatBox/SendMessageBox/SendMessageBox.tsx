// import EmojiPicker from "emoji-picker-react";
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChannelsProps } from "@/components/Chat/types";
import { userInformation } from "@/components/Profile/types";
// import { useSocket } from "@/context/store";

//========================================================================
interface Message {
  socketId: string;
  username: string;
  receiver: string;
  message: string;
}

//========================================================================
export default function SendMessageBox({
  receiver,
}: {
  receiver: userInformation | ChannelsProps;
}) {
  //---------------------------------------------------------------
  const session = useSession();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const activeUser = session.data?.user.name!;
  const socket = io("http://localhost:3001", {
    query: { userLogin: activeUser },
  });
  //---------------------------------------------------------------
  // use effect for socket connection, disconnection, and message
  useEffect(() => {
    //--------------------------------------------------
    // connect to the server
    socket.on("connection", () => {
      console.log(`Connected to the server with socket id: ${socket.id}`);
    });
    //--------------------------------------------------
    // listen for messages from the server
    if (socket)
      socket.on("ServerToClient", (data: any) => {
        console.log(data);
      });

    //--------------------------------------------------
    // cleanup function, will be called when the component unmounts
    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("ServerToClient");
      }
    };
  }, [receiver, activeUser]);

  //---------------------------------------------------------------
  // send message to the server and then to the receiver.
  const sendMessage = (e: any) => {
    const trimmedMessage = currentMessage.trim();
    if (trimmedMessage === "") {
      return;
    }

    // Send the message to the a user or a channel
    if ("login" in receiver) {
      // It's a user
      socket.emit("ClientToServer", {
        message: {
          socketId: socket.id,
          username: session?.data?.user?.name,
          receiver: receiver.login,
          message: trimmedMessage,
        },
      });
    } else if ("channelName" in receiver) {
      // It's a channel
      socket.emit("ClientToServer", {
        message: {
          socketId: socket.id,
          username: session?.data?.user?.name,
          receiver: receiver.channelName,
          message: trimmedMessage,
        },
      });
    }

    setCurrentMessage("");
  };

  //---------------------------------------------------------------
  // use effect for enter key
  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        sendMessage(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [currentMessage]);

  //---------------------------------------------------------------

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
