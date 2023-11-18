import Image from "next/image";
import { AuthContext } from "@/context/AuthProvider";
import { userInformation } from "@/components/Profile/types";
import React, { useEffect, useState, useContext } from "react";
import { getFriendsData } from "../../../../../../../services/friends";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import { activateClickedFriend, useReRenderAllState } from "@/context/store";
import Friend from "@/components/Chat/Friends/FriendsSideBar/FriendsList/Friend/Friend";

/**=========================================================================================*/

export default function FriendsBox() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState<userInformation[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { setActiveFriend } = activateClickedFriend();
  const { reRenderAll, setReRenderAll } = useReRenderAllState();

  /**=========================================================================================*/
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<userInformation[]>(friends);
  /**=========================================================================================*/

  useEffect(() => {
    if (user && user.login) {
      const fetchData = async () => {
        const friendsData: userInformation[] = await getFriendsData(
          user.login!,
          API_ENDPOINTS.getAllFriends
        );
        setFriends(friendsData);
        setLoading(false);
      };
      fetchData();
      if (reRenderAll) {
        setReRenderAll(false);
      }
    }
    if (friends.length > 0) setActiveFriend(friends[0].login);
  }, [user, reRenderAll]);

  /**=========================================================================================*/
  useEffect(() => {
    setInputValue("");
    setFilteredData(friends);
  }, [friends]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setInputValue(query);

    const filtered = friends.filter((rowData: userInformation) =>
      rowData.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  /**=========================================================================================*/

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!friends)
    return (
      <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container"></div>
    );
  return (
    <>
      {/* ======================================================================================== */}
      <div className="flex justify-stretch items-center rounded-md bg-search-box-fill w-80 h-8 border-[0.5px] border-chat-search-stroke">
        <input
          className="ml-2 bg-search-box-fill font-thin text-sm text-search-box-text w-full h-full focus:outline-none hover:cursor-text"
          type="search"
          name="search channel users"
          placeholder="Search Friends"
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
        {filteredData.map((OneFriend, index) => (
          <div key={index}>
            <Friend key={index} friend={OneFriend} />
          </div>
        ))}
      </div>
    </>
  );
}
