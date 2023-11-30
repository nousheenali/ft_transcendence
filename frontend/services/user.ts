import { userInformation } from "@/components/Profile/types";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { getData } from "./api";

export const getUserData = async (login: string, endpoint: string) => {
  try {
    const user: userInformation = await getData<userInformation>(login, endpoint);
    return user;
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