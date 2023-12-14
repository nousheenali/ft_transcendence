import Image from "next/image";
import { userInformation } from "@/components/Profile/types";
import { Drawer, Menu } from "react-daisyui";
import { sendNotification } from "../../../../../services/friends";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGameState,
  useSocket,
  useSettingToggleVisiblity,
} from "@/context/store";
import { Content } from "@/components/notificationIcon/types";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
import { useContext, useCallback, useEffect, useState } from "react";
import FriendDashBoard from "@/components/Chat/Friends/FriendsChatBox/FriendsChatBoxHeader/FriendDashBoard";
import InvitaionGameCustomize from "@/components/startGame/startInvitedGame";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import axios from "axios";

/**======================================================================================================**/
export default function FriendsChatBoxHeader({
  friend,
}: {
  friend: userInformation | undefined;
}) {
  const { setIsQueue, setInviter, setInvitee } = useGameState();
  const { currentSocket } = useSocket();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const { isVisible, setIsVisible } = useSettingToggleVisiblity();
  const toggleVisible = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const handleInviteClick = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}${API_ENDPOINTS.getUserbyLogin}` +
          friend!.login,
        { withCredentials: true }
      );
      if (response.data.inAGame == false) {
        inviteAndJoin();
      } else {
        toast.error(`User ${friend?.login!} is in game`, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      // ---------------------------------------------------------------------------------
    } catch (error) {
      console.log(error);
    }
  };

  const inviteAndJoin = () => {
    setIsQueue(false);
    setInviter(user.login!);
    setInvitee(friend?.login!);

    sendNotification(
      user.login,
      friend?.login!,
      Content.GameInvite_Recieved,
      currentSocket
    );
    router.push("/game");
    toast.success(`Invited ${friend?.login!} Successfully`, {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  if (!friend) return null;
  return (
    <div className="indicator w-full h-32 flex justify-between items-center rounded-xl bg-main-theme text-main-texts border-b border-main-yellow px-3">
      <div className="flex  items-center ">
        <div className="indicator px-1 relative">
          <Drawer
            end={true}
            open={isVisible}
            onClickOverlay={toggleVisible}
            side={
              <Menu className="p-3 h-full w-2/4 text-base-content flex justify-center">
                <FriendDashBoard />
              </Menu>
            }
            style={{ zIndex: 1000 }}
          >
            <div
              className="rounded-full w-[65px] h-[65px] overflow-hidden border-2 border-main-yellow"
              onClick={toggleVisible}
            >
              <Image
                alt={friend.name}
                src={friend.avatar}
                width={65}
                height={65}
              />
            </div>
            {/* If the player is online, the indicator will be green; otherwise, red */}
            {friend.isOnline ? (
              <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-12 top-11"></span>
            ) : (
              <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-12 top-11"></span>
            )}
          </Drawer>
        </div>
        <div className="flex flex-col font-saira-condensed pl-3 pt-5">
          <span className="text-main-text text-lg font-light">
            {friend.name}
          </span>
          {friend.isOnline ? (
            <p className="text-dimmed-text font-thin">online</p>
          ) : (
            <p className="text-dimmed-text font-thin">offline</p>
          )}
        </div>
      </div>
      {/* [3]
      invite user to plat a game button
      in the chat box header
       */}
      {/* ---------------------------------------------------------------------------------- */}
      {friend.isOnline && (
        <div className="flex flex-row justify-center items-center basis-1/6">
          <InvitaionGameCustomize
            handleInviteClick={handleInviteClick}
            eventNames="INVITE"
          />
        </div>
      )}
      {/* ---------------------------------------------------------------------------------- */}
    </div>
  );
}

/**======================================================================================================**/
