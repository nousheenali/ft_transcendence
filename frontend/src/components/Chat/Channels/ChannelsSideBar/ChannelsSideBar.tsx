"use client";

import ChannelsList from "./ChannelsList/ChannelsList";
import CreateChannel from "./CreateChannel/CreateChannel";
import UsersSearch from "./ChannelUsers/UsersSearch/UsersSearch";
import UsersList from "./ChannelUsers/UsersList/UsersList";
import ChannelUserHeader from "./ChannelUsers/ChannelUserHeader/ChannelUserHeader";
import ChannelsSearch from "@/components/Chat/Channels/ChannelsSideBar/ChannelsSearch/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/Channels/ChannelsSideBar/PublicPrivateBtn/PublicPrivateBtn";

//============================================================================================//
export default function ChannelsSideBar() {
  return (
    <>
      <ChannelsSearch />
      <PublicPrivateBtn />
      <CreateChannel />
      <hr className="w-3/4 border-line-break" />
      <ChannelsList />
      <ChannelUserHeader />
      <UsersSearch />
      <UsersList />
      <hr className="w-3/4 border-line-break" />
    </>
  );
}

//============================================================================================//
