import Image from "next/image";
import { userInformation } from "@/components/Profile/types";

export default function FriendsChatBoxHeader({
  friend,
}: {
  friend: userInformation | undefined;
}) {
  if (!friend) return null;
  return (
    <div className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts border-b border-main-yellow px-3">
      <div className="indicator px-1 relative">
        <div className="rounded-full w-[65px] h-[65px] overflow-hidden border-2 border-main-yellow">
          <Image alt={friend.name} src={friend.avatar} width={65} height={65} />
        </div>
        {/* If the player is online, the indicator will be green; otherwise, red */}
        {friend.isOnline ? (
          <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-12 top-11"></span>
        ) : (
          <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-12 top-11"></span>
        )}
      </div>
      <div className="flex flex-col font-saira-condensed pl-3 pt-5">
        <span className="text-main-text text-lg font-light">{friend.name}</span>
        {friend.isOnline ? (
          <p className="text-dimmed-text font-thin">online</p>
        ) : (
          <p className="text-dimmed-text font-thin">offline</p>
        )}
      </div>
    </div>
  );
}
