import React, { useEffect } from "react";
import FriendChat from "./FriendChat/FriendChat";
import { getUserData } from "../../../../../services/user";
import { userInformation } from "@/components/Profile/types";
import { API_ENDPOINTS } from "../../../../../config/apiEndpoints";
import {
  activateClickedFriend,
  useReRenderAllState,
} from "../../../../context/store";
import SendMessageBox from "../../ChatBox/SendMessageBox/SendMessageBox";
import FriendsChatBoxHeader from "./FriendsChatBoxHeader/FriendsChatBoxHeader";

export default function FriendsChatBox() {
  const { activeFriend } = activateClickedFriend();
  const [user, setUser] = React.useState<userInformation>();
  const { reRenderAll, setReRenderAll } = useReRenderAllState();

  /*------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (activeFriend) {
      const fetchData = async () => {
        const userData: userInformation = await getUserData(
          activeFriend,
          API_ENDPOINTS.getUserbyLogin
        );
        setUser(userData);
      };
      fetchData();
      if (reRenderAll) {
        setReRenderAll(false);
      }
    }
  }, [activeFriend, reRenderAll]);

  /*------------------------------------------------------------------------------------*/
  return (
    <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col justify-between border-b border-main-yellow bg-box-fill rounded-xl">
      <FriendsChatBoxHeader friend={user} />
      <FriendChat />
      <SendMessageBox receiver={user!} />
    </div>
  );
}
