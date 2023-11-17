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

export const getUserMuteStatus = async (login: string, endpoint: string) => {
  try {
    const isMuted: boolean = await getData<boolean>(login, endpoint);
    return isMuted;
  } catch (error: any) {
    throw new Error(error.message);
  }
};