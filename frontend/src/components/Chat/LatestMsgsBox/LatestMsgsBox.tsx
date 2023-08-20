import React, { useEffect, useState } from 'react';
import LatestMessage from "@/components/Chat/LatestMsgsBox/LatestMessage/LatestMessage";
import {MessageProps} from "@/components/Chat/LatestMsgsBox/types";

// const getMessages = async () => {
//   try {
//     const response = await fetch('../../../data/messages.json');
//     const data = await response.json();
//     return data.messages; // Return the 'messages' array from the data
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     return []; // Return an empty array in case of error
//   }
// };


/**
 * A component that renders the LatestMsgsBox component, which is a box that contains the latest messages
 * of the user. It is responsible for rendering the LatestMessage component for each message in the messages
 * array.
 * 
 * The messages array is an array of objects, each object represents a message and it contains the following properties:
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
    fetch('../../../messages.json')
      .then((res) => res.json())
      .then((data) => {
        setMessages(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!messages) return <p>No profile data</p>

  console.log(messages);

  return (
    <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container">
      {/* {messages.map((message, index) => (
        <div className="py-1" key={index}>
          <LatestMessage
            sender={message.sender}
            messageTime={message.messageTime}
            messageContent={message.messageContent}
          />
        </div>
      ))} */}
    </div>
  );
}