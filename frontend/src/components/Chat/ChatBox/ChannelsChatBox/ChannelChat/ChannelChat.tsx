import React from "react";
import ReceiverChatBox from "./Receiver/Receiver";
import SenderChatBox from "./Senders/Senders";
import { ChannelsProps } from "./../../../types";

const extractMessagesFromChannel = (channel: ChannelsProps) => {
  const channelMessages = channel.Messages;

  if (channelMessages === undefined) return undefined;
  channelMessages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  return channelMessages;
};

export default function ChannelChat({
  channel,
  login,
}: {
  channel: ChannelsProps;
  login: string;
}): JSX.Element {
  const channelMessages = extractMessagesFromChannel(channel);
  if (channelMessages === undefined) return <div></div>;
  return (
    <div className="overflow-y-scroll px-3">
      {channelMessages.map((message, index) => {
      if (channelMessages[index].sender.login === login)
        return <ReceiverChatBox key={index} message={message} />;
      else return <SenderChatBox key={index} message={message} />;
    })}
    </div>
  );
}
