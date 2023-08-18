"use client";
import Breaker from "@/components/br";
import React, { FC } from "react";
import { useState } from "react";
import { VscBellDot } from "react-icons/vsc";
import Image from "next/image";
import MobileSidebar from "@/components/mobileSidebar";
import NotificationIcon from "../../notificationIcon";
import UserProfileSide from "../../userProfileSide";
import MenuSideBar from "../../menuSideBar";

interface AsideBarProps {
  isMobile: boolean;
}


const AsideBar : FC<AsideBarProps> = ({isMobile}) => {

  return (
    <>
    <aside className={`${!isMobile && "hidden my-[18px] ml-[35px]"} w-full lg:w-[400px]  border-2  border-aside-border bg-aside-fill rounded-3xl overflow-hidden lg:flex flex-col justify-start`}>

    <NotificationIcon />

    <UserProfileSide 
    image="/av1.svg"
    name="Gab-172"
    />

    <MenuSideBar />

    </aside>
    </>
  );
};

export default AsideBar;
