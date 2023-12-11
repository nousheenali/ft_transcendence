"use client";
import React, { useContext, useEffect, useRef } from "react";
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
import { DataGeneratorMap, ProfilePageProps, userInformation } from "./types";
import { getUserData } from "../../services/user";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";
import { AuthContext } from "@/context/AuthProvider";

const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState("friends");
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [userInfo, setUserInfo] = useState<userInformation>();
  const { user } = useContext(AuthContext);
  const login: string = user.login!;
  const [maxHeight, setMaxHeight] = useState("none");
  const containerRef = useRef<HTMLDivElement>(null);
  let data: TableRowData[];

  const fetchTableData = async (buttonId: string) => {
    try {
      if (user.login) {
        const userData = await getUserData(
          user.login,
          API_ENDPOINTS.getUserbyLogin
        );
        if (userData) {
          setUserInfo(userData);
          const dataGeneratorMap: DataGeneratorMap = {
            friends: generateProfileFriendsData,
            search: generateProfileSearchData,
            blocked: generateProfileBlockedData,
            friendRequests: generateFriendRequestsData,
            pendingRequests: generatePendingRequestsData,
          };
          const dataGenerator = dataGeneratorMap[buttonId];

          if (dataGenerator) {
            const data = await dataGenerator(user.login);
            setTableData(data);
            setIsLoading(false);
          } else throw new Error("Invalid Button Click");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTableData(activeButton);
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      setMaxHeight(`${containerHeight}px`);
      //  console.log("Container Height:", containerHeight);
    }
  }, [activeButton, login]); // fetch data when button clicked

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const renderTable = () => {
    if (isLoading) {
      return (
        <span className="loading loading-ring loading-lg text-main-yellow"></span>
      );
    } else {
      switch (activeButton) {
        case "friends":
          return (
            <ResponsiveTable
              searchBar={true}
              header="Friends"
              headerImage="people.svg"
              headings={friendsProfileHeadings}
              data={tableData}
              maxHeight={maxHeight}
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
              maxHeight={maxHeight}
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
              maxHeight={maxHeight}
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
              maxHeight={maxHeight}
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
              maxHeight={maxHeight}
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
        <div className="h-1/5">
          <ProfileInfo
            name={userInfo?.name || "name"}
            email={userInfo?.email || "email"}
            score={userInfo?.score || 0}
            avatar={userInfo?.avatar || "avatar"}
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
          />
        </div>
        <div
          ref={containerRef}
          className=" h-4/5 mt-[10px] border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden"
        >
          {renderTable()}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
