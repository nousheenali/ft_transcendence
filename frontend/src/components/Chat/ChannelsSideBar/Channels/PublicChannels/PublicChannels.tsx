import Channel from "../Channel";
import { ChannelsProps } from "../../../types";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelsData } from "../../../../../../services/channels";
import { useSession } from "next-auth/react"

/**============================================================================================*/

export default function PublicChannels() {
  const [channels, setChannels] = useState<ChannelsProps[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.login) {
      getChannelsData(session.user.login, API_ENDPOINTS.getPublicChannels).then((channel) => {
        setChannels(channels.concat(channel));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }}, []);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!channels) return <p>No channels data</p>;
  console.log(channels);
  return (
    <div className="flex flex-col w-full h-3/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      console.log(channels);
      <h1>channels</h1>;
      {/* {
        channels.map((OneChannel: ChannelsProps, index: integer) => (
          <div key={index}>
            <Channel
              key={index}
              channel={OneChannel.channels}
            />
          </div>
        ))
      } */}
    </div>
  );
}