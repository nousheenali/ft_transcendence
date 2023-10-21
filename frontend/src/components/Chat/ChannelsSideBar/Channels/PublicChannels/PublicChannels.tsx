import Channel from "../Channel";
import { ChannelsProps } from "../../../types";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelsData } from "../../../../../../services/channels";

import React from "react";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const getPublicChannels = async () => {
  try {
    const response = await fetch(
      `http://localhost:3001${API_ENDPOINTS.getPublicChannels}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default function PublicChannels() {

	const session = await getServerSession(options);

  const [channels, setChannels] = useState<ChannelsProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPublicChannels().then((channels) => {
      setChannels(channels);
      setLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!channels) return <p>No channels data</p>;

  console.log(channels);
  return (
    <div className="flex flex-col w-full h-3/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {/* {channels.map((OneChannel, index) => (
		  <div key={index}>
			console.log(OneChannel)
			<Channel
			  key={index}
			  channel={OneChannel.channel}
			/>
		  </div>
		))} */}
    </div>
  );
}
