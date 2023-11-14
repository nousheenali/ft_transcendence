import Image from "next/image";
import { MdGroupOff } from "react-icons/md";
import { ChannelsProps } from "../../../types";
import { activateClickedChannel } from "@/context/store";

export default function ChannelChatBoxHeader() {
  const { activeChannel } = activateClickedChannel();

  if (activeChannel.channelName === undefined)
    return (
      <div
        className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts 
                 border-b border-main-yellow px-3"
      ></div>
    );
  return (
    <div
      className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts 
                   border-b border-main-yellow px-3"
    >
      <div className="indicator h-31 w-full flex items-center rounded-xl bg-main-theme">
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

      {activeChannel.channelType === "PRIVATE" && (
        <div className="flex flex-row  gap-5 px-3">
          <button className="flex flex-row items-center gap-1 text-dimmed-text font-thin">
            <Image
              alt={"invite"}
              src={"./chat/user-cirlce-add.svg"}
              width={45}
              height={45}
            />
            <span className=" text-main-text text-sm font-light">INVITE</span>
          </button>
        </div>
      )}
    </div>
  );
}
