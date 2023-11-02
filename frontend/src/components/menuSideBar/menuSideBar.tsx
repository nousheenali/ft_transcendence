"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breaker from "../br/Br";
import { signOut } from "next-auth/react";

import { usePathname } from "next/navigation";

export default function MenuSideBar() {
  const pathname = usePathname();
  // return <p>Current pathname: {pathname}</p>
  const [activeButton, setActiveButton] = useState(pathname);

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const getButtonStyles = (buttonId: string) => {
    return `border-2 border-transparent pl-6 hover:bg-black hover:border-[#696D7D] hover:border-opacity-30 hover:border-2 hover:rounded-l-xl no-underline hover:no-underline 
      ${
        activeButton === buttonId
          ? "bg-black border-[#696D7D] border-opacity-30 rounded-l-xl border-2"
          : ""
      }`;
  };
  return (
    <>
      {/* menu section */}
      {/* <p>current path: {pathname}</p> */}
      <ul className="flex flex-col ml-10 flex-grow">
        <Link
          passHref
          href="/"
          onClick={() => handleButtonClick("/")}
          className={getButtonStyles("/")}
        >
          <li className="flex flex-row gap-8 pl-6 p-3">
            <Image
              height={30}
              width={30}
              src="/DashBoard_logo.svg"
              alt="DashBoard_logo"
            />
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              DashBoard
            </h1>
          </li>
        </Link>

        <Link
          href="/leaderboard"
          passHref
          onClick={() => handleButtonClick("/leaderboard")}
          className={getButtonStyles("/leaderboard")}
        >
          <li className="flex flex-row gap-8 pl-6 p-3">
            <Image
              height={30}
              width={30}
              src="/LeaderBoard_logo.svg"
              alt="DashBoard_logo"
            />
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              LeaderBoard
            </h1>
          </li>
        </Link>

        <Link
          passHref
          href="/chat"
          onClick={() => handleButtonClick("/chat")}
          className={getButtonStyles("/chat")}
        >
          <li className="flex flex-row gap-8 pl-6 p-3">
            <Image
              height={30}
              width={30}
              src="/chat_logo.svg"
              alt="DashBoard_logo"
            />
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              Chat
            </h1>
          </li>
        </Link>

        <Link
          passHref
          onClick={() => handleButtonClick("/profile")}
          className={getButtonStyles("/profile")}
          href="/profile"
        >
          <li className="flex flex-row gap-8 pl-6 p-3">
            <Image
              height={30}
              width={30}
              src="/profile_logo.svg"
              alt="DashBoard_logo"
            />
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              Profile
            </h1>
          </li>
        </Link>

        <Link
          passHref
          onClick={() => handleButtonClick("/settings")}
          className={getButtonStyles("/settings")}
          href="/settings"
        >
          <li className="flex flex-row gap-8 pl-6 p-3">
            <Image
              height={30}
              width={30}
              src="/settings_logo.svg"
              alt="DashBoard_logo"
            />
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              Settings
            </h1>
          </li>
        </Link>

        {/* footer logout and help */}
        <hr className="mt-auto mr-8 -ml-2 my-6 border-heading-stroke-30 border-1" />
        <Link
          passHref
          href="/help"
          onClick={() => handleButtonClick("/help")}
          className={getButtonStyles("/help")}
        >
          <li className="flex flex-row gap-8 pl-6 p-3">
            <Image
              height={30}
              width={30}
              src="/help_logo.svg"
              alt="Help_logo"
            />
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              Help
            </h1>
          </li>
        </Link>

        <Link
          href=""
          onClick={() =>
            signOut({ callbackUrl: "http://10.11.3.8:3000/login" })
          }
          className={getButtonStyles("/logout") + " mb-10"}
        >
          <li className="flex flex-row gap-8 pl-6 p-3">
            <Image
              height={30}
              width={30}
              src="/logout_logo.svg"
              alt="Logout_logo"
            />
            <h1 className="font-saira-condensed font-bold text-xl text-main-text">
              Logout
            </h1>
          </li>
        </Link>
      </ul>
    </>
  );
}
