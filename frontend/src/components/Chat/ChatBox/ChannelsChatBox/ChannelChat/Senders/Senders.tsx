import Image from "next/image";
import { MessageSenderProps } from "./../../../../types";

export default function SenderChatBox({
  senderName,
  senderAvatar,
  messageTime,
  messageContent,
}: MessageSenderProps) {
  return (
    <div className="chat chat-start font-saira-condensed">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            alt={senderAvatar.alt}
            src={senderAvatar.src}
            width={34}
            height={34}
          />
        </div>
      </div>

      <div className="chat-header">
        {senderName}
        <time className="text-xs opacity-50 px-2">{messageTime}</time>
      </div>

      <div className="chat-bubble font-thin bg-sender-chatbox-bg">
        {messageContent}
      </div>
    </div>
  );
}