import Channel from "../Channel";
import { ChannelsProps } from "../../../types";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelsData } from "../../../../../../services/channels";
import { useSession } from "next-auth/react"

/**============================================================================================*/

export default function PublicChannels(data: {publicChannels: ChannelsProps[]}) {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (data.publicChannels) {
      setLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!data.publicChannels) return <p>No channels data</p>;
  return (
    <div className="flex flex-col w-full h-3/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {
        data.publicChannels.map((OneChannel: ChannelsProps, index: integer) => (
          <div key={index}>
            <Channel
              key={index}
              channel={OneChannel}
            />
          </div>
        ))
      }
    </div>
  );
}