import React, { useState } from 'react';
import { ProfileNavBarProps } from '../../types';

const ProfileNavBar: React.FC<ProfileNavBarProps> = ({
  activeButton,
  handleButtonClick,
}) => {
  const getButtonStyles = (buttonId: string) => {
    return `px-4 mt-1 mb-1 hover:text-subheading-two rounded-md truncate ${
      activeButton === buttonId
        ? 'text-subheading-two border-heading-stroke border-[1px] '
        : 'text-main-text'
    }`;
  };
  return (
    <>
      <div className="flex flex-row flex-shrink-0 h-[45px] space-x-10 justify-center font-saira-condensed text-main-text">
        <button
          onClick={() => handleButtonClick("friends")}
          className={getButtonStyles("friends")}
        >
          Friends
        </button>
        <button
          onClick={() => handleButtonClick("search")}
          className={getButtonStyles("search")}
        >
          Search
        </button>
        <button
          onClick={() => handleButtonClick("blocked")}
          className={getButtonStyles("blocked")}
        >
          Blocked
        </button>
        <button
          onClick={() => handleButtonClick("friendRequests")}
          className={getButtonStyles("friendRequests")}
        >
          Friend Requests
        </button>
        <button
          onClick={() => handleButtonClick("pendingRequests")}
          className={getButtonStyles("pendingRequests")}
        >
          Pending Friend Requests
        </button>
      </div>
    </>
  );
};

export default ProfileNavBar;
