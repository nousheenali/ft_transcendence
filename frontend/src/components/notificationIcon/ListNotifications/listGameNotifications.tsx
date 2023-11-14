import Image from "next/image";
import { TiCancel, TiTick } from "react-icons/ti";
import { NotificationItems } from "../types";

export const GameNotificationsList = ({
  GameInviteNotificationList,
  acceptGameInvite,
  declineGameInvite,
}: {
  GameInviteNotificationList: NotificationItems[];
  acceptGameInvite: (notifId: NotificationItems) => void;
  declineGameInvite: (notifId: NotificationItems) => void;
}) => {
  return (
    <>
      {GameInviteNotificationList.length ? (
        <>
          {GameInviteNotificationList.map((item, index) => (
            <div
              key={index}
              className="flex flex-row px-1 py-1 my-1 mx-1 h-14 text-sm font-extralight text-table-row-text-color font-saira-condensed hover:text-gray-300 rounded-full bg-notification-row-bg"
            >
              <div className="flex space-x-6 w-full  justify-between">
                <div className="flex relative space-x-2 w-1/5 rounded-full w-25 bg-notification-img-bg">
                  {/* <Image src="/avatar1.png" alt="tmp" width={40} height={40} /> */}
                  <Image src="/avatar1.png" alt="tmp" width={40} height={40} />
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
                    <p className="place-content-center text-center pt-3 pr-3 text-main-text">
                      Accepted/Declined
                    </p>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          acceptGameInvite(item);
                        }}
                        className="hover:bg-heading-fill p-2 rounded-full"
                      >
                        <TiTick className="" color="green" size={30} />
                      </button>
                      <button
                        onClick={() => {
                          declineGameInvite(item);
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
  );
};
