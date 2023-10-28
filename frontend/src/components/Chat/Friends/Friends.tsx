"use client";

import { MessagesProps } from "../types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getMessages } from "../../../../services/messages";
import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/MsgChannelBtn";
import FriendsChatBox from "@/components/Chat/Friends/FriendsChatBox/FriendsChatBox";
import MessagesSideBar from "@/components/Chat/Friends/FriendsSideBar/MessagesSideBar";

export default function Friends() {
  const session = useSession();
  const [latestMessages, setLatestMessages] = useState<MessagesProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const messages: MessagesProps[] = await getMessages(
        session?.data?.user.login!,
        API_ENDPOINTS.userLatestMessages
      );

      setLatestMessages(messages);
    };
    fetchData();
  }, [session]);

  return (
    <div className="flex w-full h-screen px-4 justify-center">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
        <MessagesSideBar latestMessages={latestMessages} />
      </div>
      <FriendsChatBox />
    </div>
  );
}
