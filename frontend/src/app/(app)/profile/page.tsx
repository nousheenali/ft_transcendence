import React from 'react';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { TableRowData } from '@/components/Table/types';
import { generateProfileFriendsData } from '@/data/Table/friends';
import ProfilePage from '@/components/Profile/ProfilePage';
import { userInformation } from '@/components/Profile/types';
import { getUserData } from '../../../../services/user';
import { API_ENDPOINTS } from '../../../../config/apiEndpoints';
import path from 'path';

export default async function page(req: NextRequest) {
  // const session = await getServerSession(options);
  // const login = await session?.user.login!;

  // // Fetch user data
  // const userInfo: userInformation= await getUserData(login, API_ENDPOINTS.getUserbyLogin);

  return <ProfilePage />;
}
