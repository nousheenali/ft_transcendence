import Image from "next/image";
import { userInformation } from "@/components/Profile/types";
import { IoGameController } from "react-icons/io5";
import { Button } from "react-daisyui";
import { sendNotification } from "../../../../../../services/friends";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGameState, useSocket } from "@/context/store";
import { Content } from "@/components/notificationIcon/types";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export default function FriendsChatBoxHeader({
  friend,
}: {
  friend: userInformation | undefined;
}) {
  const { setIsQueue, setInviter, setInvitee } = useGameState();
  const { currentSocket } = useSocket();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleInviteClick = () => {
    inviteAndJoin();
  };
  const inviteAndJoin = () => {
    setIsQueue(false);
    setInviter(user.login!);
    setInvitee(friend?.login!);

    sendNotification(
      user.login,
      friend?.login!,
      Content.GameInvite_Recieved,
      currentSocket
    );
    router.push("/game");
    toast.success(`Invited ${friend?.login!} Successfully`, {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  if (!friend) return null;
  return (
    <div className="indicator w-full h-32 flex justify-between items-center rounded-xl bg-main-theme text-main-texts border-b border-main-yellow px-3">
      <div className="flex  items-center ">
        <div className="indicator px-1 relative">
          <div className="rounded-full w-[65px] h-[65px] overflow-hidden border-2 border-main-yellow">
            <Image
              alt={friend.name}
              src={friend.avatar}
              width={65}
              height={65}
            />
          </div>
          {/* If the player is online, the indicator will be green; otherwise, red */}
          {friend.isOnline ? (
            <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-12 top-11"></span>
          ) : (
            <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-12 top-11"></span>
          )}
        </div>
        <div className="flex flex-col font-saira-condensed pl-3 pt-5">
          <span className="text-main-text text-lg font-light">
            {friend.name}
          </span>
          {friend.isOnline ? (
            <p className="text-dimmed-text font-thin">online</p>
          ) : (
            <p className="text-dimmed-text font-thin">offline</p>
          )}
        </div>
      </div>
      {/* [3]
      invite user to plat a game button
      in the chat box header
       */}
      <div className="flex flex-row justify-center items-center basis-1/6">
        <Button
          color="ghost"
          className="flex flex-row"
          onClick={handleInviteClick}
        >
          <p>INVITE</p>
          <IoGameController size={25} color={"rgba(213, 242, 35, 0.8)"} />
        </Button>
      </div>
      {/* ---------------------------------------------------------------------------------- */}
    </div>
  );
}
