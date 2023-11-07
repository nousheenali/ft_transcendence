import SenderChatBox from "./Sender/Sender";
import { useSession } from "next-auth/react";
import { MessagesProps } from "../../../types";
import ReceiverChatBox from "./Receiver/Receiver";
import React, { useEffect, useState } from "react";
import { getMessages } from "../../../../../../services/messages";
import { API_ENDPOINTS } from "../../../../../../config/apiEndpoints";
import { activateClickedFriend } from "../../../../../context/store";

export default function FriendChat() {
  const session = useSession();
  const [friendChat, setFriendChat] = useState<MessagesProps[]>([]);
  const activeFriend = activateClickedFriend((state) => state.activeFriend);

  useEffect(() => {
    if (activeFriend === "" || !activeFriend) return;
    const fetchData = async () => {
      const chat: MessagesProps[] = await getMessages(
        session?.data?.user.login!,
        API_ENDPOINTS.userMessages + activeFriend + "/"
      );
      setFriendChat(chat);
    };
    fetchData();
  }, [session, activeFriend]);

  return (
    <div className="overflow-y-scroll px-3">
      {friendChat.map((message, index) => {
        if (message.sender.login === session?.data?.user.login) {
          return <SenderChatBox key={index} message={message} />;
        } else {
          return <ReceiverChatBox key={index} message={message} />;
        }
      })}
    </div>
  );
}
