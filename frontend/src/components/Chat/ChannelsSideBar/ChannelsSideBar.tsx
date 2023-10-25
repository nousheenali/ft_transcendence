"use client";

import React, { useState } from "react";
import ChannelsSearch from "@/components/Chat/ChannelsSideBar/ChannelsSearch/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/ChannelsSideBar/PublicPrivateBtn/PublicPrivateBtn";
import Channels from "./Channels/Channels";
import ChannelUserHeader from "./ChannelUsers/ChannelUserHeader/ChannelUserHeader";
import UsersSearch from "./ChannelUsers/UsersSearch/UsersSearch";
import ChannelsUsersBox from "./ChannelUsers/ChannelsUsersBox/ChannelsUsersBox";
import CreateChannel from "./CreateChannel/CreateChannel";
import { ChannelsProps, ChannelUserProps } from "../types";
import { activateClickedChannel } from "@/context/store";

export default function ChannelsSideBar(data: { channels: ChannelsProps[] }) {
  const publicChannels = data.channels.filter(
    (channel) => channel.channelType === "PUBLIC"
  );

  const privateChannels = data.channels.filter(
    (channel) => channel.channelType === "PRIVATE"
  );

  const [activeChannelType, setActiveChannelType] = useState<string>("Public");

  // ⚡ define the active channel and the function to set the active channel from the store context of zustand
  const activeChannel = activateClickedChannel((state) => state.activeChannel);
  const setActiveChannel = activateClickedChannel(
    (state) => state.setActiveChannel
  );

  //  ⚡ Extract users from the active private channel
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
        activeChannel={activeChannelType}
        setActiveChannel={setActiveChannelType}
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
