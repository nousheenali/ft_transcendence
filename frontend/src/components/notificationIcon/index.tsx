import React,{ useEffect, useState } from 'react'
import NotificationDropdown from './NotificationDropdown/NotificationDropdown';
import { NotificationItem} from './types';

const fetchData = async () => {
  try {
    const data = await import("../../data/notifications.json");
    return data.notifications;
  } 
  catch (error) {
    return [];
  }
};

export default function NotificationIcon() {
    const [isChecked, setIsChecked] = useState(true);

    const handleToggleChange = () => {
      setIsChecked(!isChecked);
    };

    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    useEffect(() => {
      fetchData().then((data) => {
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
