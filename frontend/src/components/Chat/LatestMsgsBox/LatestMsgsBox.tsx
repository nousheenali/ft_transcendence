import LatestMessage from "@/components/Chat/LatestMsgsBox/LatestMessage/LatestMessage";
import { messages } from "./message_example";

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
 * The messages array is imported from the message_example.ts file (frontend/src/components/Chat/LatestMsgsBox/message_example.ts)
 */
export default function LatestMsgsBox() {
  return (
    <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container">
      {messages.map((message, index) => (
        <div className="py-1">
          <LatestMessage
            key={index}
            sender={message.sender}
            messageTime={message.messageTime}
            messageContent={message.messageContent}
          />
        </div>
      ))}
    </div>
  );
}
