import Image from "next/image";
import DOMPurify from "dompurify";
import Picker from "@emoji-mart/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { userInformation } from "@/components/Profile/types";
import {
  useChatSocket,
  useSentMessageState,
  useSocket,
  useReRenderAllState,
} from "@/context/store";
import { ChannelsProps, SocketMessage } from "@/components/Chat/types";
import { AuthContext } from "@/context/AuthProvider";
import { sendNotification } from "../../../../../services/friends";
import { getUserMuteStatus, getBlockList } from "../../../../../services/user";
import { Content } from "@/components/notificationIcon/types";
import { API_ENDPOINTS } from "../../../../../config/apiEndpoints";

/**=========================================================================================*/
export default function SendMessageBox({
  receiver,
}: {
  receiver: userInformation | ChannelsProps;
}) {
  const { user } = useContext(AuthContext);
  const { socket } = useChatSocket();
  const { currentSocket } = useSocket();
  const { setSentMessage } = useSentMessageState();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const { reRenderAll, setReRenderAll } = useReRenderAllState();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [blockedLogins, setBlockedLogins] = useState<string[]>([]);
  //------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 toggle emoji picker, it will show or hide the emoji picker.
   **└── 🟣
   **/
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };
  //------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 handle emoji select, when the user clicks on an emoji, it will be added to the message.
   **└── 🟣
   **/
  const handleEmojiSelect = (emoji: { native: string }) => {
    const updatedMessage = currentMessage + emoji.native;
    setCurrentMessage(updatedMessage);
  };
  //------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 use effect for emoji picker, it will close the emoji picker when the user clicks outside of it.
   **└── 🟣
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

  //------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 send message to the server and then to the receiver.
   **└── 🟣
   **/
  const sendMessage = () => {
    const trimmedMessage = currentMessage.trim();
    if (trimmedMessage === "") {
      toast.error("Message cannot be empty", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Sanitize the message using DOMPurify
    const sanitizedMessage = DOMPurify.sanitize(trimmedMessage);
    if (sanitizedMessage !== trimmedMessage) {
      toast.error("Message contains invalid characters", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // limit the message to 200 characters
    if (trimmedMessage.length > 200) {
      toast.error("Message cannot be longer than 200 characters", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Send the message to the a user or a channel
    if ("login" in receiver && socket && user.login) {
      // It's a user
      let data: SocketMessage = {
        socketId: socket.id,
        sender: user.login,
        receiver: receiver.login,
        message: trimmedMessage,
      };
      socket.emit("ClientToServer", data);
      setSentMessage(data);
    } else if ("channelName" in receiver && socket && user.login) {
      // It's a channel
      let data: SocketMessage = {
        socketId: socket.id,
        sender: user.login,
        channel: receiver.channelName,
        channelType: receiver.channelType,
        message: trimmedMessage,
      };
      socket.emit("ChannelToServer", data);
      setSentMessage(data);
    }
    if ("login" in receiver && currentSocket)
      sendNotification(
        user.login,
        receiver.login,
        Content.DirectMessage_Recieved,
        currentSocket
      );
    setCurrentMessage("");
  };
  //------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 use effect for enter key
   **└── 🟣
   **/

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        sendMessage();
      }
    };
    // add the event lister only for the element with "message" id.
    const element = document.getElementById("message");
    if (element) element.addEventListener("keydown", listener);
    // document.addEventListener("keydown", listener);
    return () => {
      if (element) element.removeEventListener("keydown", listener);
      // document.removeEventListener("keydown", listener);
    };
  }, [currentMessage]);
  //------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 use effect to get the user state in the channel, if he is muted or not
   **└── 🟣
   **/

  useEffect(() => {
    if (
      receiver &&
      "channelName" in receiver &&
      receiver.channelName !== "" &&
      receiver.channelName !== undefined &&
      user &&
      user.login
    ) {
      const fetchData = async () => {
        const isUserMuted: boolean = await getUserMuteStatus(
          user.login,
          API_ENDPOINTS.isUserMuted + receiver.channelName + "/"
        );
        setIsMuted(isUserMuted);
      };
      if (reRenderAll) setReRenderAll(false);
      fetchData();
    }
  }, [receiver, reRenderAll, user]);
  //------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (receiver && "login" in receiver && user && user.login) {
      const fetchData = async () => {
        const blockedLoginsList: string[] = await getBlockList(
          user.login,
          API_ENDPOINTS.blockedLogins
        );
        setBlockedLogins(blockedLoginsList);
      };
      if (reRenderAll) setReRenderAll(false);
      fetchData();
    }
  }, [receiver, reRenderAll, user]);
  //------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 If there is no receiver, then return an empty div
   **└── 🟣
   **/
  if (receiver === undefined || receiver === null)
    return (
      <div className="flex items-center justify-between w-full h-20 px-4 py-2 bg-sender-chatbox-bg rounded-xl font-saira-condensed text-lg"></div>
    );
  //------------------------------------------------------------------------------------------------

  // If the user is muted, then re render the component with the muted message
  if (isMuted)
    return (
      <div className="flex items-center justify-between w-full h-20 px-4 py-2 bg-sender-chatbox-bg rounded-xl font-saira-condensed text-lg">
        <input
          className="flex-grow h-full px-4 py-2 rounded-xl focus:outline-none hover:cursor-not-allowed"
          placeholder="You are muted in this channel"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          disabled
        />
      </div>
    );
  //------------------------------------------------------------------------------------------------
  if ("login" in receiver && blockedLogins.includes(receiver.login))
    return (
      <div className="flex items-center justify-between w-full h-20 px-4 py-2 bg-sender-chatbox-bg rounded-xl font-saira-condensed text-lg">
        <input
          className="flex-grow h-full px-4 py-2 rounded-xl focus:outline-none hover:cursor-not-allowed"
          placeholder="You blocked this user"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          disabled
        />
      </div>
    );
  //------------------------------------------------------------------------------------------------

  // else, return the normal component
  return (
    <div
      id="message"
      className="flex items-center justify-between w-full h-20 px-4 py-2 bg-sender-chatbox-bg rounded-xl font-saira-condensed text-lg"
    >
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

/**=========================================================================================*/
