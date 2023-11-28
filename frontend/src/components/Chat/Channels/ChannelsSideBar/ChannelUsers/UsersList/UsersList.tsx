import Image from "next/image";
import { AuthContext } from "@/context/AuthProvider";
import { ChannelUserProps } from "@/components/Chat/types";
import { userInformation } from "@/components/Profile/types";
import React, { useContext, useEffect, useState } from "react";
import { getUserData } from "../../../../../../../services/user";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import { getChannelUsersData } from "../../../../../../../services/channels";
import { activateClickedChannel, useReRenderAllState } from "@/context/store";
import User from "@/components/Chat/Channels/ChannelsSideBar/ChannelUsers/User/User";

//============================================================================================//
export default function UsersList({ isVisible }: { isVisible: string }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const { activeChannel } = activateClickedChannel();
  const [channelUsers, setChannelUsers] = useState<ChannelUserProps[]>([]);
  const [currentUser, setCurrentUser] = useState<userInformation>();
  const { reRenderAll, setReRenderAll } = useReRenderAllState();

  /**=========================================================================================*/
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] =
    useState<ChannelUserProps[]>(channelUsers);
  /**=========================================================================================*/

  /**
   **╭── 🟣
   **├ 👇 Fetch the active channel users data from the database
   **└── 🟣
   **/
  useEffect(() => {
    if (
      user &&
      user.login &&
      activeChannel &&
      activeChannel.channelName !== undefined &&
      activeChannel.channelName !== ""
    ) {
      const fetchData = async () => {
        const users: ChannelUserProps[] = await getChannelUsersData(
          user.login,
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
  }, [user, activeChannel, reRenderAll]);

  /**=========================================================================================*/
  useEffect(() => {
    setInputValue("");
    setFilteredData(channelUsers);
  }, [channelUsers]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setInputValue(query);

    const filtered = channelUsers.filter((rowData: ChannelUserProps) =>
      rowData.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  /**=========================================================================================*/

  /**
   **╭── 🟣
   **├ 👇 Show the loading spinner while fetching the channel's users data
   **└── 🟣
   **/
  if (
    activeChannel.channelName === undefined ||
    activeChannel.channelName === ""
  )
    return <p>No channel selected</p>;

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!channelUsers) return <p>No users data</p>;

  /**=========================================================================================*/
  return (
    <>
      {/* ======================================================================================== */}
      <div
        className={`flex justify-stretch items-center rounded-md bg-search-box-fill h-8 border-[0.5px] border-chat-search-stroke  w-80 ${isVisible}`}
      >
        <input
          className="ml-2 bg-search-box-fill font-thin text-sm text-search-box-text w-full h-full focus:outline-none hover:cursor-text"
          type="search"
          name="search channel users"
          placeholder="Search Channel's Users"
          onChange={handleSearchInputChange}
        />
        <Image
          className="mr-2"
          alt="Users Search"
          src="/chat/user-search.svg"
          width={23}
          height={23}
        />
      </div>

      {/* ======================================================================================== */}
      <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
            <span className="text-search-box-text font-saira-condensed font-light text-lg">
              No users found!!
            </span>
          </div>
        )}
        {filteredData.map((OneUser, index) => (
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
      {/* ======================================================================================== */}
    </>
  );
}

//============================================================================================//
