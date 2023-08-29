import Image from "next/image";
import { ChosenChannelProps } from "../../../types";

export default function ChannelChatBoxHeader({
  ChannelName,
  ChannelAvatar,
  isPublic,
}: ChosenChannelProps) {
  return (
    <div
      className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts 
                   border-b border-main-yellow px-3"
    >
      <Image
        alt={ChannelAvatar.alt}
        src={ChannelAvatar.src}
        width={65}
        height={65}
      />

      <div className="flex flex-col font-saira-condensed pl-3 pt-5">
        <span className=" text-main-text text-lg font-light">
          {ChannelName}
        </span>
        {isPublic ? (
          <p className="text-dimmed-text font-thin">public</p>
        ) : (
          <p className="text-dimmed-text font-thin">private</p>
        )}
      </div>
    </div>
  );
}
