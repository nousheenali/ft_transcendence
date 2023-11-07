import Sender from "./Senders/Senders";
import Receiver from "./Receiver/Receiver";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import { ChannelsProps, MessagesProps } from "../../../types";
import { activateClickedChannel } from "@/context/store";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelMessagesData } from "../../../../../../services/channels";

/**============================================================================================*/
const extractMessagesFromChannel = (channel: ChannelsProps) => {
  const session = useSession();
  const [messages, setMessages] = useState<MessagesProps[]>([]);

  /**
   **╭── 🌼
   **├ 👇 Fetch the private and public channels data from the database
   **└── 🌼
   **/

  useEffect(() => {
    const fetchData = async () => {
      const channelMessages: MessagesProps[] = await getChannelMessagesData(
        session?.data?.user.login!,
        API_ENDPOINTS.channelMessages + channel.channelName + "/"
      );
      setMessages(channelMessages);
    };
    fetchData();
  }, [session, channel]);

  if (messages === undefined) return undefined;
  messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  return messages;
};

/**============================================================================================*/
export default function ChannelChat() {
  const session = useSession();
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const { activeChannel } = activateClickedChannel();
  const channelMessages = extractMessagesFromChannel(activeChannel);

  if (channelMessages === undefined)
    return <div className="overflow-y-scroll px-3"></div>;

  /**
   **╭── 🌼
   **├ 👇 This useEffect is used to scroll the chat to the bottom when a new message is received.
   **└── 🌼
   **/
  
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [channelMessages]);

  return (
    <div className="overflow-y-scroll px-3">
      {channelMessages.map((message, index) => {
        if (channelMessages[index].sender.login === session.data?.user.login!)
          return <Receiver key={index} message={message} />;
        else return <Sender key={index} message={message} />;
      })}
    </div>
  );
}

/**============================================================================================*/
