import React from "react";
import ReceiverChatBox from "./Receiver/Receiver";
import SenderChatBox from "./Sender/Sender";
import { MessageReceiverProps, MessageSenderProps } from "./../../../types";

import senderMessages from "../../../../../data/message_sender.json";
import receiverMessages from "../../../../../data/message_receiver.json";

/**
 *** Helper function:
 *** TODO: Delete it after connecting to the backend ***
 * -----------------------------------------------------
 * A function that takes two arrays of messages and merges them into one array and then sorts the array
 * by the messageTime property.
 * 
 * NOTE:
 * =====
 * The function have an error caused from the optional properties of the MessageSenderProps
 * which is {messageTime}, the error is:
 *    "Object is possibly 'undefined'.ts(2532)"
 * since the function is temporary, just ignore the error for now. 
 */
function mergeAndSortMessages(senderMessages: any, receiverMessages: any) {
  const allMessages: (MessageSenderProps | MessageReceiverProps)[] = [
    ...senderMessages.map((message: MessageSenderProps) => ({
      senderName: message.senderName,
      senderAvatar: message.senderAvatar,
      messageTime: message.messageTime,
      messageContent: message.messageContent,
    })),
    ...receiverMessages.map((message: MessageReceiverProps) => ({
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

/**
 * A component that renders the chat part of the FriendsChatBox component, it receives the following props:
 * 
 * {senderMessages} is an array of objects that contains the following properties:
    * {senderName} is a string that contains the name of the sender
    * {senderAvatar} is an object that contains the following properties:
    * {alt} is a string that represents the alt attribute of the profile image
    * {src} is a string that represents the src attribute of the profile image
    * {messageTime} is a string that contains the time the message was sent
    * {messageContent} is a string that contains the content of the message
 * 
 * {receiverMessages} is an array of objects that contains the following properties:
    * {receiverName} is a string that contains the name of the receiver.
    * {receiverAvatar} is an object that contains the following properties:
    * {alt} is a string that represents the alt attribute of the profile image
    * {src} is a string that represents the src attribute of the profile image
    * {messageTime} is a string that contains the time the message was sent
    * {messageSeenTime} is a string that contains the time the message was seen
    * from the other chat part
    * {messageContent} is a string that contains the content of the message
 * 
 * ====================================================================================================
 */
export default function FriendChat() {
  const sortedMessages = mergeAndSortMessages(
    senderMessages.sender,
    receiverMessages.receiver
  );

  return (
    <div className="overflow-y-scroll px-3">
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
