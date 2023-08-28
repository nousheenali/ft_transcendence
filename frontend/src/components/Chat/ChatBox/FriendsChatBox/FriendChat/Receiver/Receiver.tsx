import Image from "next/image";
import { MessageReceiverProps } from "./../../../../types";

export default function ReceiverChatBox({
  receiverName,
  receiverAvatar,
  messageTime,
  messageSeenTime,
  messageContent,
}: MessageReceiverProps) {
  return (
    <div className="chat chat-end font-saira-condensed">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image alt={receiverAvatar.alt} src={receiverAvatar.src} width={34} height={34} />
        </div>
      </div>

      <div className="chat-header">
        {receiverName}
        <time className="text-xs opacity-50 px-2">{messageTime}</time>
      </div>

      <div className="chat-bubble font-thin bg-receiver-chatbox-bg">
        {messageContent}
      </div>

      <div className="chat-footer opacity-50">Seen at {messageSeenTime}</div>
    </div>
  );
}
