import React, { useEffect, useState } from 'react';
import Friend from "@/components/Chat/MessagesSideBar/Friends/Friend/Friend";
import {ChatFriendsProps} from "@/components/Chat/types";

/**
 * A function that fetches the messages from the data/messages.json file (for now)
 * and later from the backend.
 * @returns {Promise<ChatFriendsProps[]>} A promise that resolves to an array of messages
 * @async
 */

const getMessages = async () => {
  try {
    const data = await import('../../../../../data/friends.json');
    return data.friends; // Return the 'friends' array from the data
  } catch (error) {
    console.error('Error fetching friends data:', error);
    return []; // Return an empty array in case of error
  }
};


export default function FriendsBox() {
  const [friends, setFriends] = useState<ChatFriendsProps[]>([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getMessages().then((friends) => {
      setFriends(friends);
      setLoading(false)
    });
  }, []);

  if (isLoading) return (<span className="loading loading-ring loading-lg text-main-yellow"></span>);
  if (!friends) return (<p>No friends data</p>);

  return (
    <div className="flex flex-col w-full h-1/4 px-1 rounded-xl overflow-y-scroll scroll-container">
      {friends.map((OneFriend, index) => (
        <div key={index}>
          <Friend
            key={index}
            friend={OneFriend.friend}
          />
        </div>
      ))}
    </div>
  );
}