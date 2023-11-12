import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { NotificationDropdownProps } from "../types";
import { useGameColor, useSocket } from "@/context/store";
import { TiTick } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { updateData } from "../../../../services/api";
//animate-ping -> for new notification gives animation

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  NotificationList,
  GameInviteNotificationList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { isNewNotification, setIsNewNotification } = useSocket();
  const { clicked, setClicked } = useGameColor();
  const router = useRouter();

  const openDropdown = () => {
    if (!isOpen) setIsOpen(true);
    setIsNewNotification("hidden");
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const acceptGameInvite = (notifId: string) => {
    toast.success("Game Invite Accepted");
    setIsOpen(false);
    setClicked(true);
    updateData({}, "/notification/updateClicked/" + notifId);
    router.push("/game");
  };
  const declineGameInvite = (notifId: string) => {
    toast.error("Game Invite Declined");
    setIsOpen(false);
    setClicked(true);
    updateData({}, "/notification/updateClicked/" + notifId);
  };
  return (
    <div>
      <div>
        <button onClick={openDropdown} className="btn-xs btn-ghost btn-circle">
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
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M8.6687 2.26665C8.47495 2.2029 8.27495 2.15331 8.0687 2.12498C7.4687 2.03998 6.8937 2.08956 6.3562 2.26665C6.53745 1.74248 6.98745 1.37415 7.51245 1.37415C8.03745 1.37415 8.48745 1.74248 8.6687 2.26665Z"
                stroke="#D5F223"
                fillOpacity="0.8"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity="0.4"
                d="M9.38745 13.5009C9.38745 14.6696 8.5437 15.6259 7.51245 15.6259C6.99995 15.6259 6.52495 15.385 6.18745 15.0025C5.84995 14.62 5.63745 14.0817 5.63745 13.5009"
                stroke="#D5F223"
                fillOpacity="0.8"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <circle
                cx="12"
                cy="13"
                r="3"
                fill="#CD5555"
                fillOpacity="0.93"
                className={isNewNotification}
              />
            </svg>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-[1000] rounded-3xl w-1/3 bg-notification-bg h-52 overflow-y-scroll  border-[0.2px] border-notification-stroke backdrop-blur-xl"
        >
          {GameInviteNotificationList.length || NotificationList.length ? (
            <>
              {NotificationList.length ? (
                <div className="py-2 space-y-2">
                  {NotificationList.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row px-1 py-1 my-1 mx-1 h-14 text-sm font-extralight text-table-row-text-color font-saira-condensed hover:text-gray-300 rounded-full bg-notification-row-bg"
                    >
                      <a href="#" className="flex space-x-6 w-full">
                        <div className="flex relative space-x-2 w-1/5 rounded-full w-25 bg-notification-img-bg">
                          <Image
                            src="/avatar1.png"
                            alt="tmp"
                            width={40}
                            height={40}
                          />
                          <h1 className="truncate max-w-[70px] pt-4">
                            {item.sender.login}
                          </h1>
                          <span className="absolute bottom-1 left-4 w-2 h-2 bg-green-400 dark:border-gray-800 rounded-full"></span>
                        </div>
                        <div className="truncate w-3/5 py-1 pt-4 max-w-[200px]">
                          {item.content}
                        </div>
                        <div className="w-1/5 grow py-1 pt-4 text-end pr-2 text-dimmed-text">
                          {item.recivedAt}
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              ) : null}
              {GameInviteNotificationList.length ? (
                <>
                  {GameInviteNotificationList.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row px-1 py-1 my-1 mx-1 h-14 text-sm font-extralight text-table-row-text-color font-saira-condensed hover:text-gray-300 rounded-full bg-notification-row-bg"
                    >
                      <div className="flex space-x-6 w-full">
                        <div className="flex relative space-x-2 w-1/5 rounded-full w-25 bg-notification-img-bg">
                          <Image
                            src="/avatar1.png"
                            alt="tmp"
                            width={40}
                            height={40}
                          />
                          <h1 className="truncate max-w-[70px] pt-4">
                            {item.sender.login}
                          </h1>
                          <span className="absolute bottom-1 left-4 w-2 h-2 bg-green-400 dark:border-gray-800 rounded-full"></span>
                        </div>
                        <div className="truncate w-3/5 py-1 pt-4 max-w-[200px]">
                          {item.content}
                        </div>
                        <>
                          {item.isAccepted ? (
                            <p className="grid  place-content-center w-full h-full text-main-text">
                              Accepted/Declined
                            </p>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  acceptGameInvite(item.id);
                                }}
                                className="hover:bg-heading-fill p-2 rounded-full"
                              >
                                <TiTick className="" color="green" size={30} />
                              </button>
                              <button
                                onClick={() => {
                                  declineGameInvite(item.id);
                                }}
                                className="hover:bg-heading-fill p-2 rounded-full"
                              >
                                <TiCancel color="red" size={30} />
                              </button>
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </>
          ) : (
            <p className="grid  place-content-center w-full h-full text-main-text">
              No New Notifications.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
