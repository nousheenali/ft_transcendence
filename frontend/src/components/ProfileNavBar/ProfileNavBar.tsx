import React, { useState } from 'react'


export default function ProfileNavBar() {

    const [activeButton, setActiveButton] = useState("button1");

    const handleButtonClick = (buttonId: string) => {
      console.log("Button clicked!");
      setActiveButton(buttonId);
    };

    const getButtonStyles = (buttonId: string) => {
      return `mr-2 px-4 py-1 hover:text-[#7E8937] rounded-md truncate ${
        activeButton === buttonId
          ? "text-[#7E8937] border-heading-stroke border-[1px] "
          : "text-main-text"
      }`;
    };

    return (
      <>
        <div className="flex flex-row flex-shrink-0 h-[45px] space-x-10 justify-center font-saira-condensed text-main-text items-end">
          <button
            onClick={() => handleButtonClick("button1")}
            className={getButtonStyles("button1")}
          >
            Friends
          </button>
          <button
            onClick={() => handleButtonClick("button2")}
            className={getButtonStyles("button2")}
          >
            Blocked
          </button>
          <button
            onClick={() => handleButtonClick("button3")}
            className={getButtonStyles("button3")}
          >
            Friend Requests
          </button>
          <button
            onClick={() => handleButtonClick("button4")}
            className={getButtonStyles("button4")}
          >
            Pending Friend Requests
          </button>
        </div>
      </>
    );
}
