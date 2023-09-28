"use client";
import React, { useEffect } from "react";
import { useState } from "react";

import ResponsiveTable from "@/components/Table/Table";
import ProfileInfo from "@/components/Profile/ProfileInfo/ProfileInfo";
import {
  searchProfileHeadings,
  blockedFriendsHeadings,
  friendsProfileHeadings,
  friendsRequestHeadings,
  pendingRequestHeadings,
} from "@/data/Table/profileTableHeadings";
import { ProfilePageProps } from "./types";
import { generateProfileSearchData } from "@/data/Table/search";
import { generateProfileBlockedData } from "@/data/Table/blocked";
import { generateProfileFriendsData } from "@/data/Table/friends";
import { generateFriendRequestsData } from "@/data/Table/friendRequests";
import { generatePendingRequestsData } from "@/data/Table/pendingFriendRequests";
import { TableRowData } from "../Table/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage: React.FC<ProfilePageProps> = ({
  friendsRecords,
  userInfo
}) => {
  const [activeButton, setActiveButton] = useState("friends");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState<TableRowData[]>([]); 
  const [blockData, setBlockData] = useState<TableRowData[]>([]);
  const [friendData, setFriendData] = useState<TableRowData[]>(friendsRecords);
  const [incomingData, setIncomingData] = useState<TableRowData[]>([]);
  const [outgoingData, setOutgoingData] = useState<TableRowData[]>([]); 
  let data: TableRowData[];
  
  const fetchTableData = async (buttonId: string) => {
    try {
      if (buttonId === "friends") {
        data = await generateProfileFriendsData(userInfo.login); // Fetch friends list
        setFriendData(data);
        setIsLoading(false);
      } else if (buttonId === "search") {
        data = await generateProfileSearchData(userInfo.login); //  non friends
        setSearchData(data);
        setIsLoading(false);
      }
       else if (buttonId === "blocked") {
        data = await generateProfileBlockedData(userInfo.login); // blocked friends
        setBlockData(data);
        setIsLoading(false);
      } else if (buttonId === "friendRequests") {
        data = await generateFriendRequestsData(userInfo.login); // incoming friend requests
        setIncomingData(data);
        setIsLoading(false);
      } else if (buttonId === "pendingRequests") {
        data = await generatePendingRequestsData(userInfo.login); // Fetch outgoing request
        setOutgoingData(data);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    setIsLoading(true)
    fetchTableData(activeButton); 
  }, [activeButton]); // fetch data when button clicked

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const renderTable = () => {
    if (isLoading) {
      return <span className="loading loading-ring loading-lg text-main-yellow"></span>;
    } 
    else {
      switch (activeButton) {
        case "friends":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Friends"
              headerImage="people.svg"
              headings={friendsProfileHeadings}
              data={friendData}
              maxHeight="585px"
            />
          );
        case "search":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Search Friends"
              headerImage="people.svg"
              headings={searchProfileHeadings}
              data={searchData}
              maxHeight="585px"
            />
          );
        case "blocked":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Blocked"
              headerImage="user-minus.svg"
              headings={blockedFriendsHeadings}
              data={blockData}
              maxHeight="585px"
            />
          );
        case "friendRequests":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Friend Requests"
              headerImage="user-plus.svg"
              headings={friendsRequestHeadings}
              data={incomingData}
              maxHeight="585px"
            />
          );
        case "pendingRequests":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Pending Requests"
              headerImage="user-plus.svg"
              headings={pendingRequestHeadings}
              data={outgoingData}
              maxHeight="585px"
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <>
      <div className="w-full h-full text-center text-white flex flex-col p-6">
        <ProfileInfo
          name={userInfo.login}
          email={userInfo.email}
          rank="12"
          activeButton={activeButton}
          handleButtonClick={handleButtonClick}
        />
        <div className="h-full mt-[10px]  border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden ">
          {renderTable()}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
