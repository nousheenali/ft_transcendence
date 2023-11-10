"use client";

import ChannelsList from "./ChannelsList/ChannelsList";
import CreateChannel from "./CreateChannel/CreateChannel";
import UsersSearch from "./ChannelUsers/UsersSearch/UsersSearch";
import UsersList from "./ChannelUsers/UsersList/UsersList";
import ChannelUserHeader from "./ChannelUsers/ChannelUserHeader/ChannelUserHeader";
import ChannelsSearch from "@/components/Chat/Channels/ChannelsSideBar/ChannelsSearch/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/Channels/ChannelsSideBar/PublicPrivateBtn/PublicPrivateBtn";
import { useSession } from "next-auth/react";

//============================================================================================//
export default function ChannelsSideBar() {
  const session = useSession();
  return (
    <>
      <ChannelsSearch />
      <PublicPrivateBtn />
      <CreateChannel userName={session?.data?.user?.name!} />
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
