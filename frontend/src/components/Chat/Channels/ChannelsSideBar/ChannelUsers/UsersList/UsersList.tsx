import React, { useContext, useEffect, useState } from "react";
import { activateClickedChannel, useReRenderAllState } from "@/context/store";
import { ChannelUserProps } from "@/components/Chat/types";
import { getChannelUsersData } from "../../../../../../../services/channels";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import User from "@/components/Chat/Channels/ChannelsSideBar/ChannelUsers/User/User";
import { AuthContext } from "@/context/AuthProvider";
import { userInformation } from "@/components/Profile/types";
import { getUserData } from "../../../../../../../services/user";

//============================================================================================//
export default function UsersList() {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const { activeChannel } = activateClickedChannel();
  const [channelUsers, setChannelUsers] = useState<ChannelUserProps[]>([]);
  const [currentUser, setCurrentUser] = useState<userInformation>();
  const { reRenderAll, setReRenderAll } = useReRenderAllState();

  /**
   **╭── 🟣
   **├ 👇 Fetch the active channel users data from the database
   **└── 🟣
   **/

  console.log(
    "reRenderAll before useEffect from the user: [",
    user.login,
    "]",
    reRenderAll
  );
  useEffect(() => {
    if (user && user.login && activeChannel.channelName) {
      const fetchData = async () => {
        const users: ChannelUserProps[] = await getChannelUsersData(
          user.login!,
          API_ENDPOINTS.channelUsers + activeChannel.channelName + "/"
        );
        setChannelUsers(users);
        const currentUser: userInformation = await getUserData(
          user.login!,
          API_ENDPOINTS.getUserbyLogin
        );
        setCurrentUser(currentUser);
        setLoading(false);
      };
      fetchData();
      if (reRenderAll) setReRenderAll(false);
    }
    console.log(
      "reRenderAll after useEffect from the user: [",
      user.login,
      "]",
      reRenderAll
    );
  }, [user, activeChannel, reRenderAll]);

  /**
   **╭── 🟣
   **├ 👇 Show the loading spinner while fetching the channel's users data
   **└── 🟣
   **/
  if (activeChannel.channelName === undefined)
    return <p>No channel selected</p>;

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!channelUsers) return <p>No users data</p>;

  return (
    <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {channelUsers.map((OneUser, index) => (
        <div key={index}>
          <User
            key={index}
            currentUser={currentUser!}
            user={OneUser}
            channel={activeChannel}
          />
        </div>
      ))}
    </div>
  );
}

//============================================================================================//
