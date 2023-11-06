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
import { generateProfileSearchData } from "@/data/Table/search";
import { generateProfileBlockedData } from "@/data/Table/blocked";
import { generateProfileFriendsData } from "@/data/Table/friends";
import { generateFriendRequestsData } from "@/data/Table/friendRequests";
import { generatePendingRequestsData } from "@/data/Table/pendingFriendRequests";
import { TableRowData } from "../Table/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userInformation } from "./types";
import { useSession } from "next-auth/react";
import { getUserData } from "../../../services/user";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";

const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState("friends");
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [userInfo, setUserInfo] = useState<userInformation>();
  const { data: session } = useSession();


  let data: TableRowData[];
  
  const fetchTableData = async (buttonId: string) => {
    try {
      const userData = await getUserData(
        session?.user.login!,
        API_ENDPOINTS.getUserbyLogin
      );
      if(userData){
        setUserInfo(userData);
        const dataGeneratorMap: any = {
          friends: generateProfileFriendsData,
          search: generateProfileSearchData,
          blocked: generateProfileBlockedData,
          friendRequests: generateFriendRequestsData,
          pendingRequests: generatePendingRequestsData,
        };
        const dataGenerator = dataGeneratorMap[buttonId];

        if (dataGenerator) {
          const data = await dataGenerator(userData.login);
          setTableData(data);
          setIsLoading(false)
        }
        else
          throw new Error("Invalid Button Click");
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
              data={tableData}
              maxHeight="585px"
              activeButton="friends"
              reloadPageData={fetchTableData}
            />
          );
        case "search":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Search Friends"
              headerImage="people.svg"
              headings={searchProfileHeadings}
              data={tableData}
              maxHeight="585px"
              activeButton="search"
              reloadPageData={fetchTableData}
            />
          );
        case "blocked":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Blocked"
              headerImage="user-minus.svg"
              headings={blockedFriendsHeadings}
              data={tableData}
              maxHeight="585px"
              activeButton="blocked"
              reloadPageData={fetchTableData}
            />
          );
        case "friendRequests":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Friend Requests"
              headerImage="user-plus.svg"
              headings={friendsRequestHeadings}
              data={tableData}
              maxHeight="585px"
              activeButton="friendRequests"
              reloadPageData={fetchTableData}
            />
          );
        case "pendingRequests":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Pending Requests"
              headerImage="user-plus.svg"
              headings={pendingRequestHeadings}
              data={tableData}
              maxHeight="585px"
              activeButton="pendingRequests"
              reloadPageData={fetchTableData}
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
          name={userInfo?.name || "name"}
          email={userInfo?.email || "email"}
          rank="12"
          avatar={userInfo?.avatar || "avatar"}
          activeButton={activeButton}
          handleButtonClick={handleButtonClick}
        />
        <div className="h-full mt-[10px] border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden ">
          {renderTable()}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
