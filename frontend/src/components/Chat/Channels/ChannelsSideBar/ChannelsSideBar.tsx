"use client";

import React, { useState } from "react";
import ChannelsSearch from "@/components/Chat/Channels/ChannelsSideBar/ChannelsSearch/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/Channels/ChannelsSideBar/PublicPrivateBtn/PublicPrivateBtn";
import Channels from "./ChannelsList/ChannelsList";
import ChannelUserHeader from "./ChannelUsers/ChannelUserHeader/ChannelUserHeader";
import UsersSearch from "./ChannelUsers/UsersSearch/UsersSearch";
import ChannelsUsersBox from "./ChannelUsers/ChannelsUsersBox/ChannelsUsersBox";
import CreateChannel from "./CreateChannel/CreateChannel";
import { ChannelsProps, ChannelUserProps } from "../../types";
import { activateClickedChannel } from "@/context/store";

export default function ChannelsSideBar({ privateChannels, publicChannels }: { privateChannels: ChannelsProps[]; publicChannels: ChannelsProps[];}) {

  const [activeChannelType, setActiveChannelType] = useState<string>("Public");
  const activeChannel = activateClickedChannel((state) => state.activeChannel);
  const channelUsers: ChannelUserProps[] = [];
  
  if (activeChannel && activeChannel.channelType === "PRIVATE") {
    activeChannel.channelMembers.forEach((channelUser) => {
      channelUsers.push(channelUser.user);
    });
  }

  return (
    <>
      <ChannelsSearch />
      <PublicPrivateBtn
        activeChannelType={activeChannelType}
        setActiveChannelType={setActiveChannelType}
      />
      <CreateChannel />
      <hr className="w-80 border-line-break" />
      {activeChannelType === "Public" && (
        <>
          <Channels channels={publicChannels} />
        </>
      )}
      {activeChannelType === "Private" && (
        <>
          <Channels channels={privateChannels} />
          <ChannelUserHeader />
          <UsersSearch />
          <ChannelsUsersBox users={channelUsers} />
        </>
      )}
      <hr className="w-80 border-line-break" />
    </>
  );
}
