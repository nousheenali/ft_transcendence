import Image from "next/image";
import { ChannelsProps } from "../../../types";

export default function ChannelChatBoxHeader(data: { channel: ChannelsProps }) {
  return (
    <div
      className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts 
                   border-b border-main-yellow px-3"
    >
      <Image
        alt={data.channel.channelName}
        src={"/chat/people.svg"}
        width={65}
        height={65}
      />

      <div className="flex flex-col font-saira-condensed pl-3 pt-5">
        <span className=" text-main-text text-lg font-light">
          {data.channel.channelName}
        </span>
        {data.channel.channelType === "PUBLIC" ? (
          <p className="text-dimmed-text font-thin">public</p>
        ) : (
          <p className="text-dimmed-text font-thin">private</p>
        )}
      </div>
    </div>
  );
}
