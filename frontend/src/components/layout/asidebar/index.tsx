'use client';
import Breaker from '@/components/br/Br';
import React, { FC, useContext, useEffect } from 'react';
import { useState } from 'react';
import NotificationIcon from '../../notificationIcon';
import UserProfileSide from '../../userProfileSide/userProfileSide';
import MenuSideBar from '../../menuSideBar/menuSideBar';

import { API_ENDPOINTS } from '../../../../config/apiEndpoints';
import { getUserData } from '../../../../services/user';
import { userInformation } from '@/components/Profile/types';
import { AuthContext } from '@/context/AuthProvider';

interface AsideBarProps {
  isMobile: boolean;
}

const AsideBar: FC<AsideBarProps> = ({ isMobile }) => {

  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState<userInformation>();

  useEffect(() => {
    console.log('user in sidebar', user);
    if (user && user.login) {
      getUserData(user.login!, API_ENDPOINTS.getUserbyLogin)
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user]);

  return (
    <>
      <aside
        className={`${
          !isMobile && 'hidden my-[18px] ml-[35px]'
        }  w-80 lg:w-[400px]  border-2  border-aside-border bg-aside-fill rounded-3xl overflow-hidden lg:flex flex-col justify-start`}
      >
        <NotificationIcon />

        {userData ? (
          <UserProfileSide
            image={userData?.avatar || "image"}
            name={userData?.name || "name"}
          />
        ) : (
          <UserProfileSide image="load" name="load" />
        )}

        <MenuSideBar />
      </aside>
    </>
  );
};

export default AsideBar;
