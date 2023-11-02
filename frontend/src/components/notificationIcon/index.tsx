"use client";
import React, { useEffect, useState } from "react";
import NotificationDropdown from "./NotificationDropdown/NotificationDropdown";
import { NotificationItems, SendNotification } from "./types";
import { useSession } from "next-auth/react";
import { Socket, io } from "socket.io-client";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";
import { getUserData } from "../../../services/user";
import { useSocket } from "@/context/store";

const fetchData = async (activeUser: string | null) => {
  try {
    const getUserByLogin = await fetch(
      "http://localhost:3001/user/getByLogin/" + activeUser
    ).then((res) => res.json());
    if (getUserByLogin) {
      const data = await fetch(
        "http://localhost:3001/notification/getById/" + getUserByLogin.id
      ).then((res) => res.json());
      return data;
    }
    return [];
  } catch (error) {
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
  const session = useSession();
  const activeUser = session.data?.user.name || null;

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  const [notifications, setNotifications] = useState<NotificationItems[]>([]);

  const { data: sessions } = useSession();
  const [userData, setUserData] = useState<string>("");
  const [newNotification, setNewNotification] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { currentSocket, setCurrentSocket } = useSocket();

  function playSound(url: string) {
    const audio = new Audio(url);
    audio.play();
  }

  useEffect(() => {
    if (sessions && userData) {
      const socket = io("http://localhost:8001", {
        query: { userId: userData },
      });
      socket.on("connect", () => {
        console.log("connected", socket.id);
        setSocket(socket);
        setCurrentSocket(socket);
      });
      socket.on("newNotif", (data) => {
        setNewNotification(true);
        playSound("notif.m4a");
      });

      return () => {
        console.log("unregistering");
        socket.off("connect");
        socket.off("newNotif");
      };
    }
  }, [sessions, userData]);

  useEffect(() => {
    if (sessions) {
      getUserData(sessions?.user.login!, API_ENDPOINTS.getUserbyLogin)
        .then((userData) => {
          setUserData(userData.id);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [sessions]);

  useEffect(() => {
    if (session) {
      fetchData(activeUser).then((data) => {
        setNotifications(data);
        setNewNotification(false);
      });
    }
  }, [activeUser, session, newNotification]);
  return (
    <div className=" flex  justify-between w-17 h-17 bg-heading-fill rounded-t-2xl border-b-[1px] border-heading-stroke p-2">
      <NotificationDropdown NotificationList={notifications} />
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
