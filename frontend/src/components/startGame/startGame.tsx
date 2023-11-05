import React, { useCallback, useRef } from "react";
import { Button, Dropdown, Input, Modal } from "react-daisyui";
import Image from "next/image";
import QueueAndInvite from "./queue_invite";
import CustomizeGame from "./customizeGame";
import Header from "./Header";
import { useRouter } from "next/navigation";

export default function StartGameCustomize() {
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const router = useRouter();
  const openGame = () => {
    router.push("/game");
    // router.push({ pathname: "/game", query: { key: Math.random() } });
    // const randomKey = Math.random();
    // router.push(`/game?key=${randomKey}`);
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
        className="overflow-hidden w-[367px] h-[510px] m-0 p-0 gap-0 bg-aside-fill-70  border-b-start-game border-b-2 rounded-2xl "
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
            <QueueAndInvite />
          </div>
        </Modal.Body>

        <Modal.Actions className="flex items-center justify-center mt-2 ">
          <button
            onClick={openGame}
            className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx"
          >
            Start Game
          </button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
