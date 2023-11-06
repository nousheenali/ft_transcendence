import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MessagesProps } from "@/components/Chat/types";
import { getMessages } from "../../../../../../../services/messages";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import LatestMessage from "@/components/Chat/Friends/FriendsSideBar/LatesMessages/LatestMessage/LatestMessage";

export default function LatestMsgsBox() {
  const session = useSession();
  const [latestMessages, setLatestMessages] = useState<MessagesProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const messages: MessagesProps[] = await getMessages(
        session?.data?.user.login!,
        API_ENDPOINTS.userLatestMessages
      );
      setLatestMessages(messages);
      setLoading(false);
    };
    fetchData();
  }, [session]);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  return (
    <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container">
      {latestMessages.map((message, index) => (
        <div className="py-1" key={index}>
          <LatestMessage message={message} />
        </div>
      ))}
    </div>
  );
}
