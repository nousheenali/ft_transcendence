import Image from "next/image";
import { ChannelsProps } from "../../../types";
import { activateClickedChannel } from "@/context/store";

export default function ChannelChatBoxHeader() {
  const { activeChannel } = activateClickedChannel();


  if (activeChannel.channelName === "" || activeChannel.channelName === null) return;
  return (
    <div
      className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts 
                   border-b border-main-yellow px-3"
    >
      <Image
        alt={activeChannel.channelName}
        src={"/chat/people.svg"}
        width={65}
        height={65}
      />

      <div className="flex flex-col font-saira-condensed pl-3 pt-5">
        <span className=" text-main-text text-lg font-light">
          {activeChannel.channelName}
        </span>
        {activeChannel.channelType === "PUBLIC" ? (
          <p className="text-dimmed-text font-thin">public</p>
        ) : (
          <p className="text-dimmed-text font-thin">private</p>
        )}
      </div>
    </div>
  );
}
