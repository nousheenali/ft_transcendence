import Image from "next/image";
import { AuthContext } from "@/context/AuthProvider";
import { activateClickedChannel, useChatSocket } from "@/context/store";
import { getUserData } from "../../../../../../services/user";
import { userInformation } from "@/components/Profile/types";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { ChannelsProps } from "@/components/Chat/types";
import { Socket } from "socket.io-client";
import { set } from "date-fns";
import { FaGears } from "react-icons/fa6";
import Link from "next/link";
import { Button, Drawer, Menu } from "react-daisyui";
import ChatSetting from "@/components/channelSetting/ChannelSetting";

/**======================================================================================================**/

const handleInviteUser = ({
  socket,
  user,
  channel,
  invitedBy,
}: {
  socket: Socket;
  user: string;
  channel: ChannelsProps;
  invitedBy: string;
}) => {
  socket.emit("InviteUserToChannel", {
    channelName: channel.channelName,
    channelType: channel.channelType,
    invitedUserName: user,
    invitedBy: invitedBy,
  });
};

/**======================================================================================================**/
export default function ChannelChatBoxHeader() {
  const { user } = useContext(AuthContext);
  const { activeChannel } = activateClickedChannel();
  const [invitedUser, setInvitedUser] = useState<string>("");
  const [currectUser, setCurrectUser] = useState<userInformation>();
  const { socket } = useChatSocket();

  //------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (user && user.login) {
      const fetchData = async () => {
        const userData: userInformation = await getUserData(
          user.login,
          API_ENDPOINTS.getUserbyLogin
        );
        setCurrectUser(userData);
      };
      fetchData();
    }
  }, [user, user.login]);

  //------------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 use effect for enter key
   **└── 🟣
   **/
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);
  useEffect(() => {
    if (!activeChannel || !activeChannel.channelName || !currectUser) return;
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleInviteUser({
          socket: socket,
          user: invitedUser,
          channel: activeChannel,
          invitedBy: currectUser!.login,
        });
        setInvitedUser("");
      }
    };
    const element = document.getElementById("invite-user-input");
    if (element) element.addEventListener("keydown", listener);
    return () => {
      if (element) element.removeEventListener("keydown", listener);
    };
  }, [currectUser, activeChannel, invitedUser]);

  if (!activeChannel || !activeChannel.channelName || !currectUser)
    return (
      <div
        className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts 
                 border-b border-main-yellow px-3"
      ></div>
    );

  //------------------------------------------------------------------------------------------------------

  return (
    <div
      className="indicator w-full h-32 flex items-center rounded-xl bg-main-theme text-main-texts 
                   border-b border-main-yellow px-3"
    >
      <div className="indicator h-31 w-full flex items-center rounded-xl bg-main-theme">
        <Image
          alt={activeChannel.channelName}
          src={"/chat/people.svg"}
          width={65}
          height={65}
        />

        <div className="flex flex-col font-saira-condensed pl-3 pt-5">
          <span className=" text-main-text text-lg font-light">
            {activeChannel.channelName}
          </span>

          {activeChannel.channelType === "PUBLIC" ? (
            <p className="text-dimmed-text font-thin">public</p>
          ) : (
            <p className="text-dimmed-text font-thin">private</p>
          )}
        </div>
      </div>

      {/* ================================================================================================= */}
      {activeChannel.channelType === "PRIVATE" &&
        currectUser.id === activeChannel.createdBy && (
          <div className="flex flex-row  gap-5 px-3">
            <div
              className="flex flex-row items-center gap-1 text-dimmed-text font-thin hover:cursor-pointer"
              onClick={() => {
                handleInviteUser({
                  socket: socket,
                  user: invitedUser,
                  channel: activeChannel,
                  invitedBy: currectUser.login,
                });
              }}
            >
              <Image
                alt={"invite"}
                src={"./chat/user-cirlce-add.svg"}
                width={100}
                height={100}
              />
            </div>
            <input
              id="invite-user-input"
              type="text"
              placeholder="User's Name"
              value={invitedUser}
              onChange={(e) => setInvitedUser(e.target.value)}
              className="border border-main-yellow  p-2 bg-box-fill rounded-xl text-main-text font-thin"
            />
            {/* <Link href={`/chat/${activeChannel.id}`}>
              <FaGears size={40} color={"#FFD700"} />
            </Link> */}
            <Drawer
              end={true}
              open={visible}
              onClickOverlay={toggleVisible}
              side={
                <Menu className="p-3 h-full w-2/4 text-base-content flex justify-center">
                  <ChatSetting channelId={activeChannel.id} />
                </Menu>
              }
            >
              <Button color="ghost" onClick={toggleVisible}>
                <FaGears size={40} color={"rgba(213, 242, 35, 0.8)"} />
              </Button>
            </Drawer>
          </div>
        )}
    </div>
  );
}

/**======================================================================================================**/
