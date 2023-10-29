import Image from "next/image";
import { MessagesProps } from "../../../../types";
import { activateClickedFriend } from "../../../../../../context/store";

// const extractRealTime = (time: String) => {
//   console.log("Time befor splitting =>", time);
//   const newTime = time.split("T");
//   console.log("After split => ", newTime);
//   const date = new Date(newTime[0] + " " + newTime[1]);
//   const hours = date.getHours();
//   const minutes = date.getMinutes();

//   console.log("hours => ", hours);
//   console.log("minutes => ", minutes);

//   return `${hours} h:${minutes}m`;
// };

export default function ChatMessage({ message }: { message: MessagesProps }) {
  const setActiveFriend = activateClickedFriend(
    (state) => state.setActiveFriend
  );

  return (
    <div
      className="flex flex-row justify-center items-center w-80 h-20 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer
						bg-gradient-to-b from-latest-msg-s to-latest-msg-e"
      onClick={() => {
        setActiveFriend(message.sender.login);
      }}
    >
      {/**
       * [1]: The indicator is a div that contains the profile image of the sender and a small circle that indicates
       * whether the sender is online or not.
       */}
      <div className="indicator w-36 h-12 basis-1/6 -mt-4">
        <Image
          alt={message.sender.name}
          src={"/av1.svg"}
          // src={message.sender.avatar}
          width={45}
          height={45}
        />
        {/* If the player online, the indicator will be green, otherwise red */}
        {message.sender.isOnline ? (
          <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-7 top-6"></span>
        ) : (
          <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-7 top-6"></span>
        )}
      </div>

      {/**
       * [2]: The sender name and the message content.
       * */}
      <div className="flex flex-col overflow-y-hidden basis-4/6">
        <span className="font-saira-condensed text-main-text font-light truncate ...">
          {message.sender.name}
        </span>
        <p className="text-sm font-saira-condensed font-thin overflow-y-hidden text-dimmed-text truncate">
          {message.content}
        </p>
      </div>

      {/**
       * [3]: The message time.
       * */}
      <div className="text-xs font-saira-condensed font-thin text-dimmed-text basis-1/6 -mt-12 -mr-4">
        {message.createdAt}
      </div>
    </div>
  );
}
