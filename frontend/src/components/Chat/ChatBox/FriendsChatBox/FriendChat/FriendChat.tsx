import React from "react";
import ReceiverChatBox from "./Receiver/Receiver";
import SenderChatBox from "./Sender/Sender";
import { MessageReceiverProps, MessageSenderProps } from "./../../../types";

import senderMessages from "../../../../../data/message_sender.json";
import receiverMessages from "../../../../../data/message_receiver.json";

// Union type for sender and receiver messages
type MessageType = MessageSenderProps | MessageReceiverProps;

function mergeAndSortMessages(senderMessages: any, receiverMessages: any) {
  const allMessages: MessageType[] = [
    ...senderMessages.map((message: any) => ({
      senderName: message.senderName,
      senderAvatar: message.senderAvatar,
      messageTime: message.messageTime,
      messageContent: message.messageContent,
    })),
    ...receiverMessages.map((message: any) => ({
      receiverName: message.receiverName,
      receiverAvatar: message.receiverAvatar,
      messageTime: message.messageTime,
      messageSeenTime: message.messageSeenTime,
      messageContent: message.messageContent,
    })),
  ];

  allMessages.sort((a, b) => a.messageTime.localeCompare(b.messageTime));
  return allMessages;
}

export default function FriendChat() {
  const sortedMessages = mergeAndSortMessages(senderMessages.sender, receiverMessages.receiver);
  
  return (
    <div>
      {sortedMessages.map((message, index) => {
        if ("senderName" in message) {
          const senderMessage = message as MessageSenderProps;
          return (
            <SenderChatBox
              key={index}
              senderName={senderMessage.senderName}
              senderAvatar={senderMessage.senderAvatar}
              messageTime={senderMessage.messageTime}
              messageContent={senderMessage.messageContent}
            />
          );
        } else {
          const receiverMessage = message as MessageReceiverProps;
          return (
            <ReceiverChatBox
              key={index}
              receiverName={receiverMessage.receiverName}
              receiverAvatar={receiverMessage.receiverAvatar}
              messageTime={receiverMessage.messageTime}
              messageSeenTime={receiverMessage.messageSeenTime}
              messageContent={receiverMessage.messageContent}
            />
          );
        }
      })}
    </div>
  );
}

