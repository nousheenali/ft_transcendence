import Channel from "./OneChannel";

import { ChannelsProps } from "../../../types";
import React, { useEffect, useContext, useState } from "react";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { getChannelsData } from "../../../../../../services/channels";
import {
  useChannelType,
  activateClickedChannel,
  useReRenderAllState,
  useReRenderUserState
} from "@/context/store";
import { AuthContext } from "@/context/AuthProvider";


/**============================================================================================*/

export default function Channels() {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const { activeChannelType } = useChannelType();
  const { setActiveChannel } = activateClickedChannel();
  const { reRenderAll, setReRenderAll } = useReRenderAllState();
  const { reRenderUser, setReRenderUser } = useReRenderUserState();

  const [allPrivateChannels, setAllPrivateChannels] = useState<ChannelsProps[]>(
    []
  );
  const [allPublicChannels, setAllPublicChannels] = useState<ChannelsProps[]>(
    []
  );
  const [joinedPublicChannels, setJoinedPublicChannels] = useState<
    ChannelsProps[]
  >([]);
  const [joinedPrivateChannels, setJoinedPrivateChannels] = useState<
    ChannelsProps[]
  >([]);

  /**
   **╭── 🌼
   **├ 👇 Fetch the all the private and public channels data from the database
   **├ 👇 Fetch the private and public channels that the user joined to.
   **└── 🌼
   **/

  useEffect(() => {
    if (user && user.login) {
      const fetchData = async () => {
        const allPrivate: ChannelsProps[] = await getChannelsData(
          user.login!,
          API_ENDPOINTS.allChannels + "PRIVATE/"
        );
        setAllPrivateChannels(allPrivate);

        const allPublic: ChannelsProps[] = await getChannelsData(
          user.login!,
          API_ENDPOINTS.allChannels + "PUBLIC/"
        );
        setAllPublicChannels(allPublic);

        const publicChannels: ChannelsProps[] = await getChannelsData(
          user.login!,
          API_ENDPOINTS.publicChannels
        );
        setJoinedPublicChannels(publicChannels);

        const privateChannels: ChannelsProps[] = await getChannelsData(
          user.login!,
          API_ENDPOINTS.privateChannels
        );
        setJoinedPrivateChannels(privateChannels);

        setLoading(false);
        console.log("reRenderAll before", reRenderAll)
        if (reRenderUser) setReRenderUser(false);
        if (reRenderAll) setReRenderAll(false);
        console.log("reRenderAll after", reRenderAll)
      };
      fetchData();
    }
  }, [user, reRenderUser, reRenderAll]);

  /**
   **╭── 🌼
   **├ 👇 Activate the chat with the first channel in the list according to the joined channel type
   **└── 🌼
   **/
  useEffect(() => {
    if (activeChannelType === "Public" && joinedPublicChannels.length > 0) {
      setActiveChannel(joinedPublicChannels[0]);
    } else if (
      activeChannelType === "Private" &&
      joinedPrivateChannels.length > 0
    ) {
      setActiveChannel(joinedPrivateChannels[0]);
    } else setActiveChannel({} as ChannelsProps);
  }, [joinedPrivateChannels, joinedPublicChannels, activeChannelType]);

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
   **├ 👇 Render the channels list according to the channel type:
   **├   First : render the channels that the user joined to.
   **├   Second: render the channels that the user didn't join to
   **└── 🌼
   **/
  let key = 0;
  return (
    <div className="flex flex-col items-center w-full h-2/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {/* ================================================================================== */}
      {/* Render the Private channels:
       *  First render the private channels that the user joined.
       *  Then render the private channels that the user did not join yet.
       */}
      {activeChannelType === "Private"
        ? joinedPrivateChannels
            .map((OneChannel: ChannelsProps, index: integer) => (
              <div key={key++}>
                <Channel channel={OneChannel} isJoined={true} />
              </div>
            ))
            .concat(<hr className="w-3/4 py-2 border-line-break" key={key++} />)
            .concat(
              allPrivateChannels
                .filter(
                  (OneChannel: ChannelsProps) =>
                    !joinedPrivateChannels.includes(OneChannel)
                )
                .map((OneChannel: ChannelsProps, index: integer) => (
                  <div key={key++}>
                    <Channel channel={OneChannel} isJoined={false} />
                  </div>
                ))
            )
        : joinedPublicChannels
            .map((OneChannel: ChannelsProps, index: integer) => (
              <div key={key++}>
                <Channel channel={OneChannel} isJoined={true} />
              </div>
            ))
            .concat(<hr className="w-3/4 py-2 border-line-break" key={key++} />)
            .concat(
              allPublicChannels
                .filter(
                  (OneChannel: ChannelsProps) =>
                    !joinedPublicChannels.includes(OneChannel)
                )
                .map((OneChannel: ChannelsProps, index: integer) => (
                  <div key={key++}>
                    <Channel channel={OneChannel} isJoined={false} />
                  </div>
                ))
            )}
      {/* ================================================================================== */}
    </div>
  );
}

/**============================================================================================*/
