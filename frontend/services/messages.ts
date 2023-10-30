import { MessagesProps } from "@/components/Chat/types";
import { getData } from "./api";

//============================================================================================//

/**
 * Helper function to fetch the messages of a user.
 * @param login The login of the user
 * @param endpoint The endpoint in the messages service to fetch the data from
 * @returns The channels of the user
 */
export const getMessages = async (login: string, endpoint: string) => {
  try {
    const messages: MessagesProps[] = await getData<MessagesProps[]>(
      login,
      endpoint
    );
    return messages;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

//============================================================================================//