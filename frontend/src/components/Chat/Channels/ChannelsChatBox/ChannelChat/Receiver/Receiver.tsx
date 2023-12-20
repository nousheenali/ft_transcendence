import Image from "next/image";
import { MessagesProps } from "../../../../types";
import { formatDistanceToNow } from "date-fns";

export default function ReceiverChatBox(data: { message: MessagesProps }) {
  const formattedTime = formatDistanceToNow(new Date(data.message.createdAt), {
    addSuffix: true,
  });
  return (
    <div className="chat chat-end font-saira-condensed ">
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

      <div className="chat-header ">
        {data.message.sender.name}
        <time className="text-xs opacity-50 px-2 ">{formattedTime}</time>
      </div>

      <div className="chat-bubble font-thin bg-receiver-chatbox-bg">
        {data.message.content}
      </div>
    </div>
  );
}
