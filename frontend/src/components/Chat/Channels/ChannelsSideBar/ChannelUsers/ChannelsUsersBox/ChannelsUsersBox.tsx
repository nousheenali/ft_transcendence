import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { activateClickedChannel } from "@/context/store";
import { ChannelUserProps } from "@/components/Chat/types";
import { getChannelUsersData } from "../../../../../../../services/channels";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import ChannelUser from "@/components/Chat/Channels/ChannelsSideBar/ChannelUsers/User/ChannelUser";

//============================================================================================//
export default function ChannelsUsersBox() {
  const session = useSession();
  const [isLoading, setLoading] = useState(true);
  const { activeChannel } = activateClickedChannel();
  const [channelUsers, setChannelUsers] = useState<ChannelUserProps[]>([]);

  /**
   **╭── 🌼
   **├ 👇 Fetch the active channel users data from the database
   **└── 🌼
   **/

  useEffect(() => {
    if (activeChannel.channelName) {
      const fetchData = async () => {
        const users: ChannelUserProps[] = await getChannelUsersData(
          session?.data?.user.login!,
          API_ENDPOINTS.channelUsers + activeChannel.channelName + "/"
        );
        setChannelUsers(users);
        setLoading(false);
      };
      fetchData();
    }
  }, [session, activeChannel]);

  /**
   **╭── 🌼
   **├ 👇 Show the loading spinner while fetching the channel's users data
   **└── 🌼
   **/
  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!channelUsers) return <p>No users data</p>;

  return (
    <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {channelUsers.map((OneUser, index) => (
        <div key={index}>
          <ChannelUser key={index} user={OneUser} />
        </div>
      ))}
    </div>
  );
}

//============================================================================================//
