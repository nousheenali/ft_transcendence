import React, { useEffect, useState } from 'react';
import ChannelUser from '@/components/Chat/ChannelsSideBar/ChannelUsers/User/ChannelUser';
import {ChannelUserProps} from "@/components/Chat/types";

/**
 * A function that fetches the channels users data from the channels_users.json file in the data folder,
 * and returns a promise that resolves to an array of users.
 * @returns {Promise<ChannelUserProps[]>} A promise that resolves to an array of users
 * @async
 */

const getUsers = async () => {
  try {
    const data = await import('../../../../../data/channels_users.json');
    return data.users; // Return the 'users' array from the data
  } catch (error) {
    console.error('Error fetching friends data:', error);
    return []; // Return an empty array in case of error
  }
};

/**
 * The ChannelsUsersBox component is responsible for rendering the ChannelsUsersBox part of the Chat page,
 * it is also responsible for managing the state of the ChannelsUsersBox part of the Chat page.
 * 
 * The state of the ChannelsUsersBox part of the Chat page is managed by the {users} state, which is an array
 * of objects that contains the data of the users. The {users} state is passed to the ChannelUser component as a prop
 * and it is used to render the users.
 * 
 * The {isLoading} state is used to determine whether the data is still loading or not, if the data is still loading
 * then the loading spinner will be rendered, otherwise the users will be rendered.
 * 
 * The {useEffect} hook is used to fetch the users data from the channels_users.json file in the data folder.
 */

export default function ChannelsUsersBox() {
  const [users, setUsers] = useState<ChannelUserProps[]>([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getUsers().then((users) => {
		setUsers(users);
      setLoading(false)
    });
  }, []);

  if (isLoading) return (<span className="loading loading-ring loading-lg text-main-yellow"></span>);
  if (!users) return (<p>No users data</p>);

  return (
    <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {users.map((OneUser, index) => (
        <div key={index}>
          <ChannelUser
            key={index}
            user={OneUser.user}
          />
        </div>
      ))}
    </div>
  );
}