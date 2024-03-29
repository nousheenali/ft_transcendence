import Sender from "./Senders/Senders";
import Receiver from "./Receiver/Receiver";
import React, { useEffect, useState, useRef, useContext } from "react";
import { MessagesProps } from "../../../types";
import {
  activateClickedChannel,
  useSentMessageState,
  useReceivedMessageState,
  useReRenderAllState,
} from "@/context/store";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelMessagesData } from "../../../../../services/channels";
import { AuthContext } from "@/context/AuthProvider";
import { getBlockList } from "@/services/user";
import { set } from "date-fns";

/**============================================================================================*/
export default function ChannelChat() {
  const { user } = useContext(AuthContext);
  const { activeChannel } = activateClickedChannel();
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const { reRenderAll, setReRenderAll } = useReRenderAllState();
  const { sentMessage } = useSentMessageState();
  const { receivedMessage } = useReceivedMessageState();
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  /**-------------------------------------------------------------------------**/
  /**
   **╭── 🟣
   **├ 👇 useEffect to fetch the messages of the active channel and refresh the messages when
   **├    a new message is sent or received.
   **└── 🟣
   **/
  useEffect(() => {
    if (user && user.login && activeChannel.channelName) {
      const fetchData = async () => {
        const channelMessages: MessagesProps[] = await getChannelMessagesData(
          user.login,
          API_ENDPOINTS.channelMessages + activeChannel.channelName + "/"
        );
        setMessages(channelMessages);

        const blockedUsers: string[] = await getBlockList(
          user.login,
          API_ENDPOINTS.blockedLogins
        );
        setBlockedUsers(blockedUsers);
      };
      fetchData();
    } else {
      setMessages([]);
    }
    // if (reRenderAll) setReRenderAll(false);
  }, [user, activeChannel, sentMessage, receivedMessage, reRenderAll]);

  /**-------------------------------------------------------------------------**/
  /**
   **╭── 🟣
   **├ 👇 This useEffect is used to scroll the chat to the bottom when a new message is received.
   **└── 🟣
   **/
  useEffect(() => {
    if (chatScrollRef && messages && activeChannel.channelName) {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }
  }, [activeChannel, messages]);

  /**-------------------------------------------------------------------------**/
  if (messages === undefined || activeChannel.channelName === undefined)
    return <div className="overflow-y-scroll px-3"></div>;
  messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  /**-------------------------------------------------------------------------**/
  return (
    <div className="overflow-y-scroll px-3" ref={chatScrollRef}>
      {messages.map((message, index) => {
        if (messages[index].sender.login === user.login!)
          return <Receiver key={index} message={message} />;
        else if (blockedUsers.includes(messages[index].sender.login))
          return null;
        else return <Sender key={index} message={message} />;
      })}
    </div>
  );
}

/**============================================================================================*/
