import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { userInformation } from "@/components/Profile/types";
import { getFriendsData } from "../../../../../../../services/friends";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import Friend from "@/components/Chat/Friends/FriendsSideBar/FriendsList/Friend/Friend";

export default function FriendsBox() {
  const session = useSession();
  const [friends, setFriends] = useState<userInformation[]>([]);
  const [isLoading, setLoading] = useState(true);

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
  }, [session]);

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
