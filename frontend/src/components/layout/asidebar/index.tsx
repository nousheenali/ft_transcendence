"use client";
import Breaker from "@/components/br";
import React from "react";
import { useState } from "react";
import { VscBellDot } from "react-icons/vsc";
import Image from "next/image";
import MobileSidebar from "@/components/mobileSidebar";
import NotificationIcon from "../notificationIcon";
import UserProfileSide from "../userProfileSide";
import MenuSideBar from "../menuSideBar";
import FooterSideBar from "../FooterSideBar";


const AsideBar = () => {

  return (
    <>
    <aside className="hidden lg:w-[400px] m my-[18px] ml-[35px] border-2  border-aside-border bg-aside-fill rounded-3xl overflow-hidden lg:flex flex-col justify-start">

    <NotificationIcon />

    <UserProfileSide />

    <MenuSideBar />

    <FooterSideBar />

    </aside>
    </>
  );
};

export default AsideBar;
