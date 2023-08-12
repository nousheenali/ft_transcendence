import Link from "next/link";
import React from "react";
import Image from "next/image";

/*
 * TODO: # On width of 780px:
 *           1- Add the hamburger menu for mobile devices and make the navbar responsive on width of 780px
 *           2- Change logo size
 * 		    3- Change font size
 * */
export const Header: React.FC = () => {
  return (
    <header className="w-screen h-60 flex justify-between items-center shadow-2xl px-20 2xl:px-60">
      <div className="flex justify-between items-center w-screen h-full">
        <div className="flex flex-col justify-between items-center">
          <div className="font-saira-condensed text-xl">
            <span className="text-main-yellow">Spin</span>
            <span className="text-main-text">Masters</span>
          </div>
          <div>
            <Image alt="Logo" src="./Logo.svg" width={115} height={115} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-1/2">
          <ul className="flex text-main-yellow font-saira-condensed text-xl shadow-inner border-b-2 border-nav-stroke">
            <li className="ml-20 hover:text-hover-login-nav-text">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="ml-10 hover:text-hover-login-nav-text">
              <Link href={"/#team-section"}>The Team</Link>
            </li>
            <li className="ml-10 mr-20 hover:text-hover-login-nav-text">
              <Link href={"/about"}>About Spin Masters</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
