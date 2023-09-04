"use client";
import Breaker from "@/components/br/Br";
import React, { FC } from "react";
import { useState } from "react";
import { VscBellDot } from "react-icons/vsc";
import Image from "next/image";
import MobileSidebar from "@/components/mobileSidebar/mobileSideBar";
import NotificationIcon from "../../notificationIcon";
import UserProfileSide from "../../userProfileSide/userProfileSide";
import MenuSideBar from "../../menuSideBar/menuSideBar";
import { signIn, signOut, useSession } from "next-auth/react";

interface AsideBarProps {
  isMobile: boolean;
}

const AsideBar: FC<AsideBarProps> = ({ isMobile }) => {
  const { data: session } = useSession();
  return (
    <>
      <aside
        className={`${
          !isMobile && "hidden my-[18px] ml-[35px]"
        }  w-80 lg:w-[400px]  border-2  border-aside-border bg-aside-fill rounded-3xl overflow-hidden lg:flex flex-col justify-start`}
      >
        <NotificationIcon />

        <UserProfileSide
          image={session?.user.image!}
          name={session?.user.login!}
        />

        <MenuSideBar />
      </aside>
    </>
  );
};

export default AsideBar;
