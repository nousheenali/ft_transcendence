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

const ProfilePage: React.FC<ProfilePageProps> = ({
  friendData,
  searchData,
  blockData,
  incomingData,
  outgoingData,
  userInfo,
}) => {
  const [activeButton, setActiveButton] = useState("friends");
  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const renderTable = () => {
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
