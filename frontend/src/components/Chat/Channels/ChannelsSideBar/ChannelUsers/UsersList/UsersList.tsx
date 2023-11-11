
import React, { useContext, useEffect, useState } from "react";
import { activateClickedChannel } from "@/context/store";
import { ChannelUserProps } from "@/components/Chat/types";
import { getChannelUsersData } from "../../../../../../../services/channels";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import User from "@/components/Chat/Channels/ChannelsSideBar/ChannelUsers/User/User";
import { AuthContext } from "@/context/AuthProvider";

//============================================================================================//
export default function UsersList() {
    const {user} = useContext(AuthContext)
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
         user.login!,
          API_ENDPOINTS.channelUsers + activeChannel.channelName + "/"
        );
        setChannelUsers(users);
        setLoading(false);
      };
      fetchData();
    }
  }, [user, activeChannel]);

  /**
   **╭── 🌼
   **├ 👇 Show the loading spinner while fetching the channel's users data
   **└── 🌼
   **/
  if (activeChannel.channelName === undefined ) return <p>No channel selected</p>;

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!channelUsers) return <p>No users data</p>;

  return (
    <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {channelUsers.map((OneUser, index) => (
        <div key={index}>
          <User key={index} user={OneUser} />
        </div>
      ))}
    </div>
  );
}

//============================================================================================//
