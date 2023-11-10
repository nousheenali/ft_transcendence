import React, { useContext, useEffect, useState } from "react";
import { MessagesProps } from "@/components/Chat/types";
import { getMessages } from "../../../../../../../services/messages";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import { useReceivedMessageState } from "../../../../../../context/store";
import Message from "@/components/Chat/Friends/FriendsSideBar/LatesMessages/Message/Message";
import { AuthContext } from "@/context/AuthProvider";

export default function MessagesList() {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const { receivedMessage } = useReceivedMessageState();
  const [latestMessages, setLatestMessages] = useState<MessagesProps[]>([]);

  useEffect(() => {
    if (user && user.login) {
      const fetchData = async () => {
        const messages: MessagesProps[] = await getMessages(
          user.login!,
          API_ENDPOINTS.userLatestMessages
        );
        setLatestMessages(messages);
        setLoading(false);
      };
      fetchData();
    }
  }, [user, receivedMessage]);

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
