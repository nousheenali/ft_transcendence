"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";
import { ProfileInfoProps, userInformation } from "../types";
import { generateLeaderboardData } from "@/data/Table/leaderBoard";
import { TableRowData } from "@/components/Table/types";
import { AuthContext } from "@/context/AuthProvider";
import { getAllUsersData } from "../../../services/user";
import { API_ENDPOINTS } from "../../../../config/apiEndpoints";

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  email,
  score,
  avatar,
  activeButton,
  handleButtonClick,
}) => {
  // const [usersData, setUsersData] = useState<userInformation[]>([]);
  const [rank, setRank] = useState(0);
  const { user } = useContext(AuthContext);
  const login: string = user.login!;

  const fetchUsersData = async () => {
    if (login) {
      const data = await getAllUsersData(login, API_ENDPOINTS.getAllUsers);
      // setUsersData(data);
      let i = 0;
      data.forEach((item: userInformation) => {
        i++;
        if (item.login === login) {
          setRank(i);
          return;
        }
      });
    }
  };

  fetchUsersData();

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="h-[30px] flex flex-row justify-center items-center space-x-4  bg-heading-fill rounded-t-2xl border-[1px] border-heading-stroke">
          <div>
            <h1 className="font-saira-condensed text-xl text-main-text">
              Profile
            </h1>
          </div>
          <div>
            <Image
              height={25}
              width={25}
              src="/profile.svg"
              alt="profile icon"
            />
          </div>
        </div>
        <div className="flex flex-row h-[130px] border-b rounded-b-lg border-main-yellow">
          <div className="flex flex-shrink-0 w-1/5 justify-center p-3">
            <img className="w-24 h-24 rounded-full object-cover" src={avatar} />
          </div>
          <div className="flex flex-col w-4/5 ml-2 mt-5 mb-5 mr-10 rounded-xl font-light font-saira-condensed text-lg text-main-text justify-start pl-6 pt-1 bg-table-row-bg">
            <div className="flex flex-row">
              <div className="text-subheading-one">Name:</div>
              <div className="ml-10 truncate max-w-[300px]">{name}</div>
            </div>
            <div className="flex flex-row">
              <div className="text-subheading-one">Email:</div>
              <div className="ml-10 truncate max-w-[300px]">{email}</div>
            </div>
            <div className="flex flex-row">
              <div className="text-subheading-one">Rank:</div>
              <div className="ml-10">{rank}</div>
            </div>
          </div>
        </div>
        <div className="border-b rounded-b-lg border-main-yellow">
          <ProfileNavBar
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
