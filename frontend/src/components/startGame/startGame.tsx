import React, { useCallback, useContext, useRef, useState } from "react";
import { Button, Dropdown, Input, Modal } from "react-daisyui";
import Image from "next/image";
import QueueAndInvite from "./queue_invite";
import CustomizeGame from "./customizeGame";
import Header from "./Header";
import { useRouter } from "next/navigation";
import { useGameState, useSocket } from "@/context/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData } from "../../services/user";
import { sendNotification } from "../../services/friends";
import { Content } from "../notificationIcon/types";
import { AuthContext } from "@/context/AuthProvider";

export default function StartGameCustomize() {
  const { currentSocket } = useSocket();
  const { user } = useContext(AuthContext);
  const userName = user.login!;
  const ref = useRef<HTMLDialogElement>(null);
  const { invitee, isQueue, inviter, setIsQueue, setInviter, setInvitee } =
    useGameState();
  const [isFriend, setIsFriend] = useState(false);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
    setInviter("Default");
    setInvitee("Default");
  }, [ref]);

  const router = useRouter();

  const printWarning = () => {
    toast.warning("Please select a friend to invite");
  };

  const FetchUserData = async () => {
    let result: any = await getUserData(userName, "/friends/allFriends/");
    const isFriend = result?.map((item: any) => item.login === invitee);
    setIsFriend(isFriend);
    return isFriend;
  };

  const inviteAndJoin = async () => {
    setIsQueue(false);
    if (invitee !== "Default") {
      const isFriendRes = await FetchUserData();
      if (isFriendRes) {
        setInviter(userName);
        sendNotification(
          userName,
          invitee,
          Content.GameInvite_Recieved,
          currentSocket
        ); // send notification to friend
        router.push("/game");
      } else {
        printWarning();
      }
    } else {
      printWarning();
    }
    // router.push("/game");
    // router.push({ pathname: "/game", query: { key: Math.random() } });
    // const randomKey = Math.random();
    // router.push(`/game?key=${randomKey}`);
  };
  const joinQueue = () => {
    setIsQueue(true);
    router.push("/game");
  };
  return (
    <div className="flex items-center justify-center p-4 mb-6">
      <button
        className="text-start-game font-saira-condensed font-bold text-xl h-18 w-screen border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx-4"
        onClick={handleShow}
      >
        Start Game
      </button>
      <Modal
        className="overflow-hidden w-[367px] h-[410px] m-0 p-0 gap-0 bg-aside-fill-70  border-b-start-game border-b-2 rounded-2xl "
        ref={ref}
      >
        {/* Header */}
        <Modal.Header className="font-bold m-0">
          <Header />
        </Modal.Header>
        <Modal.Body className="m-0 py-2">
          {/* customize game section */}
          <div className="flex flex-col gap-2">
            <CustomizeGame />
            {/* join queue or invite section */}
            {/* <QueueAndInvite /> */}
          </div>
        </Modal.Body>

        <Modal.Actions className="flex items-center justify-center mt-2 ">
          {invitee === "Default" ? (
            <button
              onClick={joinQueue}
              className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx"
            >
              Join Queue
            </button>
          ) : (
            <button
              onClick={inviteAndJoin}
              className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx"
            >
              Invite & Start
            </button>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
