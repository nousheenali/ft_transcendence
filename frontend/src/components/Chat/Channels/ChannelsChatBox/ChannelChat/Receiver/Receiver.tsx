import Image from "next/image";
import { MessagesProps } from "../../../../types";

export default function ReceiverChatBox(data: { message: MessagesProps }) {
  return (
    <div className="chat chat-end font-saira-condensed">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            alt={data.message.sender.name}
            src={data.message.sender.avatar}
            width={34}
            height={34}
          />
        </div>
      </div>

      <div className="chat-header">
        {data.message.sender.name}
        <time className="text-xs opacity-50 px-2">
          {data.message.createdAt}
        </time>
      </div>

      <div className="chat-bubble font-thin bg-receiver-chatbox-bg">
        {data.message.content}
      </div>
    </div>
  );
}
