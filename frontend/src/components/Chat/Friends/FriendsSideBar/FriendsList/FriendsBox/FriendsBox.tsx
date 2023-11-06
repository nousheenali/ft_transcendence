import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { userInformation } from "@/components/Profile/types";
import { getFriendsData } from "../../../../../../../services/friends";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import Friend from "@/components/Chat/Friends/FriendsSideBar/FriendsList/Friend/Friend";
import { activateClickedFriend } from "@/context/store";

export default function FriendsBox() {
  const session = useSession();
  const [friends, setFriends] = useState<userInformation[]>([]);
  const [isLoading, setLoading] = useState(true);
  const setActiveFriend = activateClickedFriend(
    (state) => state.setActiveFriend
  );

  /** ================================================================================================
   * ❂➤ This useEffect is used to fetch the friends data from the server,
   * the dependencies are the session and the friends array,
   * we depend on the friends array to update the friends list when a new friend is added,
   * or if the status of a friend is changed.
   * ================================================================================================
   */
  useEffect(() => {
    const fetchData = async () => {
      const friendsData: userInformation[] = await getFriendsData(
        session?.data?.user.login!,
        API_ENDPOINTS.getAllFriends
      );
      setFriends(friendsData);
      setLoading(false);
    };
    fetchData();
  }, [session, friends]);

  // if (friends.length > 0) setActiveFriend(friends[0].login);
  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!friends) return <p>No friends data</p>;
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
