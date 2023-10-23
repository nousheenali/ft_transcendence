import React, { useEffect, useState } from "react";
import ChannelUser from "@/components/Chat/ChannelsSideBar/ChannelUsers/User/ChannelUser";
import { ChannelUserProps } from "@/components/Chat/types";

export default function ChannelsUsersBox(data: {users: ChannelUserProps[]}) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (data.users) {
      setLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!data.users) return <p>No users data</p>;

  return (
    <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {data.users.map((OneUser, index) => (
        <div key={index}>
          <ChannelUser key={index} user={OneUser} />
        </div>
      ))}
    </div>
  );
}
