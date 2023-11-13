import Sender from "./Senders/Senders";
import Receiver from "./Receiver/Receiver";
import React, { useEffect, useState, useRef, useContext } from "react";
import { ChannelsProps, MessagesProps } from "../../../types";
import { activateClickedChannel, useSentMessageState, useReceivedMessageState } from "@/context/store";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelMessagesData } from "../../../../../../services/channels";
import { AuthContext } from "@/context/AuthProvider";

/**============================================================================================*/
const extractMessagesFromChannel = (channel: ChannelsProps) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const { sentMessage } = useSentMessageState();
  const { receivedMessage } = useReceivedMessageState();
  /**
   **╭── 🌼
   **├ 👇 Fetch the private and public channels data from the database
   **└── 🌼
   **/

  useEffect(() => {
    if (channel.channelName) {
      const fetchData = async () => {
        const channelMessages: MessagesProps[] = await getChannelMessagesData(
          user.login,
          API_ENDPOINTS.channelMessages + channel.channelName + "/"
        );
        setMessages(channelMessages);
      };
      fetchData();
    } else {
      setMessages([]);
    }
  }, [user, channel, sentMessage, receivedMessage]);

  if (messages === undefined) return undefined;
  messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  return messages;
};

/**============================================================================================*/
export default function ChannelChat() {
  const { user } = useContext(AuthContext);
  const chatScrollRef = useRef<HTMLDivElement>();
  const { activeChannel } = activateClickedChannel();
  const channelMessages = extractMessagesFromChannel(activeChannel);

  /**
   **╭── 🌼
   **├ 👇 This useEffect is used to scroll the chat to the bottom when a new message is received.
   **└── 🌼
   **/

  useEffect(() => {
    if (chatScrollRef && channelMessages && activeChannel.channelName) {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }
  }, [activeChannel, channelMessages]);

  if (channelMessages === undefined || activeChannel.channelName === undefined)
    return <div className="overflow-y-scroll px-3"></div>;

  return (
    <div className="overflow-y-scroll px-3">
      {channelMessages.map((message, index) => {
        if (channelMessages[index].sender.login === user.login!)
          return <Receiver key={index} message={message} />;
        else return <Sender key={index} message={message} />;
      })}
    </div>
  );
}

/**============================================================================================*/
