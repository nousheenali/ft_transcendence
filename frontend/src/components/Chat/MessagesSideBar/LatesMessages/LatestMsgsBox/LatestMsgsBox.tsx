import React, { useEffect, useState } from 'react';
import LatestMessage from "@/components/Chat/MessagesSideBar/LatesMessages/LatestMessage/LatestMessage";
import {MessageProps} from "@/components/Chat/types";


/**
 * A function that fetches the messages from the data/messages.json file (for now)
 * and later from the backend.
 * @returns {Promise<MessageProps[]>} A promise that resolves to an array of messages
 * @async
 */

const getMessages = async () => {
  try {
    const data = await import('../../../../../data/messages.json');
    return data.messages; // Return the 'messages' array from the data
  } catch (error) {
    console.error('Error fetching messages:', error);
    return []; // Return an empty array in case of error
  }
};


/**
 * A component that renders the latest messages in the chat, it receives the following props:
 * 
 * {sender} is an object that contains the following properties:
 *  {name} is a string that represents the name of the sender
 * {profileImage} is an object that contains the following properties:
 * {alt} is a string that represents the alt attribute of the profile image
 * {src} is a string that represents the src attribute of the profile image
 * {isOnline} is a boolean that represents whether the sender is online or not
 * 
 * {messageTime} is a string that represents the time of the message
 * {messageContent} is a string that represents the content of the message
 * 
 */

export default function LatestMsgsBox() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getMessages().then((messages) => {
      setMessages(messages);
      setLoading(false)
    });
  }, []);

  if (isLoading) return (<span className="loading loading-ring loading-lg text-main-yellow"></span>);
  if (!messages) return (<p>No profile data</p>);

  return (
    <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container">
      {messages.map((message, index) => (
        <div className="py-1" key={index}>
          <LatestMessage
            sender={message.sender}
            messageTime={message.messageTime}
            messageContent={message.messageContent}
          />
        </div>
      ))}
    </div>
  );
}