import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { useGameColor } from "@/context/store";
import { useSession } from "next-auth/react";
import { getUserData } from "../../../services/user";
import { userInformation } from "../Profile/types";

export default function QueueAndInvite() {
  const { data: session } = useSession();
  interface Tfriends {
    id: string;
    name: string;
  }
  const [FriendsList, setFriendsList] = useState<Tfriends[]>([
    { id: "0", name: "Default" },
  ]);
  const userName = session?.user.login!;

  const FetchUserData = async () => {
    let result: any = await getUserData(userName, "/friends/allFriends/");
    const filter = result?.filter(
      (item: userInformation) => !item.inAGame && item.isOnline
    );
    const combolist = filter?.map((item: userInformation) => ({
      name: item.login,
      id: item.id,
    }));
    setFriendsList([]);
    setFriendsList([{ id: "0", name: "Default" }]);
    setFriendsList((prevFriendsList) => [...prevFriendsList, ...combolist]);
  };

  // useEffect(() => {
  //   if (!userName) return;
  //   FetchUserData();
  //   // console.log("friendsList: ", FriendsList);
  // }, [session, userName]);

  const { invitee, setInvitee } = useGameColor();
  const handleNameChoice = (friendName: string) => {
    // console.log(friendName);
    setInvitee(friendName);
  };
  const dropdownStyles = {
    select:
      "hover-bg-heading text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-xl w-34 h-8 p-1 w-[130px] flex flex-row justify-between",
    option: "text-main-text p-10",
  };
  if (FriendsList.length === 0) {
    return <div></div>;
  }
  return (
    <div className="text-placeholder-text font-saira-condensed normal-case text-xl bg-main bg-aside-fill border-2 border-aside-border rounded-2xl flex flex-row gap-4  mx-8 pl-2 w-72 text-[20px] font-bold pb-2">
      <div className="text-main-yellow py-10">OR</div>
      <div className="flex flex-col gap-4 pt-4 overflow-hidden w-full">
        <button
        //  border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx-4
          className="text-main-text font-saira-condensed flex flex-row gap-4 items-center "
          disabled={invitee !== "Default"}
          onClick={() => {
            console.log("invitee: ", invitee);
          }}
        >
          <Image
            src="/Queue_icon.svg"
            width={18}
            height={18}
            className="inline-block ml-2"
            alt="DropDown_icon"
          />
          <h1>Join A queue</h1>
        </button>
        <div className="flex flex-row items-center gap-3">
          <Image
            src="/InviteFriends_icon.svg"
            width={18}
            height={18}
            className="inline-block ml-2 "
            alt="DropDown_icon"
          />
          <h1 className="text-main-text font-saira-condensed">Invite</h1>

          <div className="relative w-[130px]" onClick={FetchUserData}>
            <select
              value={invitee}
              onChange={(e) => handleNameChoice(e.target.value)}
              className={dropdownStyles.select}
            >
              {FriendsList &&
                FriendsList.length > 0 &&
                FriendsList.map((items) => (
                  <option
                    key={items.id}
                    value={items.name}
                    className={dropdownStyles.option}
                  >
                    {items.name}
                  </option>
                ))}
            </select>
            <Image
              src="/DropDown_icon.svg"
              width={10}
              height={10}
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              alt="DropDown_icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
