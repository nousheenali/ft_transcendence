"use client";

import React, { useEffect, useState } from "react";
import { ChannelsProps } from "../types";
import { useSession } from "next-auth/react";
import { activateClickedChannel } from "@/context/store";
import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { getChannelsData } from "../../../../services/channels";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/MsgChannelBtn";
import ChannelsSideBar from "@/components/Chat/Channels/ChannelsSideBar/ChannelsSideBar";
import ChannelsChatBox from "@/components/Chat/Channels/ChannelsChatBox/ChannelsChatBox";

export default function Channels() {
  const session = useSession();
  const login = session.data?.user.login!;
  const [isLoading, setLoading] = useState(true);

  const activeChannel = activateClickedChannel((state) => state.activeChannel);

  const [privateChannels, setPrivateChannels] = React.useState<ChannelsProps[]>(
    []
  );
  const [publicChannels, setPublicChannels] = React.useState<ChannelsProps[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const publicChannels: ChannelsProps[] = await getChannelsData(
        session?.data?.user.login!,
        API_ENDPOINTS.publicChannels
      );
      const privateChannels: ChannelsProps[] = await getChannelsData(
        session?.data?.user.login!,
        API_ENDPOINTS.privateChannels
      );
      setPublicChannels(publicChannels);
      setPrivateChannels(privateChannels);
      setLoading(false);

    };
    fetchData();
  }, [session]);

  if (isLoading)
  return (
    <span className="loading loading-ring loading-lg text-main-yellow"></span>
  );
  
  return (
    <div className="flex w-full h-screen px-4 justify-center">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
        <ChannelsSideBar
          privateChannels={privateChannels}
          publicChannels={publicChannels}
        />
      </div>
      <ChannelsChatBox channel={activeChannel} login={login} />
    </div>
  );
}
