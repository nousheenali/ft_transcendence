import Image from "next/image";
import { MessagesProps } from "../../../../types";

export default function ReceiverChatBox({
  message,
}: {
  message: MessagesProps;
}) {
  return (
    <div className="chat chat-end font-saira-condensed">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            alt={message.reciever.name}
            src={message.reciever.avatar}
            width={34}
            height={34}
          />
        </div>
      </div>

      <div className="chat-header">
        {message.reciever.name}
        <time className="text-xs opacity-50 px-2">{message.createdAt}</time>
      </div>

      <div className="chat-bubble font-thin bg-receiver-chatbox-bg">
        {message.content}
      </div>
    </div>
  );
}
