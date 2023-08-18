import Image from "next/image";

interface ChatMessageProps {
  sender: {
    name: string;
    profileImage: {
      alt: string;
      src: string;
    };
    isOnline: boolean;
  };
  messageTime: string;
  messageContent: string;
}

export default function ChatMessage({
  sender,
  messageTime,
  messageContent,
}: ChatMessageProps) {
  return (
    <div
      className="flex flex-row justify-center items-center w-80 h-20 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer
						bg-gradient-to-b from-latest-msg-s to-latest-msg-e">
      

      {/* [1] */}
      <div className="indicator profile w-36 h-12 basis-1/6">
        <Image
          alt={sender.profileImage.alt}
          src={sender.profileImage.src}
          width={45}
          height={45}
        />
        {/* If the player online, the indicator will be green, otherwise red */}
        {sender.isOnline ? (
          <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-7 top-6"></span>
        ) : (
          <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-7 top-6"></span>
        )}
      </div>
      

      {/* [2] */}
      <div className="flex flex-col overflow-y-hidden basis-4/6">
        <span className="font-saira-condensed text-main-text font-light truncate ...">{sender.name}</span>
        <p className="text-sm font-saira-condensed font-thin overflow-y-hidden text-dimmed-text truncate">{messageContent}</p>
      </div>

      <div className="text-xs font-saira-condensed font-thin text-dimmed-text basis-1/6">{messageTime}</div>

    </div>
  );
}
