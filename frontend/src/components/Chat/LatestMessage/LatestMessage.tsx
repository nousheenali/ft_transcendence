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
      className="flex flex-row justify-evenly w-80 h-16 rounded-md overflow-hidden
						bg-gradient-to-b from-latest-msg-s to-latest-msg-e"
    >
		{/* Friend [Image, Indicator] */}
        <div className="indicator justify-start">
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
	<div className="flex flex-col ">
      <span className="font-saira-condensed">{sender.name}</span>
      <div>{messageContent}</div>
	</div>

    <div className="justify-end">{messageTime}</div>
    </div>
  );
}
