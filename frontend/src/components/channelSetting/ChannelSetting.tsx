"use client";
import ChannelSettingsHeader from "@/components/channelSetting/ChannelSettingsHeader";
import ChannelSettingDetails from "@/components/channelSetting/ChannelSettingsDetail";
import { useContext, useEffect, useState } from "react";
import ChannelAvatarSection from "@/components/channelSetting/ChannelAvatarSection";
import { ChannelsProps } from "@/components/Chat/types";
import { userInformation } from "../Profile/types";
import { AuthContext } from "@/context/AuthProvider";

export default function ChatSetting({
  channelInfo,
}: {
  channelInfo: ChannelsProps;
}) {
  const { user } = useContext(AuthContext);
  const [currectUser, setCurrectUser] = useState<userInformation>();

  useEffect(() => {
    setCurrectUser(user);
  }, []);
  return (
    <div className="w-full h-full flex p-6  ">
      <div className="w-full bg-[#0E1211]  bg-opacity-90 rounded-2xl border-b border-grid-border border-opacity-80 relative">
        <ChannelSettingsHeader />
        <ChannelAvatarSection
          channelCreater={currectUser?.name!}
          channelName={channelInfo.channelName}
        />
        <hr className="mx-20 mt-10 mb-10  border-heading-stroke-30" />
        <ChannelSettingDetails channelInfo={channelInfo} />
      </div>
    </div>
  );
}
