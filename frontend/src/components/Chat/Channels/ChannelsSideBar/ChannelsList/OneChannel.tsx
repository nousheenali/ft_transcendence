"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import React, { useState, useCallback, useRef } from "react";
import { Socket } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ChannelsProps } from "../../../types";
import { activateClickedChannel, useChatSocket } from "@/context/store";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { Input, Modal, Button } from "react-daisyui";

/** ======================================================================================================= */
/**
 **╭── 🟣
 **├ 👇 pressing the button will leave the channel, by deleting the relation between the user and the channel.
 **└── 🟣
 **/

const Header = () => {
  return (
    <>
      <div className="flex flex-row justify-center items-center space-x-2 h-[30px] bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke p-5">
        <div className="font-saira-condensed font-bold text-xl text-main-text">
          <h1>Password Field</h1>
        </div>
        <div>
          <Image
            src={"./chat/user-cirlce-add.svg"}
            width={25}
            height={25}
            // className="inline-block ml-2"
            alt="Game Status"
          />
        </div>
      </div>
    </>
  );
};

const ModalBody = ({
  type,
  channelPassword,
  setChannelPassword,
  handleToggle,
  icon,
}: {
  type: string;
  channelPassword: string;
  setChannelPassword: React.Dispatch<React.SetStateAction<string>>;
  handleToggle: () => void;
  icon: string;
}) => {
  return (
    <div className="flex flex-col w-full component-preview py-8 items-center justify-center gap-2 font-sans ">
      <label className="text-main-text font-bold text-lg text-center">
        Password
      </label>
      {/* input field and hide/show button */}
      <div className="flex flex-row gap-2 pl-6">
        <Input
          type={type}
          value={channelPassword}
          placeholder="Password..."
          onChange={(e) => setChannelPassword(e.target.value)}
          className="bg-heading-fill text-main-text"
        />
        <span
          className="flex justify-around items-center"
          onClick={handleToggle}
        >
          {icon === "eyeOff" ? (
            <AiFillEyeInvisible size={20} color={"white"} />
          ) : (
            <AiFillEye size={20} color="white" />
          )}
        </span>
      </div>
    </div>
  );
};

