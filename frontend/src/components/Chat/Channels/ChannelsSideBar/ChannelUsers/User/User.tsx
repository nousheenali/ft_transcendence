import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { BiVolumeMute } from "react-icons/bi";
import { RiUserUnfollowLine } from "react-icons/ri";
import { ChannelUserProps, ChannelsProps } from "../../../../types";
import { userInformation } from "@/components/Profile/types";
import { useChatSocket, useReRenderAllState } from "@/context/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-daisyui";
import { getUserMuteStatus } from "../../../../../../../services/user";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";

export default function ChannelUser({
  currentUser,
  user,
  channel,
}: {
  currentUser: userInformation;
  user: ChannelUserProps;
  channel: ChannelsProps;
}) {
  const { socket } = useChatSocket();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const { reRenderAll, setReRenderAll } = useReRenderAllState();

  const modalRef = React.useRef<HTMLDialogElement>(null);
  const handleModalClick = useCallback(() => {
    if (!modalRef.current?.open) modalRef.current?.showModal();
  }, [modalRef]);
  /**========================================================================
   *  🟣🟣 Handle the mute button click
   *
   */
  const handleMuteClick = () => {
    if (currentUser.id !== channel.createdBy) {
      toast.warn("you are not admin", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (currentUser.login === user.login && !isMuted)
      toast.warn("you can't mute yourself", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    else if (currentUser.id === channel.createdBy) {
      // 🟣🟣 Emit the MuteUser event to the server to mute the user
      socket.emit("MuteUser", {
        mutedUser: user.login,
        channelName: channel.channelName,
      });
    }
  };

  /**========================================================================
   *  🟣🟣 Handle the kick button click
   *
   */
  const handleKickClick = () => {
    // 🟣🟣 Check if the current user is the admin of the channel
    //    Cause only the admin can kick users
    if (currentUser.id !== channel.createdBy) {
      toast.warn("you are not admin", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // 🟣🟣 Check if the current user is the user to be kicked
    } else if (currentUser.login === user.login)
      toast.warn("you can't kick yourself", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    else if (currentUser.id === channel.createdBy) {
      // 🟣🟣 Emit the KickUser event to the server to kick the user
      handleModalClick();
    }
  };

  /**========================================================================**/

  /**
   **╭── 🟣
   **├ 👇 use effect to get the user state in the channel, if he is muted or not
   **└── 🟣
   **/

  useEffect(() => {
    if (
      user &&
      channel &&
      currentUser &&
      channel.channelName !== undefined &&
      channel.channelName !== ""
    ) {
      try {
        const fetchData = async () => {
          const isUserMuted: boolean = await getUserMuteStatus(
            user.login,
            API_ENDPOINTS.isUserMuted + channel.channelName + "/"
          );
          setIsMuted(isUserMuted);
        };
        fetchData();
        if (reRenderAll) setReRenderAll(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, channel, currentUser, reRenderAll]);

  /**========================================================================**/
  return (
    <div className="flex flex-row justify-center items-center w-auto h-14 rounded-xl px-1 py-1 ml-6 mr-3 overflow-hidden hover:cursor-pointer hover:bg-authGrad-s hover:rounded-2xl">
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
            color={isMuted ? "rgba(213, 242, 35, 0.8)" : "grey"}
          />
        </div>

        {/* ====================================================== */}
        <div onClick={handleKickClick}>
          <RiUserUnfollowLine
            className="text-main-text"
            size={20}
            color={
              currentUser.id === channel.createdBy &&
              user.login !== currentUser.login
                ? "#CD5C5C"
                : "grey"
            }
          />
          {/* ======================================================
           * Pop up modal to confirm the kick action
           * =======================================================*/}
          <Modal
            ref={modalRef}
            className="bg-grid-bg border border-main-yellow rounded-xl p-4 text-main-text font-saira-condensed"
          >
            <Modal.Header className="flex items-center justify-center font-bold text-warning">
              Sure!!
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to kick {""}
              <span className="font-bold">( {user.name} )</span> from the
              channel?
            </Modal.Body>
            <Modal.Actions className="flex justify-evenly">
              <Button
                color="ghost"
                className="bg-box-fill text-white border-main-yellow"
                onClick={() => {
                  modalRef.current?.close();
                }}
              >
                NO
              </Button>

              <Button
                color="ghost"
                className="bg-box-fill text-warning border-main-yellow"
                onClick={() => {
                  socket.emit("KickUser", {
                    admin: currentUser.name,
                    kickedUserlogin: user.login,
                    channelName: channel.channelName,
                    channelType: channel.channelType,
                  });
                  toast.success("user kicked successfully", {
                    position: "top-center",
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  modalRef.current?.close();
                }}
              >
                YES
              </Button>
            </Modal.Actions>
          </Modal>
          {/* ====================================================== */}
        </div>
      </div>
    </div>
  );
}
