import ChannelChat from "./ChannelChat/ChannelChat";
import { AuthContext } from "@/context/AuthProvider";
import { activateClickedChannel } from "@/context/store";
import { getUserData } from "../../../../../services/user";
import { userInformation } from "@/components/Profile/types";
import React, { useState, useEffect, useContext } from "react";
import { API_ENDPOINTS } from "../../../../../config/apiEndpoints";
import SendMessageBox from "../../ChatBox/SendMessageBox/SendMessageBox";
import ChannelChatBoxHeader from "./ChannelChatBoxHeader/ChannelChatBoxHeader";

export default function ChannelsChatBox() {
  const { activeChannel } = activateClickedChannel();

  if (activeChannel.channelName === "")
    return (
      <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col justify-between border-b border-main-yellow bg-box-fill rounded-xl"></div>
    );
  return (
    <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col justify-between border-b border-main-yellow bg-box-fill rounded-xl">
      <ChannelChatBoxHeader />
      <ChannelChat />
      <SendMessageBox receiver={activeChannel} />
    </div>
  );
}