const LeaveChannelBtn = ({ channel }: { channel: ChannelsProps }) => {
  const { socket } = useChatSocket();
  const { setActiveChannel } = activateClickedChannel();

  return (
    <div
      className="flex flex-row  gap-5 pr-2"
      onClick={() => {
        socket.emit("LeaveChannel", {
          channelName: channel.channelName,
          channelType: channel.channelType,
        });
        toast.warning(`You left ${channel.channelName} channel`, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setActiveChannel({} as ChannelsProps);
      }}
    >
      <Button
        color="ghost"
        className="flex flex-row items-center gap-1 text-dimmed-text font-thin"
      >
        <Image
          alt={"leave channel"}
          src={"./chat/Sign_out_circle_duotone_line.svg"}
          width={30}
          height={30}
        />
      </Button>
    </div>
  );
};

/** ======================================================================================================= */
/**
 **╭── 🟣
 **├ 👇 pressing the button will join the channel, by creating a relation between the user and the channel.
 **└── 🟣
 **/
const handleJoinClick = ({
  channel,
  socket,
  channelPassword,
}: {
  channel: ChannelsProps;
  socket: Socket;
  channelPassword?: string;
}) => {
  if (channel.channelType === "PRIVATE") {
    socket.emit("JoinChannel", {
      channelName: channel.channelName,
      channelType: channel.channelType,
      channelPassword: channelPassword,
    });
  } else if (channel.channelType === "PUBLIC") {
    socket.emit("JoinChannel", {
      channelName: channel.channelName,
      channelType: channel.channelType,
      channelPassword: channelPassword,
    });
    toast.success(`You have joined ${channel.channelName} channel`, {
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
};
/** ----------------------------------------------------------------------------------- **/
const JoinChannelBtn = ({ channel }: { channel: ChannelsProps }) => {
  const { socket } = useChatSocket();

  return (
    <div
      className="flex flex-row  gap-5 pr-2 items-center"
      onClick={() => handleJoinClick({ channel, socket })}
    >
      <Button
        color="ghost"
        className="flex flex-row items-center gap-1 text-dimmed-text font-thin"
      >
        <Image
          alt={"join channel"}
          src={"./chat/user-cirlce-add.svg"}
          width={30}
          height={30}
        />
      </Button>
    </div>
  );
};

/** ======================================================================================================= */
export default function Channel({
  channel,
  isJoined,
}: {
  channel: ChannelsProps;
  isJoined: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);
  const { socket } = useChatSocket();
  const [channelPassword, setChannelPassword] = useState("");
  // define the active channel and the function to set the active channel from the store context of zustand
  // The state of the active channel will change according to the channel that the user clicks on.

  const { setActiveChannel } = activateClickedChannel();
  const [icon, setIcon] = useState("eyeOff");
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setIcon("eye");
      setType("text");
    } else {
      setIcon("eyeOff");
      setType("password");
    }
  };
  // if (channelPassword) setChannelPassword("");
  if (isJoined === false) {
    return (
      <div className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:bg-authGrad-s hover:rounded-2xl">
        <div
          className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer"
          onClick={() => setActiveChannel({} as ChannelsProps)}
        >
          {/* [1] Display the avatar of the channel */}

          <div className="w-36 h-12 basis-1/6 overflow-hidden">
            <Image
              alt={channel.channelName}
              src={"/chat/people.svg"}
              width={37}
              height={37}
            />
          </div>

          {/* [2] Display the name of the channel */}

          <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2 ">
            <span className="font-saira-condensed text-main-text font-light truncate ...">
              {channel.channelName}
            </span>
          </div>
        </div>
        {channel.channelType === "PRIVATE" ? (
          <div className="font-sans">
            <div className="flex flex-row  gap-5 pr-2" onClick={handleShow}>
              <div className="flex flex-row gap-1 text-dimmed-text font-thin">
                <Image
                  alt={"join channel"}
                  src={"./chat/user-cirlce-add.svg"}
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <Modal
              className="overflow-hidden w-[400
                px] h-[300px] m-0 p-0 gap-2 bg-aside-fill-70  border-b-start-game border-b-2 rounded-2xl "
              ref={ref}
            >
              <Modal.Header className="font-bold m-0">
                <Header />
              </Modal.Header>
              <Modal.Body>
                {/* title and input field header */}
                <ModalBody
                  type={type}
                  channelPassword={channelPassword}
                  setChannelPassword={setChannelPassword}
                  handleToggle={handleToggle}
                  icon={icon}
                />
              </Modal.Body>
              <Modal.Actions className="p-0 m-0 flex justify-between">
                <button
                  className="text-start-game font-saira-condensed font-bold text-xl h-18 border-2 border-aside-border rounded-xl p-2 bg-heading-fill hover:bg-[#111417] opacity-90 w-full"
                  onClick={() => {
                    ref.current?.close();
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleJoinClick({ channel, socket, channelPassword });
                    ref.current?.close();
                  }}
                  className="text-start-game font-saira-condensed font-bold text-xl h-18 border-2 border-aside-border rounded-2xl p-2 bg-heading-fill hover:bg-[#111417] opacity-90 w-full"
                >
                  Join Channel
                </button>
              </Modal.Actions>
            </Modal>
          </div>
        ) : (
          <JoinChannelBtn channel={channel} />
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:bg-authGrad-s hover:rounded-2xl">
        <div
          className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer"
          onClick={() => setActiveChannel(channel)}
        >
          {/* [1] Display the avatar of the channel */}

          <div className="w-36 h-12 basis-1/6 overflow-hidden">
            <Image
              alt={channel.channelName}
              src={"/chat/people.svg"}
              width={37}
              height={37}
            />
          </div>

          {/* [2] Display the name of the channel */}

          <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
            <span className="font-saira-condensed text-main-text font-light truncate ...">
              {channel.channelName}
            </span>
          </div>
        </div>

        <LeaveChannelBtn channel={channel} />
      </div>
    );
  }
}

/** ======================================================================================================= */
