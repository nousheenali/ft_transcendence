import { useEffect, useState } from "react";
import { ChannelsProps } from "../../types";
import Channel from "./ChannelBox";

/**============================================================================================*/

export default function PublicChannels(data: { channels: ChannelsProps[] }) {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (data.channels) {
      setLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!data.channels) return <p>No channels data</p>;
  return (
    <div className="flex flex-col w-full h-3/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {data.channels.map((OneChannel: ChannelsProps, index: integer) => (
        <div key={index}>
          <Channel key={index} channel={OneChannel} />
        </div>
      ))}
    </div>
  );
}
