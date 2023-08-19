import React from "react";
import Friend from "@/components/Chat/Friends/Friend/Friend";
import { friends } from "./FriendsListExample";

export default function FriendsBox() {
  return (
    <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {friends.map((OneFriend, index) => (
        <div>
          <Friend
            key={index}
            friend={OneFriend.friend}
          />
        </div>
      ))}
    </div>
  );
}