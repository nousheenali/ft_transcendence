import SenderChatBox from "./Sender/Sender";
import { useSession } from "next-auth/react";
import { MessagesProps } from "../../../types";
import ReceiverChatBox from "./Receiver/Receiver";
import React, { useContext, useEffect, useState } from "react";
import { getMessages } from "../../../../../../services/messages";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { activateClickedFriend } from "../../../../../context/store";
import { AuthContext } from "@/context/AuthProvider";


export default function FriendChat() {
  // const session = useSession();
  const { user } = useContext(AuthContext);
  const [friendChat, setFriendChat] = useState<MessagesProps[]>([]);
  const activeFriend = activateClickedFriend((state) => state.activeFriend);

  useEffect(() => {
    if (activeFriend === "" || activeFriend === "DefaultFriend") return;
    const fetchData = async () => {
      const chat: MessagesProps[] = await getMessages(
       user.login!,
        API_ENDPOINTS.userMessages + activeFriend + "/"
      );
      setFriendChat(chat);
    };
    fetchData();
  }, [user, activeFriend]);

  return (
    <div className="overflow-y-scroll px-3">
      {friendChat.map((message, index) => {
        if (message.sender.login ===user.login) {
          return <SenderChatBox key={index} message={message} />;
        } else {
          return <ReceiverChatBox key={index} message={message} />;
        }
      })}
    </div>
  );
}
