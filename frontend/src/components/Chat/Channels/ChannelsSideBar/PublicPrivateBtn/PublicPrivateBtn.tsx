import { useChannelType } from "@/context/store";

export default function PublicPrivateBtn() {
  const { activeChannelType, setActiveChannelType } = useChannelType();

  return (
    <div className="w-80 h-11 flex justify-between rounded-xl bg-main-theme text-main-texts font-saira-condensed border-b border-main-yellow">
      <div
        className={`flex flex-row flex-grow h-full justify-center items-center gap-2 rounded-xl hover:cursor-pointer select-none 
						${
              activeChannelType === "Public"
                ? "bg-chat-btn-click border-b border-b-main-yellow border-0"
                : "bg-transparent"
            }`}
        onClick={() => setActiveChannelType("Public")}
      >
        <span className="text-main-text text-xl">Public</span>
      </div>

      <div
        className={`flex flex-row flex-grow h-full justify-center items-center gap-2 rounded-xl hover:cursor-pointer select-none
						${
              activeChannelType === "Private"
                ? "bg-chat-btn-click border-b border-b-main-yellow border-0"
                : "bg-transparent"
            }`}
        onClick={() => setActiveChannelType("Private")}
      >
        <span className="text-main-text text-xl">Private</span>
      </div>
    </div>
  );
}

//============================================================================================//
