import Image from "next/image";
import { MsgChannelBtnProps } from "../types";

/**
 * A component that uses the {activeTab} state to determine which tab is active
 * and render the appropriate tab. it is also using the {setActiveTab} state to
 * change the activeTab state when the user clicks on the tab.
 *
 * {activeTab} is a string that can be either "Messages" or "Channels"
 * {setActiveTab} is a function that takes a string as an argument and sets the activeTab state to that string
 *
 * both are received as props from the Chat component (frontend/src/app/(app)/chat/page.tsx).
 */

export default function MsgChannelBtn({
  activeTab,
  setActiveTab,
}: MsgChannelBtnProps) {
  return (
    <div className="w-full h-11 flex justify-between rounded-xl bg-main-theme text-main-texts font-saira-condensed border-b border-main-yellow">
      <div
        className={`flex flex-row flex-grow h-full justify-center items-center gap-2 rounded-xl hover:cursor-pointer select-none 
                      ${
                        activeTab === "Messages"
                          ? "bg-chat-btn-click border-b border-b-main-yellow border-0"
                          : "bg-transparent"
                      }`}
        onClick={() => setActiveTab("Messages")}
      >
        <span className="text-main-text text-xl">Messages</span>
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
                        activeTab === "Channels"
                          ? "bg-chat-btn-click border-b border-b-main-yellow border-0"
                          : "bg-transparent"
                      }`}
        onClick={() => setActiveTab("Channels")}
      >
        <span className="text-main-text text-xl">Channels</span>
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
