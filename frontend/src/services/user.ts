import { API_ENDPOINTS } from "../../config/apiEndpoints";
import { userInformation } from "@/components/Profile/types";
import { getData, postData, updateData, postDataWithImage } from "./api";
import {
  SettingDetailsProps,
  UpdateName,
  UpdateImg,
} from "@/components/Setting/types";
import { error } from "console";

export const getUserData = async (login: string, endpoint: string) => {
  try {
    const user: userInformation = await getData<userInformation>(
      login,
      endpoint
    );
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserGameData = async (login: string, endpoint: string) => {
  try {
    const InGame: boolean = await getData<boolean>(
      login,
      endpoint
    );
    return InGame;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getBlockList = async (login: string, endpoint: string) => {
  try {
    const users: string[] = await getData<string[]>(login, endpoint);
    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const updateUserName = async (
  login: string,
  newName: string,
  endpoint: string
) => {
  try {
    const data: UpdateName = {
      login: login,
      name: newName,
    };
    return updateData(data, endpoint + login);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserMuteStatus = async (login: string, endpoint: string) => {
  try {
    const isMuted: boolean = await getData<boolean>(login, endpoint);
    return isMuted;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllUsersData = async (login: string, endpoint: string) => {
  try {
    const users: userInformation[] = await getData<userInformation[]>(
      login,
      endpoint
    );
    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserImg = async (
  login: string,
  newAvatar: File,
  endpoint: string
) => {
  try {
    const formData = new FormData();
    formData.append("file", newAvatar);
    return postDataWithImage(formData, endpoint + login);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
