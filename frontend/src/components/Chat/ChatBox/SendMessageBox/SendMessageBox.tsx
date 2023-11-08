import Image from "next/image";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import EmojiPicker from "emoji-picker-react";
import "react-toastify/dist/ReactToastify.css";
import { useChatSocket, useSentMessageState } from "@/context/store";
import React, { useState, useEffect } from "react";
import { ChannelsProps, SocketMessage } from "@/components/Chat/types";
import { userInformation } from "@/components/Profile/types";

//========================================================================
export default function SendMessageBox({
  receiver,
}: {
  receiver: userInformation | ChannelsProps;
}) {
  const session = useSession();
  const { socket } = useChatSocket();
  const { setSentMessage } = useSentMessageState();
  const [currentMessage, setCurrentMessage] = useState<string>("");

  /**
   **╭── 🌼
   **├ 👇 send message to the server and then to the receiver.
   **└── 🌼
   **/
  const sendMessage = () => {
    const trimmedMessage = currentMessage.trim();
    if (trimmedMessage === "") {
      toast.error("Message cannot be empty");
      return;
    }

    // Sanitize the message using DOMPurify
    const sanitizedMessage = DOMPurify.sanitize(trimmedMessage);
    if (sanitizedMessage !== trimmedMessage) {
      toast.error("Message contains invalid characters");
      return;
    }

    // limit the message to 200 characters
    if (trimmedMessage.length > 100) {
      toast.error("Message cannot be longer than 200 characters");
      return;
    }

    // Send the message to the a user or a channel
    if ("login" in receiver && socket && session?.data?.user?.name) {
      // It's a user
      let data: SocketMessage = {
        socketId: socket.id,
        sender: session?.data?.user?.name,
        receiver: receiver.login,
        message: trimmedMessage,
      };
      socket.emit("ClientToServer", data);
      setSentMessage(data);
    } 
    // else if (
    //   "channelName" in receiver &&
    //   socket &&
    //   session?.data?.user?.name
    // ) {
    //   // It's a channel
    //   let data: SocketMessage = {
    //     socketId: socket.id,
    //     sender: session?.data?.user?.name,
    //     channel: receiver.channelName,
    //     channelType: receiver.channelType,
    //     message: trimmedMessage,
    //   };
    //   socket.emit("ChannelToServer", data);
    //   setSentMessage(data);
    // }
    setCurrentMessage("");
  };

  /**
   **╭── 🌼
   **├ 👇 use effect for enter key
   **└── 🌼
   **/

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

  /**
   **╭── 🌼
   **├ 👇 If there is no receiver, then return an empty div
   **└── 🌼
   **/
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
