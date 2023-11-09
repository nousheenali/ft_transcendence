import React, { useContext } from "react";
import Receiver from "./Receiver/Receiver";
import Sender from "./Senders/Senders";
import { ChannelsProps } from "../../../types";
import { useSession } from "next-auth/react";
import { AuthContext } from "@/context/AuthProvider";

const extractMessagesFromChannel = (channel: ChannelsProps) => {
  const channelMessages = channel.Messages;

  if (channelMessages === undefined) return undefined;
  channelMessages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  return channelMessages;
};

export default function ChannelChat({ channel }: { channel: ChannelsProps }) {
  // const session = useSession();
  const { user } = useContext(AuthContext);
  const login: string = user.login;
  const channelMessages = extractMessagesFromChannel(channel);

  if (channelMessages === undefined) return <div></div>;

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
