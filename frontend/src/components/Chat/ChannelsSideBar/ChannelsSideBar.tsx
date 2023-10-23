"use client";

import React, { useState } from "react";
import ChannelsSearch from "@/components/Chat/ChannelsSideBar/ChannelsSearch/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/ChannelsSideBar/PublicPrivateBtn/PublicPrivateBtn";

import Channels from "./Channels/Channels";

import ChannelUserHeader from "./ChannelUsers/ChannelUserHeader/ChannelUserHeader";
import UsersSearch from "./ChannelUsers/UsersSearch/UsersSearch";
import ChannelsUsersBox from "./ChannelUsers/ChannelsUsersBox/ChannelsUsersBox";
import CreateChannel from "./CreateChannel/CreateChannel";
import { ChannelsProps } from "../types";

/**
 * The ChannelsSideBar component is responsible for rendering the ChannelsSideBar part of the Chat page,
 * it is also responsible for managing the state of the ChannelsSideBar part of the Chat page.
 *
 * The state of the ChannelsSideBar part of the Chat page is managed by the {activeChannel} state, which is a string
 * that can be either "Public" or "Private". The {activeChannel} state is passed to the PublicPrivateBtn component as a prop
 * and it is used to determine which tab is active and render the appropriate tab. The {activeChannel} state
 * is also used to determine which component to render, the Public component or the Private component.
 *
 */
export default function ChannelsSideBar(data: { channels: ChannelsProps[] }) {
  const publicChannels = data.channels.filter(
    (channel) => channel.channelType === "PUBLIC"
  );
  const privateChannels = data.channels.filter(
    (channel) => channel.channelType === "PRIVATE"
  );

  const [activeChannel, setActiveChannel] = useState<string>("Public");

  return (
    <>
      <ChannelsSearch />
      <PublicPrivateBtn
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      <CreateChannel />
      <hr className="w-80 border-line-break" />
      {activeChannel === "Public" && (
        <Channels channels={publicChannels} />
      )}
      {activeChannel === "Private" && (
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
