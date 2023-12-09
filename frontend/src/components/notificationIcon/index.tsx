"use client";
import React, { useContext, useEffect, useState } from "react";
import NotificationDropdown from "./NotificationDropdown/NotificationDropdown";
import { NotificationItems, SendNotification } from "./types";

import { Socket, io } from "socket.io-client";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";
import { getUserData } from "../../../services/user";
import { useGameState, useSocket } from "@/context/store";
import { AuthContext } from "@/context/AuthProvider";

const fetchData = async (activeUser: string | null) => {
  try {
    const getUserByLogin = await fetch(
      `${process.env.NESTJS_URL}/user/getByLogin/` + activeUser,
      {
        credentials: "include", // Include credentials here
      }
    ).then((res) => res.json());

    if (getUserByLogin) {
      const data = await fetch(
        `${process.env.NESTJS_URL}/notification/getById/` + getUserByLogin.id,
        {
          credentials: "include", // Include credentials here
        }
      ).then((res) => res.json());

      return data;
    }
    return [];
  } catch (error) {
    console.log(error); // It's usually a good idea to log the error for debugging purposes
    return [];
  }
};

// const notificationData: SendNotification = {
//   content: "FriendRequest_Recieved",
//   read: true,
//   senderId: "2699479c-379b-4d96-8b43-fdabe2178aef",
//   userId: "7872e1aa-4958-41b3-a53c-84374934bc9b",
// };
export const sendNotificationSound = (
  sendTo: Socket,
  notification: SendNotification
) => {
  if (sendTo) {
    sendTo.emit("newNotif", notification);
  }
};
export default function NotificationIcon() {
  const [isChecked, setIsChecked] = useState(true);
  const { user } = useContext(AuthContext);

  const activeUser = user.login || null;

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  const [notifications, setNotifications] = useState<NotificationItems[]>([]);
  const [gameInviteNotifications, setGameInviteNotifications] = useState<
    NotificationItems[]
  >([]);

  const [userData, setUserData] = useState<string>("");
  const [newNotification, setNewNotification] = useState<boolean>(false);
  const {
    currentSocket,
    setCurrentSocket,
    isNewNotification,
    setIsNewNotification,
  } = useSocket();

  const { clicked, setClicked } = useGameState();

  async function playSound(url: string) {
    const audio = new Audio(url);
    await audio.play();
  }

  useEffect(() => {
    if (user && userData) {
      const backendUrl = process.env.NEXT_NOTIFICATION_URL as string;
      const socket = io(backendUrl, {
        query: { userId: userData },
        withCredentials: true,
      });
      socket.on("connect", () => {
        console.log("connected", socket.id);
        setCurrentSocket(socket);
      });
      socket.on("newNotif", (data) => {
        setNewNotification(true);
        playSound("notif.m4a");
        setIsNewNotification("");
      });
      return () => {
        // console.log("unregistering");
        socket.off("connect");
        socket.off("newNotif");
      };
    }
  }, [user, userData]);

  useEffect(() => {
    if (user && user.login) {
      getUserData(user.login!, API_ENDPOINTS.getUserbyLogin)
        .then((userData) => {
          setUserData(userData.id);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.login) {
      fetchData(activeUser).then((data) => {
        setNotifications(
          data.filter(
            (items: NotificationItems) =>
              items.content !== "GameInvite_Recieved"
          )
        );
        setGameInviteNotifications(
          data.filter(
            (items: NotificationItems) =>
              items.content === "GameInvite_Recieved"
          )
        );
        // console.log("gameInvites: ", gameInviteNotifications);
        // console.log("notifications: ", notifications);
        setNewNotification(false);
        setClicked(false);
      });
    }
  }, [activeUser, user, newNotification, clicked]);
  return (
    <div className=" flex  justify-between w-17 h-17 bg-heading-fill rounded-t-2xl border-b-[1px] border-heading-stroke p-2">
      <NotificationDropdown
        NotificationList={notifications}
        GameInviteNotificationList={gameInviteNotifications}
      />
      <h1>
        <span className="text-yellow-300 text-stroke-3 ">Spin</span>
        <span className="text-main-text">Masters</span>
      </h1>
      <input
        type="checkbox"
        className="toggle w-15 h-6"
        checked={isChecked}
        onChange={handleToggleChange}
      />
    </div>
  );
}
