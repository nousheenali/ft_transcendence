import Image from "next/image";
import DOMPurify from "dompurify";
import Picker from "@emoji-mart/react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useRef } from "react";
import { userInformation } from "@/components/Profile/types";
import { useChatSocket, useSentMessageState } from "@/context/store";
import { ChannelsProps, SocketMessage } from "@/components/Chat/types";

//========================================================================
export default function SendMessageBox({
  receiver,
}: {
  receiver: userInformation | ChannelsProps;
}) {
  const session = useSession();
  const { socket } = useChatSocket();
  const { setSentMessage } = useSentMessageState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  /**
   **╭── 🌼
   **├ 👇 toggle emoji picker, it will show or hide the emoji picker.
   **└── 🌼
   **/
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  /**
   **╭── 🌼
   **├ 👇 handle emoji select, when the user clicks on an emoji, it will be added to the message.
   **└── 🌼
   **/
  const handleEmojiSelect = (emoji: { native: string }) => {
    const updatedMessage = currentMessage + emoji.native;
    setCurrentMessage(updatedMessage);
  };

  /**
   **╭── 🌼
   **├ 👇 use effect for emoji picker, it will close the emoji picker when the user clicks outside of it.
   **└── 🌼
   **/
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    else if (
      "channelName" in receiver &&
      socket &&
      session?.data?.user?.name
    ) {
      // It's a channel
      let data: SocketMessage = {
        socketId: socket.id,
        sender: session?.data?.user?.name,
        channel: receiver.channelName,
        channelType: receiver.channelType,
        message: trimmedMessage,
      };
      socket.emit("ChannelToServer", data);
      setSentMessage(data);
    }
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
        ref={(el) => (inputRef.current = el)}
        className="flex-grow h-full px-4 py-2 rounded-xl focus:outline-none"
        placeholder="Type a message"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <button
          onClick={toggleEmojiPicker}
          className="p-2 rounded-full hover:bg-main-text focus:outline-none"
        >
          <Image
            src="/chat/emoji.svg"
            alt="emoji icon"
            width={24}
            height={24}
          />
        </button>

        {showEmojiPicker && (
          <div
            className="absolute bottom-16 right-40"
            ref={(el) => (emojiPickerRef.current = el)}
          >
            <Picker
              onEmojiSelect={handleEmojiSelect}
              set="emojione"
              title="Pick your emoji"
              emoji="point_up"
            />
          </div>
        )}

        <button
          onClick={sendMessage}
          className="p-2 rounded-full hover:bg-main-text focus:outline-none"
        >
          <Image src="/chat/send.svg" alt="send icon" width={25} height={25} />
        </button>
      </div>
    </div>
  );
}

//========================================================================
