import Image from "next/image";
import { MessagesProps } from "../../../../types";

export default function SenderChatBox({ message }: { message: MessagesProps }) {
  return (
    <div className="chat chat-start font-saira-condensed">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            alt={message.sender.name}
            src={message.sender.avatar}
            width={34}
            height={34}
          />
        </div>
      </div>

      <div className="chat-header">
        {message.sender.name}
        <time className="text-xs opacity-50 px-2">{message.createdAt}</time>
      </div>

      <div className="chat-bubble font-thin bg-sender-chatbox-bg">
        {message.content}
      </div>
    </div>
  );
}
