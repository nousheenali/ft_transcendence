import React from "react";
import Friend from "@/components/Chat/Friends/Friend/Friend";
import { friends } from "./FriendsListExample";

export default function FriendssBox() {
  return (
    <div className="flex flex-col w-full h-1/3 rounded-xl pl-7 overflow-y-scroll scroll-container">
      {friends.map((OneFriend, index) => (
        <div className="py-1">
          <Friend
            key={index}
            friend={OneFriend.friend}
          />
        </div>
      ))}
    </div>
  );
}