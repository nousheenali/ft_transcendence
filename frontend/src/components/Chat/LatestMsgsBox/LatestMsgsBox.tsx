import LatestMessage from "@/components/Chat/LatestMessage/LatestMessage";
import { messages } from "./message_example";

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
