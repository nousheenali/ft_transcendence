import { useSession } from "next-auth/react";
import ReceiverChatBox from "./Sender/Sender";
import SenderChatBox from "./Receiver/Receiver";
import { MessagesProps } from "@/components/Chat/types";
import React, { useEffect, useState, useRef } from "react";
// import { getUserData } from "../../../../../../services/user";
// import { userInformation } from "@/components/Profile/types";
import { getMessages } from "../../../../../../services/messages";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import {
  activateClickedFriend,
  useSentMessageState,
  useReceivedMessageState,
} from "../../../../../context/store";

export default function FriendChat() {
  const session = useSession();
  const { sentMessage } = useSentMessageState();
  const { activeFriend } = activateClickedFriend();
  // const [user, setUser] = useState<userInformation>();
  // const [friend, setFriend] = useState<userInformation>();
  const { receivedMessage } = useReceivedMessageState();
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const [friendChat, setFriendChat] = useState<MessagesProps[]>([]);

  /**
   **╭── 🌼
   **├ 👇 Fetch the user and the friend data from the database
   **└── 🌼
   **/

  // useEffect(() => {
  //   if (sentMessage || receivedMessage) {
  //     const fetchData = async () => {
  //       const userData: userInformation = await getUserData(
  //         session?.data?.user.login!,
  //         API_ENDPOINTS.getUserbyLogin
  //       );
  //       setUser(userData);
  //       const friendData: userInformation = await getUserData(
  //         activeFriend!,
  //         API_ENDPOINTS.getUserbyLogin
  //       );
  //       setFriend(friendData);
  //     };
  //     fetchData();
  //   }
  // }, [session]);

  /**
   **╭── 🌼
   **├ 👇 Fetch the private and public channels data from the database
   **└── 🌼
   **/

  useEffect(() => {
    if (activeFriend) {
      const fetchData = async () => {
        const chat: MessagesProps[] = await getMessages(
          session?.data?.user.login!,
          API_ENDPOINTS.userMessages + activeFriend + "/"
        );
        setFriendChat(chat);
      };
      fetchData();
    }
  }, [session, activeFriend, sentMessage, receivedMessage]);

  /**
   **╭── 🌼
   **├ 👇 This useEffect is used to scroll the chat to the bottom when a new message is received.
   **└── 🌼
   **/

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [friendChat]);

  return (
    <div className="overflow-y-scroll px-3" ref={chatScrollRef}>
      {friendChat.map((message, index) => {
        if (
          session?.data?.user.login &&
          message.sender.login === session?.data?.user.login
        ) {
          return <ReceiverChatBox key={index} message={message} />;
        } else {
          return <SenderChatBox key={index} message={message} />;
        }
      })}
    </div>
  );
}
