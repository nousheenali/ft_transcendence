import { userInformation } from "@/components/Profile/types";
import { getData } from "./api";


export const getFriendsData = async (login: string, endpoint: string): Promise<userInformation[]> => {
  try {
    const friends: userInformation[] = await getData<userInformation[]>(login, endpoint);
    return friends;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
