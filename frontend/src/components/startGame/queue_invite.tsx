import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { useGameState } from "@/context/store";
import { getUserData } from "../../services/user";
import { userInformation } from "../Profile/types";
import { AuthContext } from "@/context/AuthProvider";

export default function QueueAndInvite() {
  const { user } = useContext(AuthContext);
  const userName = user.login!;

  const { invitee, setInvitee } = useGameState();

  interface Tfriends {
    id: string;
    name: string;
  }
  const [FriendsList, setFriendsList] = useState<Tfriends[]>([
    { id: "0", name: "Default" },
  ]);

  const FetchUserData = async () => {
    // setInvitee("Default");
    let result: any = await getUserData(userName, "/friends/allFriends/");
    const filter = result?.filter(
      (item: userInformation) => !item.inAGame && item.isOnline
    );
    const combolist = filter?.map((item: userInformation) => ({
      name: item.name,
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

  const handleNameChoice = (friendName: string) => {
    // console.log(friendName);
    setInvitee(friendName);
  };
  const dropdownStyles = {
    select:
      "hover-bg-heading text-placeholder-text font-saira-condensed normal-case bg-main bg-heading-fill border-1 border-aside-border rounded-2xl w-40 h-8 p-1 flex flex-row justify-between",
    option: "text-main-text",
  };
  if (FriendsList.length === 0) {
    return <div></div>;
  }
  return (
    <div className="flex flex-row items-center justify-around gap-2">
      <h1 className="text-main-text font-saira-condensed">Invite</h1>
      <div className="relative" onClick={FetchUserData}>
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
  );
}
