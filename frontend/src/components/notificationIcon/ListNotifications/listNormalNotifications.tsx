import Image from "next/image";
import { NotificationItems } from "../types";
import { activeClickedProfilePage } from "@/context/store";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

{
  /* 
Component to list all normal Notifications
*/
}
export const NormalNotificationsList = ({
  normalNotifications,
}: {
  normalNotifications: NotificationItems[];
}) => {
  const { activeButton, setActiveButton } = activeClickedProfilePage();
  const router = useRouter();

  const handleFriendRequestClick = () => {
    setActiveButton("friendRequests");
    router.push("/profile");
  };

  const handleNotificationClick = (notifType: string) => {
    if (notifType === "FriendRequest_Recieved") handleFriendRequestClick();
    console.log("notifType: ", notifType);
  };

  // const formattedTime = ;
  return (
    <>
      {normalNotifications.length ? (
        <div className="py-2 space-y-2 w-full ">
          {normalNotifications.map((item, index) => (
            <button
              key={index}
              className="flex flex-row px-1 py-1 my-1 mx-1 h-14 text-sm font-extralight text-table-row-text-color font-saira-condensed hover:text-gray-300 rounded-full bg-notification-row-bg w-full "
              onClick={() => {
                handleNotificationClick(item.content);
              }}
            >
              <a href="#" className="flex space-x-6 w-full justify-between">
                <div className="flex relative space-x-2 w-1/5 rounded-full w-25 bg-notification-img-bg">
                  <Image src="/avatar1.png" alt="tmp" width={40} height={40} />
                  <h1 className="truncate max-w-[70px] pt-4">
                    {item.sender.login}
                  </h1>
                  <span className="absolute bottom-1 left-4 w-2 h-2 bg-green-400 dark:border-gray-800 rounded-full"></span>
                </div>
                <div className="truncate w-3/5 py-1 pt-4 max-w-[200px]">
                  {item.content}
                </div>
                <div className="w-1/5 grow py-1 pt-4 text-end pr-2 text-dimmed-text">
                  {formatDistanceToNow(new Date(item.recivedAt), {
                    addSuffix: true,
                  })}
                </div>
              </a>
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
};
