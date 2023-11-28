"use client";

import { useContext } from "react";
import ChannelsList from "./ChannelsList/ChannelsList";
import CreateChannel from "./CreateChannel/CreateChannel";
// import UsersSearch from "./ChannelUsers/UsersSearch/UsersSearch";
import UsersList from "./ChannelUsers/UsersList/UsersList";
import ChannelUserHeader from "./ChannelUsers/ChannelUserHeader/ChannelUserHeader";
// import ChannelsSearch from "@/components/Chat/Channels/ChannelsSideBar/ChannelsSearch/ChannelsSearch";
import PublicPrivateBtn from "@/components/Chat/Channels/ChannelsSideBar/PublicPrivateBtn/PublicPrivateBtn";
import { AuthContext } from "@/context/AuthProvider";

//============================================================================================//

export default function ChannelsSideBar() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* <ChannelsSearch /> */}
      <PublicPrivateBtn />
      <CreateChannel userLogin={user.login} />
      <hr className="w-3/4 border-line-break" />
      <ChannelsList />
      <ChannelUserHeader />
      {/* <UsersSearch /> */}
      <UsersList isVisible="visible" />
      <hr className="w-3/4 border-line-break" />
    </>
  );
}

//============================================================================================//
