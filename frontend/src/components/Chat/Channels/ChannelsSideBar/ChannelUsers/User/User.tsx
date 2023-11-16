import Image from "next/image";
import React, { useState } from "react";
import { BiVolumeMute } from "react-icons/bi";
import { RiUserUnfollowLine } from "react-icons/ri";
import { ChannelUserProps, ChannelsProps } from "../../../../types";
import { userInformation } from "@/components/Profile/types";
import { useChatSocket } from "@/context/store";
import { toast } from "react-toastify";

export default function ChannelUser({
  currentUser,
  user,
  channel,
}: {
  currentUser: userInformation;
  user: ChannelUserProps;
  channel: ChannelsProps;
}) {
  const [muteColor, setMuteColor] = useState("gray");
  const { socket } = useChatSocket();

  /**========================================================================
   *  ❂➤ Handle the mute button click
   *
   */
  const handleMuteClick = () => {
    if (currentUser.id !== channel.createdBy) {
      toast.warn("you are not admin", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    } else if (currentUser.login === user.login)
      toast.warn("you can't mute yourself", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    else if (currentUser.id === channel.createdBy) {
      // ❂➤ Emit the MuteUser event to the server to mute the user
      socket.emit("MuteUser", {
        admin: currentUser.login,
        login: user.login,
        channelName: channel.channelName,
      });

      // ❂➤ Change the mute icon color to green
      setMuteColor((prevColor) =>
        prevColor === "gray" ? "rgba(213, 242, 35, 0.8)" : "gray"
      );
    }
  };

  /**========================================================================
   *  ❂➤ Handle the kick button click
   *
   */
  const handleKickClick = () => {
    if (currentUser.id !== channel.createdBy) {
      toast.warn("you are not admin", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    } else if (currentUser.login === user.login)
      toast.warn("you can't kick yourself", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    else if (currentUser.id === channel.createdBy) {
      // ❂➤ Emit the KickUser event to the server to kick the user
      socket.emit("KickUser", {
        admin: currentUser.login,
        login: user.login,
        channelName: channel.channelName,
      });
    }
  };

  /**========================================================================**/
  return (
    <div className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 ml-6 overflow-hidden hover:cursor-pointer">
      <div className="indicator profile w-36 h-12 basis-1/6 rounded-3xl overflow-hidden relative">
        <div className="rounded-full w-[45px] h-[45px] overflow-hidden border-2 border-main-yellow">
          <Image alt={user.name} src={user.avatar} width={45} height={45} />
        </div>
        {user.isOnline ? (
          <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-7 top-6"></span>
        ) : (
          <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-7 top-6"></span>
        )}
      </div>

      <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
        <span className="font-saira-condensed text-main-text font-light truncate ...">
          {user.name}
        </span>
      </div>

      {/* ====================================================== */}
      <div className="flex flex-row gap-3">
        <div onClick={handleMuteClick}>
          <BiVolumeMute
            className="text-main-text"
            size={20}
            color={muteColor}
          />
        </div>
        <div onClick={handleKickClick}>
          {currentUser.id === channel.createdBy &&
          user.login !== currentUser.login ? (
            <RiUserUnfollowLine
              className="text-main-text"
              size={20}
              color={"#CD5C5C"}
            />
          ) : (
            <RiUserUnfollowLine
              className="text-main-text"
              size={20}
              color={"grey"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
