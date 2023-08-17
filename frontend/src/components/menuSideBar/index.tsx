import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breaker from "../br";

export default function MenuSideBar() {
  const [activeButton, setActiveButton] = useState("button0");

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const getButtonStyles = (buttonId: string) => {
    return `border-2 border-transparent pl-6 hover:bg-black hover:border-heading-fill hover:border-2 hover:rounded-l-xl no-underline hover:no-underline ${
      activeButton === buttonId
        ? "bg-black border-heading-fill border-2 rounded-l-xl "
        : ""
    }`;
  };
  return (
    <>
      {/* menu section */}
      <ul className="flex flex-col ml-10 flex-grow">
        <Link
          passHref
          href="/"
          onClick={() => handleButtonClick("button0")}
          className={getButtonStyles("button0")}
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
          onClick={() => handleButtonClick("button1")}
          className={getButtonStyles("button1")}
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
          onClick={() => handleButtonClick("button2")}
          className={getButtonStyles("button2")}
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
          onClick={() => handleButtonClick("button3")}
          className={getButtonStyles("button3")}
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
          onClick={() => handleButtonClick("button4")}
          className={getButtonStyles("button4")}
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
          onClick={() => handleButtonClick("button5")}
          className={getButtonStyles("button5")}
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
          href="/login"
          onClick={() => handleButtonClick("button6")}
          className={getButtonStyles("button6") + " mb-10"}
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
