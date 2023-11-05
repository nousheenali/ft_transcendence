import { friendRelationDto, userInformation } from "@/components/Profile/types";
import { deleteData, getData, postData, updateData } from "./api";


export const getFriendsData = async (login: string, endpoint: string): Promise<userInformation[]> => {
  try {
    const friends: userInformation[] = await getData<userInformation[]>(login, endpoint);
    return friends;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createFriendRelation = async (
  login: string,
  friendLogin: string,
  endpoint: string
) => {
  try {
    const data: friendRelationDto = {
      userLogin: login,
      friendLogin: friendLogin,
    };
    return postData<friendRelationDto>(data, endpoint);
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const  updateFriendRelation = async (
  login: string,
  friendLogin: string,
  endpoint: string
) => {
  try {
    const data : friendRelationDto = {
      userLogin: login,
      friendLogin: friendLogin,
    };
    return (updateData<friendRelationDto>(data, endpoint));

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