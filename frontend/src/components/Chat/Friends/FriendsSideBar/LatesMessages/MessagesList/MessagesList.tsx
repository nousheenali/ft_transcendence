import Image from "next/image";
import { AuthContext } from "@/context/AuthProvider";
import { MessagesProps } from "@/components/Chat/types";
import React, { useContext, useEffect, useState } from "react";
import { getBlockList } from "../../../../../../../services/user";
import { getMessages } from "../../../../../../../services/messages";
import { API_ENDPOINTS } from "../../../../../../../config/apiEndpoints";
import {
  useReceivedMessageState,
  activateClickedFriend,
  useReRenderAllState,
} from "../../../../../../context/store";
import Message from "@/components/Chat/Friends/FriendsSideBar/LatesMessages/Message/Message";

/**=========================================================================================*/
export default function MessagesList() {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const { receivedMessage } = useReceivedMessageState();
  const [latestMessages, setLatestMessages] = useState<MessagesProps[]>([]);
  const { setActiveFriend } = activateClickedFriend();
  const { reRenderAll, setReRenderAll } = useReRenderAllState();
  const [blockedByList, setBlockedByList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredData, setFilteredData] =
    useState<MessagesProps[]>(latestMessages);

  //------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (user && user.login) {
      const fetchData = async () => {
        const messages: MessagesProps[] = await getMessages(
          user.login!,
          API_ENDPOINTS.userLatestMessages
        );
        setLatestMessages(messages);
        setLoading(false);

        const blockedBy: string[] = await getBlockList(
          user.login,
          API_ENDPOINTS.blockedByList
        );
        setBlockedByList(blockedBy);
      };
      fetchData();
    }
  }, [user, receivedMessage, reRenderAll]);

  //------------------------------------------------------------------------------------------------
  useEffect(() => {
    setInputValue("");
    setFilteredData(latestMessages);
  }, [latestMessages]);
  //------------------------------------------------------------------------------------------------
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setInputValue(query);

    const filtered = latestMessages.filter((rowData: MessagesProps) =>
      rowData.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  //------------------------------------------------------------------------------------------------

  /**
   **╭── 🟣
   **├ 👇 Activate the chat with the first channel in the list according to the joined channel type
   **└── 🟣
   **/
  useEffect(() => {
    if (latestMessages.length > 0) {
      setActiveFriend(latestMessages[0].sender.login);
    }
  }, [latestMessages]);
  //------------------------------------------------------------------------------------------------
  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  //------------------------------------------------------------------------------------------------

  if (latestMessages.length === 0)
    return (
      <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container"></div>
    );
  //------------------------------------------------------------------------------------------------

  return (
    <>
      {/* ======================================================================================== */}
      <div className="flex justify-stretch items-center rounded-md bg-search-box-fill w-80 h-8 border-[0.5px] border-chat-search-stroke">
        <input
          className="ml-2 bg-search-box-fill font-thin text-sm text-search-box-text w-full h-full focus:outline-none hover:cursor-text"
          type="search"
          name="search users messages"
          placeholder="Search Latest Messages"
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

      <hr className="w-80 border-line-break" />

      {/* ======================================================================================== */}
      <div className="flex flex-col items-center w-full h-2/4 px-1 rounded-xl overflow-y-scroll scroll-container">
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
            <span className="text-search-box-text font-saira-condensed font-light text-lg">
              No messages found!!
            </span>
          </div>
        )}
        {/* ======================================================================================== */}
        {/* && !blockedByList.includes(message.sender.login) */}
        {filteredData.map((message, index) => (
          <div className="py-1" key={index}>
            {!blockedByList.includes(message.sender.login) && (
              <Message message={message} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/**=========================================================================================*/
