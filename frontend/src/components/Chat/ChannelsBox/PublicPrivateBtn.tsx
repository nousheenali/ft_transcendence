import { ChannelsBtn } from "../types";
import Image from "next/image";

export default function PublicPrivateBtn({
	activeChannel,
  setActiveChannel,
}: ChannelsBtn) {
  return (
    <div className="w-80 h-11 flex justify-between rounded-xl bg-main-theme text-main-texts font-saira-condensed border-b border-main-yellow">
      <div
        className={`flex flex-row flex-grow h-full justify-center items-center gap-2 rounded-xl hover:cursor-pointer select-none 
                      ${
                        activeChannel === "Public"
                          ? "bg-chat-btn-click border-b border-b-main-yellow border-0"
                          : "bg-transparent"
                      }`}
        onClick={() => setActiveChannel("Public")}
      >
        <span className="text-main-text text-xl">Public</span>
        <Image
          alt="messages-icon"
          src="chat/message-notif.svg"
          width={25}
          height={25}
        />
      </div>

      <div
        className={`flex flex-row flex-grow h-full justify-center items-center gap-2 rounded-xl hover:cursor-pointer select-none
                      ${
                        activeChannel === "Private"
                          ? "bg-chat-btn-click border-b border-b-main-yellow border-0"
                          : "bg-transparent"
                      }`}
        onClick={() => setActiveChannel("Private")}
      >
        <span className="text-main-text text-xl">Private</span>
        <Image
          alt="messages-icon"
          src="chat/people.svg"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
}
