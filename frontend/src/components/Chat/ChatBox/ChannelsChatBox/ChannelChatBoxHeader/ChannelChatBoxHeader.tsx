import Image from "next/image";
import { ChosenChannelProps } from "../../../types";

export default function ChannelChatBoxHeader({
  ChannelName,
  ChannelAvatar,
  isPublic,
}: ChosenChannelProps) {
  return (
    <div
      className="w-full h-32 flex flex-row items-center rounded-xl bg-main-theme text-main-texts 
    border-b border-main-yellow px-3"
    >
      <div className="indicator h-31 w-full flex items-center rounded-xl bg-main-theme">
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

      {isPublic === false && (
        <div className="flex flex-row gap-5 px-3">
          <button className="flex flex-row gap-1 text-dimmed-text font-thin ">
            <Image
              alt={"invite"}
              src={"./chat/user-cirlce-add.svg"}
              width={25}
              height={25}
              className="mt-0.5"
            />
            <span className=" text-main-text text-sm font-light">Invite</span>
          </button>
          <button className="flex flex-row gap-1 text-dimmed-text font-thin">
            <Image
              alt={"invite"}
              src={"./chat/Sign_out_circle_duotone_line.svg"}
              width={25}
              height={25}
              className="mt-0.5"
            />
            <span className=" text-main-text text-sm font-light">Leave</span>
          </button>
        </div>
      )}
    </div>
  );
}
