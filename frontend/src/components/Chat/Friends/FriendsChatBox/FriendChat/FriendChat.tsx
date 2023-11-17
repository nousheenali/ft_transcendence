import ReceiverChatBox from "./Sender/Sender";
import SenderChatBox from "./Receiver/Receiver";
import { MessagesProps } from "@/components/Chat/types";
import { getMessages } from "../../../../../../services/messages";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  activateClickedFriend,
  useSentMessageState,
  useReceivedMessageState,
} from "../../../../../context/store";
import { AuthContext } from "@/context/AuthProvider";

export default function FriendChat() {
  const { user } = useContext(AuthContext);
  const { sentMessage } = useSentMessageState();
  const { activeFriend } = activateClickedFriend();
  const { receivedMessage } = useReceivedMessageState();
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const [friendChat, setFriendChat] = useState<MessagesProps[]>([]);

  /**
   **╭── 🟣
   **├ 👇 Fetch the private and public channels data from the database
   **└── 🟣
   **/

  useEffect(() => {
    if (user && user.login && activeFriend) {
      const fetchData = async () => {
        const chat: MessagesProps[] = await getMessages(
          user.login!,
          API_ENDPOINTS.userMessages + activeFriend + "/"
        );
        setFriendChat(chat);
      };
      fetchData();
    }
  }, [user, activeFriend, sentMessage, receivedMessage]);

  /**
   **╭── 🟣
   **├ 👇 This useEffect is used to scroll the chat to the bottom when a new message is received.
   **└── 🟣
   **/

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [friendChat]);

  return (
    <div className="overflow-y-scroll px-3" ref={chatScrollRef}>
      {friendChat.map((message, index) => {
        if (user.login && message.sender.login === user.login) {
          return <ReceiverChatBox key={index} message={message} />;
        } else if (activeFriend && message.sender.login === activeFriend) {
          return <SenderChatBox key={index} message={message} />;
        }
      })}
    </div>
  );
}
