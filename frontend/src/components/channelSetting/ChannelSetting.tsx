"use client";
import SettingDetails from "@/components/Setting/SettingDetails/SettingDetails";
import SettingAvatar from "@/components/Setting/SettingAvatar/SettingAvatar";
import ChannelSettingsHeader from "@/components/channelSetting/ChannelSettingsHeader";
import ChannelSettingDetails from "@/components/channelSetting/ChannelSettingsDetail";
import { useEffect } from "react";
import ChannelAvatarSection from "@/components/channelSetting/ChannelAvatarSection";
import { ChannelsProps } from "@/components/Chat/types";

export default function ChatSetting({ channelId }: { channelId: string }) {
  return (
    <div className="w-full h-full flex p-6  ">
      <div className="w-full bg-[#0E1211]  bg-opacity-90 rounded-2xl border-b border-grid-border border-opacity-80 relative">
        <ChannelSettingsHeader />
        <ChannelAvatarSection
          channelCreater="Sumaiya Fathima"
          channelName={channelId}
        />
        <hr className="mx-20 mt-10 mb-10  border-heading-stroke-30" />
        <ChannelSettingDetails ChannelName="Sumaiya Fathima" />
      </div>
    </div>
  );
}
