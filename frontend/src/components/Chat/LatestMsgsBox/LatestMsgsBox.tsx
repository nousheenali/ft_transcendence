import LatestMessage from "@/components/Chat/LatestMessage/LatestMessage";
import { messages } from "./message_example";

export default function LatestMsgsBox() {
  return (
    <div className="w-full overflow-y-scroll bg-slate-500 scroll-container">
      {messages.map((message, index) => (
        <LatestMessage
          key={index}
          sender={message.sender}
          messageTime={message.messageTime}
          messageContent={message.messageContent}
        />
      ))}
    </div>
  );
}
