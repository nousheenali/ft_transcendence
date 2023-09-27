import React from "react";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { TableRowData } from "@/components/Table/types";
import { generateProfileFriendsData } from "@/data/Table/friends";
import { generateProfileSearchData } from "@/data/Table/search";
import { generateProfileBlockedData } from "@/data/Table/blocked";
import { generateFriendRequestsData } from "@/data/Table/friendRequests";
import { generatePendingRequestsData } from "@/data/Table/pendingFriendRequests";
import ProfilePage from "@/components/Profile/ProfilePage";
import { getData } from "../../../../services/api";
import { userInformation } from "@/components/Profile/types";

export default async function page(req: NextRequest) {
  const session = await getServerSession(options);
  const login = await session?.user.login!;
  const friendData: TableRowData[] = await generateProfileFriendsData(login);
  const searchData: TableRowData[] = await generateProfileSearchData(login);
  const blockedData: TableRowData[] = await generateProfileBlockedData(login);
  const incomingData: TableRowData[] = await generateFriendRequestsData(login);
  const outgoingData: TableRowData[] = await generatePendingRequestsData(login);

  // Fetch user data
  const userInfo: userInformation  = await getData(login,"/user/getByLogin/");

  return (
    <ProfilePage
      friendData={friendData}
      searchData={searchData}
      blockData={blockedData}
      incomingData={incomingData}
      outgoingData={outgoingData}
      userInfo={userInfo}
    />
  );
}
