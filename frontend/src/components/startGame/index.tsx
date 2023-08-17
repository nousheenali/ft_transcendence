import React, { useCallback, useRef } from "react";
import { Button, Dropdown, Input, Modal } from "react-daisyui";
import Image from "next/image";
import QueueAndInvite from "./queue_invite";
import CustomizeGame from "./customizeGame";
import Header from "./Header";


export default function StartGameCustomize() {
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);
  return (
    <div className="flex items-center justify-center p-4 mb-6">
      <button
        className="text-start-game font-saira-condensed font-bold text-xl h-18 w-screen border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx-4"
        onClick={handleShow}
      >
        Start Game
      </button>
      <Modal
        className="w-[1000px] h-[900px] m-0 p-0 border-b-start-game bg-aside-fill-70 border-b-2 rounded-2xl"
        ref={ref}
      >
        {/* Header */}
      <Header />
        <Modal.Body>
          {/* customize game section */}
          <div className="flex flex-col gap-12">
          <CustomizeGame />
            {/* join queue or invite section */}
            <QueueAndInvite />
          </div>
        </Modal.Body>

        <Modal.Actions className="flex items-center justify-center mt-16 ">
          <button className="text-start-game font-saira-condensed font-bold text-xl h-18 w-60 border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx">
            Start Game
          </button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
