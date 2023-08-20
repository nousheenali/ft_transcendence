import React, { useState } from "react";

interface NotificationItem {
  username: string;
  image: string;
  message: string;
  time: string;
}

interface NotificationDropdownProps {
  NotificationList: NotificationItem[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({NotificationList}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <button onClick={toggleDropdown} className="btn-xs btn-ghost">
          <div className="flex items-center justify-center rounded-2xl w-6 h-6 bg-gray-500 hover:bg-[#696A71] opacity-70 p-1 ">
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
            >
              <path
                d="M7.51249 2.06128C5.44374 2.06128 3.76249 3.9667 3.76249 6.31128V8.35836C3.76249 8.79045 3.59999 9.4492 3.40624 9.81753L2.68749 11.1704C2.24374 12.0063 2.54999 12.9342 3.36249 13.2459C6.05624 14.2659 8.96249 14.2659 11.6562 13.2459C12.4125 12.9625 12.7437 11.9496 12.3312 11.1704L11.6125 9.81753C11.425 9.4492 11.2625 8.79045 11.2625 8.35836V6.31128C11.2625 3.97378 9.57499 2.06128 7.51249 2.06128Z"
                stroke="#D5F223"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M8.6687 2.26665C8.47495 2.2029 8.27495 2.15331 8.0687 2.12498C7.4687 2.03998 6.8937 2.08956 6.3562 2.26665C6.53745 1.74248 6.98745 1.37415 7.51245 1.37415C8.03745 1.37415 8.48745 1.74248 8.6687 2.26665Z"
                stroke="#D5F223"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M9.38745 13.5009C9.38745 14.6696 8.5437 15.6259 7.51245 15.6259C6.99995 15.6259 6.52495 15.385 6.18745 15.0025C5.84995 14.62 5.63745 14.0817 5.63745 13.5009"
                stroke="#D5F223"
                stroke-opacity="0.8"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
              <circle
                cx="12"
                cy="13"
                r="3"
                fill="#CD5555"
                fill-opacity="0.93"
              />
            </svg>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-1000 rounded-md w-1/3 bg-grid-bg max-h-48 overflow-y-auto border border-aside-border backdrop-blur-xl">
          <div className="py-1" role="none">
            {NotificationList.map((item, index) => (
              <div className="flex flex-row space-x-4 px-4 py-2 my-4 mx-2 text-md font-saira-condensed text-gray-500 bg-gray-900 hover:text-gray-400 rounded-full">
                <a key={index} href="#" className="">
                  <div className="flex space-x-5">
                    <div className="flex rounded-full px-2 bg-grid-bg">
                      <div className="py-1">
                        <img
                          className="w-8 h-8 mr-2"
                          src="/av1.svg"
                          alt="Image 1"
                        />
                      </div>
                      <div className="truncate max-w-[100px] pt-2">
                        {item.username}
                      </div>
                    </div>
                    <div className="py-1 pt-2 truncate max-w-[200px]">
                      {item.message}
                    </div>
                    <div className="py-1 pt-2">{item.time}</div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
