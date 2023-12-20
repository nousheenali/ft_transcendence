import Image from "next/image";
import { MessagesProps } from "../../../../types";
import { formatDistanceToNow } from "date-fns";
import { ChatBubble } from "react-daisyui";

export default function SenderChatBox({ message }: { message: MessagesProps }) {
  const formattedTime = formatDistanceToNow(new Date(message.createdAt), {
    addSuffix: true,
  });
  return (
    <div className="chat chat-end font-saira-condensed">
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
        <time className="text-xs opacity-50 px-2">{formattedTime}</time>
      </div>

      <div className="chat-bubble font-thin bg-receiver-chatbox-bg max-h-24 whitespace-normal break-words">
        {message.content}
      </div>
    </div>
  );
}
