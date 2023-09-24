'use client';
import React from 'react';
import { useState } from 'react';

import ResponsiveTable from '@/components/Table/Table';
import Image from 'next/image';
import { generateProfileFriendsData } from '@/data/Table/friends';
import { generateProfileBlockedData } from '@/data/Table/blocked';
import { generateFriendRequestsData } from '@/data/Table/friendRequests';
import { generatePendingRequestsData } from '@/data/Table/pendingFriendRequests';
import { generateProfileSearchData } from '@/data/Table/search';
import ProfileInfo from '@/components/Profile/ProfileInfo/ProfileInfo';
import {
  searchProfileHeadings,
  blockedFriendsHeadings,
  friendsProfileHeadings,
  friendsRequestHeadings,
  pendingRequestHeadings,
} from '@/data/Table/profileTableHeadings';

export default function Profile() {
  const [activeButton, setActiveButton] = useState('friends');

  const handleButtonClick = (buttonId: string) => {
    // console.log("Button clicked!");
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
            data={generateProfileFriendsData()}
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
            data={generateProfileSearchData()}
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
            data={generateProfileBlockedData()}
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
            data={generateFriendRequestsData()}
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
            data={generatePendingRequestsData()}
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
          name="UserName"
          email="username@email.com"
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
}
