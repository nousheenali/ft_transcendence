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
    <header className="w-screen h-40 flex justify-center items-center px-20 2xl:px-60 absolute top-0">
      <div className="navbar w-screen h-full flex justify-between">
        <div className="flex flex-col items-center">
          <div className="font-saira-condensed text-xl">
            <span className="text-main-yellow">Spin</span>
            <span className="text-main-text">Masters</span>
          </div>
          <div>
            <Image alt="Logo" src="./Logo.svg" width={115} height={15} />
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <ul className="flex justify-center items-center text-main-yellow font-saira-condensed text-xl shadow-inner border-b-2 border-nav-stroke">
            <li className="ml-10 hover:text-hover-login-nav-text"><Link href={"/login#team-section"}>Our Team</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};