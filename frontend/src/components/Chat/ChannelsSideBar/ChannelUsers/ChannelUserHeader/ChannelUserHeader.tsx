import Image from "next/image";

export default function ChannelUserHeader() {
  return (
    <div className="flex flex-row justify-center items-center gap-4 w-80 h-10 bg-chat-btn-click border-b border-b-main-yellow border-0 rounded-xl">
      <span className="font-saira-condensed text-main-text text-xl">Channel Users</span>
      <Image
          alt="friends-icon"
          src="chat/people.svg"
          width={25}
          height={25}
        />
    </div>
  );
}
