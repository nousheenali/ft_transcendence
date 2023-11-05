import Image from "next/image";
import { MessageSenderProps } from "../../../types";

/**
 * A component that renders the header of the FriendsChatBox component, it receives the following props:
 *
 * {senderName} is a string that represents the name of the sender
 * {senderAvatar} is an object that contains the following properties:
 *  {alt} is a string that represents the alt attribute of the profile image
 * {src} is a string that represents the src attribute of the profile image
 * {isOnline} is a boolean that represents whether the sender is online or not
 *
 * ====================================================================================================
 * | NOTE: |
 * ====================================================================================================
 * all of the above props are received from the state of the clicked message, so if you clicked on certain
 * message, the state of the clicked message will be passed to the FriendsChatBox component and then the
 * FriendsChatBoxHeader component will receive the friend name, avatar and online status from the state of
 * the clicked message.
 */
export default function FriendsChatBoxHeader({
  senderName,
  senderAvatar,
  isOnline,
}: MessageSenderProps) {
  return (
    <div
      className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts 
                   border-b border-main-yellow px-3"
    >
      <div className="indicator px-1">
        <Image
          alt={senderAvatar.alt}
          src={senderAvatar.src}
          width={65}
          height={65}
        />
        {/* If the player online, the indicator will be green, otherwise red */}
        {isOnline ? (
          <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-12 top-11"></span>
        ) : (
          <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-12 top-11"></span>
        )}
      </div>
      <div className="flex flex-col font-saira-condensed pl-3 pt-5">
        <span className=" text-main-text text-lg font-light">{senderName}</span>
        {isOnline ? (
          <p className="text-dimmed-text font-thin">online</p>
        ) : (
          <p className="text-dimmed-text font-thin">offline</p>
        )}
      </div>
    </div>
  );
}
