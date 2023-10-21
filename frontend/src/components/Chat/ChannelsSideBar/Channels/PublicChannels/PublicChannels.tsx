import Channel from "../Channel";
import { ChannelsProps } from "../../../types";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelsData } from "../../../../../../services/channels";
import { useSession } from "next-auth/react"

/**============================================================================================*/
// const getPublicChannels = async () => {
//   try {
//     const response = await fetch(
//       `http://localhost:3001${API_ENDPOINTS.getPublicChannels}`
//     );
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };

/**============================================================================================*/

export default function PublicChannels() {
  // const [channels, setChannels] = useState<ChannelsProps[]>([]);
  // const [isLoading, setLoading] = useState(true);

  const { data: session } = useSession();
  console.log("===========================================")
  console.log("#########The session of the user is###########: [", session?.user.login, "]");
  console.log("===========================================")

  if (session?.user.login) {
    const channels = getChannelsData(session?.user.login, API_ENDPOINTS.getPublicChannels);
    console.log("===========================================")
    console.log("######### The channels are: ###########:");
    console.log(channels);
    console.log("===========================================")
  }
  else {
    console.log("===========================================")
    console.log("######### No channels found ###########:");
    console.log("===========================================")
  }
  // useEffect(() => {
  //   if (session?.user.login) {
  //     getChannelsData(session.user.login, API_ENDPOINTS.getPublicChannels).then((channels) => {
  //       setChannels(channels);
  //       setLoading(false);
  //     });
  //   }, []);

  //   }

  // if (isLoading)
  //   return (
  //     <span className="loading loading-ring loading-lg text-main-yellow"></span>
  //   );
  // if (!channels) return <p>No channels data</p>;

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
