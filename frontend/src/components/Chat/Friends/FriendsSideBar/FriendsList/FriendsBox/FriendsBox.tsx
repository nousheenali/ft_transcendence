import React, { useEffect, useState, useContext } from "react";
import { activateClickedFriend, useReRenderAllState } from "@/context/store";
import { userInformation } from "@/components/Profile/types";
import { getFriendsData } from "../../../../../../../services/friends";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import Friend from "@/components/Chat/Friends/FriendsSideBar/FriendsList/Friend/Friend";
import { AuthContext } from "@/context/AuthProvider";

export default function FriendsBox() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState<userInformation[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { setActiveFriend } = activateClickedFriend();
  const { reRenderAll, setReRenderAll } = useReRenderAllState();

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

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!friends)
    return (
      <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container"></div>
    );
  return (
    <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {friends.map((OneFriend, index) => (
        <div key={index}>
          <Friend key={index} friend={OneFriend} />
        </div>
      ))}
    </div>
  );
}
