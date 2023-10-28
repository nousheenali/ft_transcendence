import React, { useEffect, useState } from 'react'
import NotificationDropdown from './NotificationDropdown/NotificationDropdown';
import { NotificationItems } from './types';
import { useSession } from 'next-auth/react';
import { Session } from 'inspector';

const fetchData = async (session: any) => {
  try {
    // console.log("sessin: ", session.user.login);
    const getUserByLogin = await fetch("http://localhost:3001/user/getByLogin/" + session.user.login)
      .then((res) => res.json());
    if (getUserByLogin) {
      const data = await fetch("http://localhost:3001/notification/getById/" + getUserByLogin.id)
        .then((res) => res.json());
      return data;
    }
    console.log("data: ", getUserByLogin);
    return [];
  }
  catch (error) {
    return [];
  }
};

export default function NotificationIcon() {
  const [isChecked, setIsChecked] = useState(true);
  const session = useSession();

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  const [notifications, setNotifications] = useState<NotificationItems[]>([]);

  useEffect(() => {
    fetchData(session).then((data) => {
      setNotifications(data);
    });
  }, []);

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
  )
}
