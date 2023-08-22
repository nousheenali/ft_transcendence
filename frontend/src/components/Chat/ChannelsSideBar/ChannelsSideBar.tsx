"use client";

import React, { useState } from "react";
import ChannelsSearch from "@/components/Chat/ChannelsSideBar/ChannelsSearch/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/ChannelsSideBar/PublicPrivateBtn/PublicPrivateBtn";

import ChannelUserHeader from "./ChannelUsers/ChannelUserHeader/ChannelUserHeader";
import UsersSearch from "./ChannelUsers/UsersSearch/UsersSearch";
import ChannelsUsersBox from "./ChannelUsers/ChannelsUsersBox/ChannelsUsersBox";

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
export default function ChannelsSideBar() {
  const [activeChannel, setActiveChannel] = useState<string>("Public");

  return (
    <>
      <ChannelsSearch />
      <PublicPrivateBtn
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      <hr className="w-80 border-line-break" />
      {activeChannel === "Public" && 
        <>
          <ChannelUserHeader />
          <UsersSearch />
          <ChannelsUsersBox />
        </>
      }
      {activeChannel === "Private" && <div>Private</div>}
      <hr className="w-80 border-line-break" />
    </>
  );
}

// public channels
// private channels