import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { NotificationDropdownProps } from "../types";
import { useGameColor, useSocket } from "@/context/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { updateData } from "../../../../services/api";
import { NotificationIcon } from "../notificationIcon";
import { GameNotificationsList } from "../ListNotifications/listGameNotifications";
import { NormalNotificationsList } from "../ListNotifications/listNormalNotifications";
import { ListAllNotifications } from "../ListNotifications/listAllNotifications";
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
          <NotificationIcon isNewNotification={isNewNotification} />
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-[1000] rounded-3xl w-1/3 bg-notification-bg h-52 overflow-y-scroll  border-[0.2px] border-notification-stroke backdrop-blur-xl"
        >
          <>
            <ListAllNotifications
              normalNotifications={NotificationList}
              GameInviteNotificationList={GameInviteNotificationList}
              acceptGameInvite={acceptGameInvite}
              declineGameInvite={declineGameInvite}
            />
          </>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
