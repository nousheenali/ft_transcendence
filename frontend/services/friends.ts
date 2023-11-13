import { friendRelationDto, userInformation } from "@/components/Profile/types";
import { deleteData, getData, postData, updateData } from "./api";
import { Content, SendNotification } from "@/components/notificationIcon/types";
import { Socket } from "socket.io-client";
import { sendNotificationSound } from "@/components/notificationIcon";

// a function to send a notification to a user, now used for a friend request, can be used for all differnt types of notifications
export const sendNotification = async (
  senderId: string,
  userId: string,
  content: Content,
  SocketToSend: Socket
) => {
  try {
    const user = await getData<userInformation>(userId, "/user/getByLogin/");
    const friend = await getData<userInformation>(
      senderId,
      "/user/getByLogin/"
    );
    const notification: SendNotification = {
      content: content,
      userId: user.id,
      senderId: friend.id,
      read: false,
    };
    sendNotificationSound(SocketToSend, notification);
    return postData<SendNotification>(notification, "/notification/create");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFriendsData = async (
  login: string,
  endpoint: string
): Promise<userInformation[]> => {
  try {
    const friends: userInformation[] = await getData<userInformation[]>(
      login,
      endpoint
    );
    return friends;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createFriendRelation = async (
  login: string,
  friendLogin: string,
  endpoint: string,
  SocketToSend: Socket
) => {
  try {
    const data: friendRelationDto = {
      userLogin: login,
      friendLogin: friendLogin,
    };
    const res = await postData<friendRelationDto>(data, endpoint);
    sendNotification(
      login,
      friendLogin,
      Content.FriendRequest_Recieved,
      SocketToSend
    ); // send a notification to the friend that they get a friend request
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateFriendRelation = async (
  login: string,
  friendLogin: string,
  endpoint: string
) => {
  try {
    const data: friendRelationDto = {
      userLogin: login,
      friendLogin: friendLogin,
    };
    return updateData<friendRelationDto>(data, endpoint);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteFriendRelation = async (
  login: string,
  friendLogin: string,
  endpoint: string
) => {
  try {
    const data: friendRelationDto = {
      userLogin: login,
      friendLogin: friendLogin,
    };
    return deleteData<friendRelationDto>(data, endpoint);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
