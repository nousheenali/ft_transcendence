import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MessagesProps } from "@/components/Chat/types";
import { getMessages } from "../../../../../../../services/messages";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import Message from "@/components/Chat/Friends/FriendsSideBar/LatesMessages/Message/Message";
import { useReceivedMessageState, activateClickedFriend } from "../../../../../../context/store";

export default function MessagesList() {
  const session = useSession();
  const [latestMessages, setLatestMessages] = useState<MessagesProps[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { receivedMessage } = useReceivedMessageState();
  const {setActiveFriend} = activateClickedFriend();

  useEffect(() => {
    if (session && session?.data?.user.login) {
      const fetchData = async () => {
        const messages: MessagesProps[] = await getMessages(
          session?.data?.user.login!,
          API_ENDPOINTS.userLatestMessages
        );
        setLatestMessages(messages);
        setLoading(false);
      };
      fetchData();
    }
  }, [session, receivedMessage]);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );

  if (latestMessages.length === 0)
    return (
      <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container"></div>
    );

  return (
    <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container">
      {latestMessages.map((message, index) => (
        <div className="py-1" key={index}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
}
