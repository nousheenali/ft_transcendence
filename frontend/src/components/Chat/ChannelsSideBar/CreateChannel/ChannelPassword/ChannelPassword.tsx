import { useChannelCreateValidate, useChannelInfo } from "@/context/store";
import React, { useState } from "react";
import { Input } from "react-daisyui";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
export default function ChannelPasswordTextBox(isPrivate: {
  isPrivate: boolean;
}) {
  const { channelPassword, setChannelPassword } = useChannelInfo();
  const { validPassword, setValidPassword } = useChannelCreateValidate();
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const HandleInput = (e: any) => {
    if (e.target.value.length >= 4) setValidPassword(true);
    else setValidPassword(false);
    if (e.target.value.length > 20) return;
    setChannelPassword(e.target.value);
  };
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <>
      {isPrivate.isPrivate ? (
        <div className="flex flex-row items-center justify-evenly w-full">
          <h1 className="text-main-text font-saira-condensed text-l font-bold">
            Password
          </h1>
          <Input
            type={type}
            value={channelPassword}
            onChange={(e) => {
              HandleInput(e);
            }}
            className="bg-heading-fill w-32 h-8 rounded-xl text-main-text text-sm"
          />
          <span
            className="flex justify-around items-center"
            onClick={handleToggle}
          >
            <Icon className="absolute " icon={icon} size={15} />
          </span>
        </div>
      ) : null}
    </>
  );
}
