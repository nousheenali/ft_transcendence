import React,{ useState } from 'react'
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';

interface NotificationItem {
  username: string;
  image: string;
  message: string;
  time: string;
}

const List: NotificationItem[] = [
  {
    username: "Long1",
    image: "/av1.svg",
    message: "Requested your friendship",
    time: "2 min ago",
  },
  {
    username: "User2",
    image: "/av1.svg",
    message: "Sent you a message",
    time: "4 min ago",
  },
  {
    username: "User3",
    image: "/av1.svg",
    message: "Invited you to play a match",
    time: "5 min ago",
  },
  {
    username: "User4",
    image: "/av1.svg",
    message: "Sent you a message",
    time: "8 min ago",
  },
  {
    username: "User5",
    image: "/av1.svg",
    message: "Invited you to play a match",
    time: "10 min ago",
  },
];

export default function NotificationIcon() {
    const [isChecked, setIsChecked] = useState(true);
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
	     <div className=" flex  justify-between w-17 h-17 bg-heading-fill rounded-t-2xl border-b-[1px] border-heading-stroke p-2">
        <NotificationDropdown NotificationList={List} />
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
