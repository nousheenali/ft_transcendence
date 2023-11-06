import Image from "next/image";
import { userInformation } from "@/components/Profile/types";
import { activateClickedFriend } from "../../../../../../context/store";

export default function Friend({ friend }: { friend: userInformation }) {
  const setActiveFriend = activateClickedFriend(
    (state) => state.setActiveFriend
  );

  return (
    <div
      className="flex flex-row justify-center items-center w-80 h-14 px-1 py-1 overflow-hidden hover:cursor-pointer"
      onClick={() => {
        setActiveFriend(friend.login);
      }}
    >
      {/* [1] */}
      <div className="indicator profile w-36 h-12 basis-1/6 relative">
        <div className="rounded-full w-[45px] h-[45px] overflow-hidden border-2 border-main-yellow">
          <Image alt={friend.name} src={friend.avatar} width={45} height={45} />
        </div>
        {/* If the player is online, the indicator will be green; otherwise, red */}
        {friend.isOnline ? (
          <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-7 top-6"></span>
        ) : (
          <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-7 top-6"></span>
        )}
      </div>

      <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
        <span className="font-saira-condensed text-main-text font-light truncate ...">
          {friend.name}
        </span>
      </div>
    </div>
  );
}
