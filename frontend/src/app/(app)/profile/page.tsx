'use client';
import React from 'react';
import { useState } from 'react';

import ResponsiveTable from '@/components/Table/Table';
import { generateProfileFriendsData } from '@/data/Table/friends';
import { generateProfileBlockedData } from '@/data/Table/blocked';
import { generateFriendRequestsData } from '@/data/Table/friendRequests';
import { generatePendingRequestsData } from '@/data/Table/pendingFriendRequests';
import ProfileInfo from '@/components/Profile/ProfileInfo/ProfileInfo';
import {
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
      case 'friends':
        return (
          <ResponsiveTable
            headings={friendsProfileHeadings}
            data={generateProfileFriendsData()}
            maxHeight="585px"
          />
        );
      case 'blocked':
        return (
          <ResponsiveTable
            headings={blockedFriendsHeadings}
            data={generateProfileBlockedData()}
            maxHeight="585px"
          />
        );
      case 'friendRequests':
        return (
          <ResponsiveTable
            headings={friendsRequestHeadings}
            data={generateFriendRequestsData()}
            maxHeight="585px"
          />
        );
      case 'pendingRequests':
        return (
          <ResponsiveTable
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
        <div className="h-full mt-[10px]  border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden ">{renderTable()}</div>
      </div>
    </>
  );
}
