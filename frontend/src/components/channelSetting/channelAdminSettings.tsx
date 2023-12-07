import React, { useState, useEffect } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { Button } from "react-daisyui";
import { Socket } from "socket.io-client";
import { ChannelsProps } from "@/components/Chat/types";
import { useChatSocket } from "@/context/store";
import { toast } from "react-toastify";
import Image from "next/image";

/**======================================================================================================**/
export function AddAdmin({
  creator,
  channelInfo,
}: {
  creator: string;
  channelInfo: ChannelsProps;
}) {
  const [newAdmin, setAddedAdmin] = useState<string>("");
  const { socket } = useChatSocket();

  //------------------------------------------------------------------------------------------------------
  const handleAddAdmin = ({
    socket,
    addedAdmin,
    channel,
    addedBy,
  }: {
    socket: Socket;
    addedAdmin: string;
    channel: ChannelsProps;
    addedBy: string;
  }) => {
    console.log("Add admin");
  };
  
  //------------------------------------------------------------------------------------------------
  /**
   **╭── 🟣
   **├ 👇 use effect for enter key
   **└── 🟣
   **/

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleAddAdmin({
          socket: socket,
          addedAdmin: newAdmin,
          channel: channelInfo,
          addedBy: creator,
        });
      }
    };
    // add the event lister only for the element with "add-admin" id.
    const element = document.getElementById("add-admin");
    if (element) element.addEventListener("keydown", listener);
    return () => {
      if (element) element.removeEventListener("keydown", listener);
    };
  }, [newAdmin]);

  //------------------------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col" id="add-admin">
      {/* New Admin Header */}
      <div className="flex flex-row justify-center items-center gap-4 w-full h-10 bg-chat-btn-click border-b border-b-main-yellow border-0 rounded-xl">
        <span className="font-saira-condensed text-main-text text-xl">
          Add New Admin
        </span>
        <Image
          alt="friends-icon"
          src="chat/people.svg"
          width={25}
          height={25}
        />
      </div>

      {/* Input field */}
      <div
        className="flex flex-row py-10 gap-1 text-dimmed-text font-thin hover:cursor-pointer"
        onClick={() => {
          handleAddAdmin({
            socket: socket,
            addedAdmin: newAdmin,
            channel: channelInfo,
            addedBy: creator,
          });
          setAddedAdmin("");
        }}
      >
        <Button color="ghost">
          <IoIosPersonAdd size={30} color={"rgba(213, 242, 35, 0.8)"} />
        </Button>

        <input
          id="add-admin-user-input"
          type="text"
          placeholder="New Admin Name"
          value={newAdmin}
          onChange={(e) => setAddedAdmin(e.target.value)}
          className="border border-main-yellow w-11/12 p-2 bg-box-fill rounded-xl text-main-text font-thin"
        />
      </div>
    </div>
  );
}

/**======================================================================================================**/
