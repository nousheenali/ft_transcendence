"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect, useContext } from "react";
import ChannelsList from "./ChannelsList/ChannelsList";
import { activateClickedChannel } from "@/context/store";
import CreateChannel from "./CreateChannel/CreateChannel";
import { ChannelsProps, ChannelUserProps } from "../../types";
import UsersSearch from "./ChannelUsers/UsersSearch/UsersSearch";
import { API_ENDPOINTS } from "../../../../../config/apiEndpoints";
import { getChannelsData } from "../../../../../services/channels";
import ChannelsUsersBox from "./ChannelUsers/ChannelsUsersBox/ChannelsUsersBox";
import ChannelUserHeader from "./ChannelUsers/ChannelUserHeader/ChannelUserHeader";
import ChannelsSearch from "@/components/Chat/Channels/ChannelsSideBar/ChannelsSearch/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/Channels/ChannelsSideBar/PublicPrivateBtn/PublicPrivateBtn";
import { AuthContext } from "@/context/AuthProvider";


//============================================================================================//
export default function ChannelsSideBar() {
  // const session = useSession();
  const { user } = useContext(AuthContext);
  const [activeChannelType, setActiveChannelType] = useState<string>("Public");
  const activeChannel = activateClickedChannel((state) => state.activeChannel);

  const setActiveChannel = activateClickedChannel(
    (state) => state.setActiveChannel
  );

  const [isLoading, setLoading] = useState(true);

  const privateChannelUsers: ChannelUserProps[] = [];
  if (activeChannel.channelName && activeChannel.channelType === "PRIVATE") {
    activeChannel.channelMembers.forEach((channelUser) => {
      privateChannelUsers.push(channelUser.user);
    });
  }

  // const publicChannelUsers: ChannelUserProps[] = [];
  // if (activeChannel.channelName && activeChannel.channelType === "PUBLIC") {
  //   activeChannel.channelMembers.forEach((channelUser) => {
  //     publicChannelUsers.push(channelUser.user);
  //   });
  // }

  const [privateChannels, setPrivateChannels] = React.useState<ChannelsProps[]>(
    []
  );
  const [publicChannels, setPublicChannels] = React.useState<ChannelsProps[]>(
    []
  );

  // Fetch the private and public channels data from the database
  useEffect(() => {
    const fetchData = async () => {
      const publicChannels: ChannelsProps[] = await getChannelsData(
        user.login!,
        API_ENDPOINTS.publicChannels
      );
      const privateChannels: ChannelsProps[] = await getChannelsData(
        user.login!,
        API_ENDPOINTS.privateChannels
      );
      setPublicChannels(publicChannels);
      setPrivateChannels(privateChannels);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  // Activate the chat box with the first channel in the list according to the channel type
  useEffect(() => {
    if (activeChannelType === "Public" && publicChannels.length > 0) {
      setActiveChannel(publicChannels[0]);
    }
    if (activeChannelType === "Private" && privateChannels.length > 0) {
      setActiveChannel(privateChannels[0]);
    }
  }, [privateChannels, publicChannels, setActiveChannel, activeChannelType]);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );

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
          <ChannelsList channels={publicChannels} />
          {/* <ChannelUserHeader />
          <UsersSearch />
          <ChannelsUsersBox users={publicChannelUsers} /> */}
        </>
      )}
      {activeChannelType === "Private" && (
        <>
          <ChannelsList channels={privateChannels} />
          <ChannelUserHeader />
          <UsersSearch />
          <ChannelsUsersBox users={privateChannelUsers} />
        </>
      )}
      <hr className="w-80 border-line-break" />
    </>
  );
}

//============================================================================================//
