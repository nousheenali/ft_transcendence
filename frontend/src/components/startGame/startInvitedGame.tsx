import React, { useCallback, useContext, useRef, useState } from "react";
import { Button, Modal } from "react-daisyui";
import Header from "./Header";
import { useGameState, useSocket } from "@/context/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationItems } from "../notificationIcon/types";
import { AuthContext } from "@/context/AuthProvider";
import CustomizeInvitationGame from "./InvitiationCustomize";
import { IoGameController } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

export default function InvitaionGameCustomize({
  handleInviteClick,
  eventNames,
  acceptGameInvite,
  item,
}: {
  handleInviteClick: () => void;
  eventNames: string;
  acceptGameInvite?: (notifId: NotificationItems) => void;
  item?: NotificationItems;
}) {
  const { user } = useContext(AuthContext);
  const ref = useRef<HTMLDialogElement>(null);
  const { invitee, isQueue, inviter, setIsQueue, setInviter, setInvitee } =
    useGameState();
  const handleShow = useCallback(() => {
    ref.current?.showModal();
    setInviter("Default");
    setInvitee("Default");
  }, [ref]);

  return (
    <div className="flex items-center justify-center p-0 ">
      {eventNames === "INVITE" ? (
        <Button color="ghost" className="flex flex-row" onClick={handleShow}>
          <p>{eventNames}</p>
          <IoGameController size={25} color={"rgba(213, 242, 35, 0.8)"} />
        </Button>
      ) : (
        <button
          onClick={handleShow}
          className="hover:bg-heading-fill p-2 rounded-full "
        >
          <TiTick className="" color="green" size={30} />
        </button>
      )}
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
            <CustomizeInvitationGame />
          </div>
        </Modal.Body>

        <Modal.Actions className="flex items-center justify-center mt-2 ">
          {eventNames === "INVITE" ? (
            <button
              onClick={handleInviteClick}
              className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx"
            >
              {eventNames}
            </button>
          ) : (
            <button
              onClick={() => acceptGameInvite!(item!)}
              className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx"
            >
              {eventNames}
            </button>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
