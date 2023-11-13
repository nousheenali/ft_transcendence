import { NotificationItems } from "../types";
import { GameNotificationsList } from "./listGameNotifications";
import { NormalNotificationsList } from "./listNormalNotifications";

{
  /* 
Component to list all Notifications
*/
}

export const ListAllNotifications = ({
  GameInviteNotificationList,
  normalNotifications,
  acceptGameInvite,
  declineGameInvite,
}: {
  GameInviteNotificationList: NotificationItems[];
  normalNotifications: NotificationItems[];
  acceptGameInvite: (notifId: string) => void;
  declineGameInvite: (notifId: string) => void;
}) => {
  return (
    <>
      {GameInviteNotificationList.length || normalNotifications.length ? (
        <>
          {/* Component to list all normal Notifications */}
          <NormalNotificationsList normalNotifications={normalNotifications} />
          {/* Component to list all game Notifications */}
          <GameNotificationsList
            GameInviteNotificationList={GameInviteNotificationList}
            acceptGameInvite={acceptGameInvite}
            declineGameInvite={declineGameInvite}
          />
        </>
      ) : (
        <p className="grid  place-content-center w-full h-full text-main-text">
          No New Notifications.
        </p>
      )}
    </>
  );
};
