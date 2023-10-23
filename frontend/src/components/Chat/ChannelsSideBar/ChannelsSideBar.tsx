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

export default function ChannelsSideBar(data: { channels: ChannelsProps[] }) {
  const publicChannels = data.channels.filter(
    (channel) => channel.channelType === "PUBLIC"
  );

  const privateChannels = data.channels.filter(
    (channel) => channel.channelType === "PRIVATE"
  );

  const privateChannelUsers: ChannelUserProps[] = [];

  privateChannels.forEach((channel) => {
    channel.channelMembers.forEach((channelUser) => {
      privateChannelUsers.push(channelUser.user);
    });
  });

  const [activeChannelType, setActiveChannelType] = useState<string>("Public");
  const [activeChannel, setActiveChannel] = useState<ChannelsProps>();

  console.log("activeChannel->[", activeChannel, "]");

  return (
    <>
      <ChannelsSearch />
      <PublicPrivateBtn
        activeChannel={activeChannelType}
        setActiveChannel={setActiveChannelType}
      />
      <CreateChannel />
      <hr className="w-80 border-line-break" />
      {activeChannelType === "Public" && <Channels channels={publicChannels} />}
      {activeChannelType === "Private" && (
        <>
          <Channels channels={privateChannels} />
          {/* <ChannelUserHeader />
          <UsersSearch />
          <ChannelsUsersBox /> */}
        </>
      )}
      <hr className="w-80 border-line-break" />
    </>
  );
}
