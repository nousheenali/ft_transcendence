import { ChannelsBtn } from "../../../types";

//============================================================================================//
/**
 * @param {string} activeChannel - The active channel
 * @param {function} setActiveChannel - The function that sets the active channel
 * @returns {JSX.Element} - JSX element that renders the Public and Private buttons
 * @description - This component renders the Public and Private buttons, it is used in the ChannelsSideBar component.
 * It is also responsible for managing the state of the Public and Private buttons, the state is managed by the {activeChannel} state,
 * which is a string that can be either "Public" or "Private". The {activeChannel} state is passed to the PublicPrivateBtn component as a prop
 * and it is used to determine which tab is active and render the appropriate tab. The {activeChannel} state
 * is also used to determine which component to render, the Public component or the Private component.
 * @component
 */
export default function PublicPrivateBtn({
  activeChannelType,
  setActiveChannelType,
}: ChannelsBtn) {
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