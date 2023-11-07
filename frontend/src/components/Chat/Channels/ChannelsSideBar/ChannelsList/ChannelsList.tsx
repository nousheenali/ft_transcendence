import Channel from "./OneChannel";
import { useSession } from "next-auth/react";
import { ChannelsProps } from "../../../types";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelsData } from "../../../../../../services/channels";
import { useChannelType, activateClickedChannel } from "@/context/store";
/**============================================================================================*/

export default function Channels() {
  const session = useSession();
  const [isLoading, setLoading] = useState(true);
  const { activeChannelType } = useChannelType();
  const { setActiveChannel } = activateClickedChannel();
  const [publicChannels, setPublicChannels] = useState<ChannelsProps[]>([]);
  const [privateChannels, setPrivateChannels] = useState<ChannelsProps[]>([]);

  /**
   **╭── 🌼
   **├ 👇 Fetch the private and public channels data from the database
   **└── 🌼
   **/

  useEffect(() => {
    const fetchData = async () => {
      const publicChannels: ChannelsProps[] = await getChannelsData(
        session?.data?.user.login!,
        API_ENDPOINTS.publicChannels
      );
      setPublicChannels(publicChannels);

      const privateChannels: ChannelsProps[] = await getChannelsData(
        session?.data?.user.login!,
        API_ENDPOINTS.privateChannels
      );
      setPrivateChannels(privateChannels);
      setLoading(false);
    };
    fetchData();
  }, [session]);

  /**
   **╭── 🌼
   **├ 👇 Activate the chat with the first channel in the list according to the channel type
   **└── 🌼
   **/
  useEffect(() => {
    if (activeChannelType === "Public" && publicChannels.length > 0) {
      setActiveChannel(publicChannels[0]);
    }
    if (activeChannelType === "Private" && privateChannels.length > 0) {
      setActiveChannel(privateChannels[0]);
    }
  }, [privateChannels, publicChannels, activeChannelType]);

  /**
   **╭── 🌼
   **├ 👇 Show the loading spinner while fetching the channels data
   **└── 🌼
   **/
  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );

  /**
   **╭── 🌼
   **├ 👇 Render the channels list according to the channel type
   **└── 🌼
   **/

  return (
    <div className="flex flex-col w-full h-2/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {activeChannelType === "Private" &&
        privateChannels.map((OneChannel: ChannelsProps, index: integer) => (
          <div key={index}>
            <Channel key={index} channel={OneChannel} />
          </div>
        ))}
      {activeChannelType === "Public" &&
        publicChannels.map((OneChannel: ChannelsProps, index: integer) => (
          <div key={index}>
            <Channel key={index} channel={OneChannel} />
          </div>
        ))}
    </div>
  );
}
