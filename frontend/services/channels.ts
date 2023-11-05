import { ChannelsProps } from "@/components/Chat/types";
import { getData } from "./api";

/**
 * Helper function to fetch the channels of a user.
 * @param login The login of the user
 * @param endpoint The endpoint in the channel service to fetch the data from
 * @returns The channels of the user
 */
export const getChannelsData = async (login: string, endpoint: string) => {
  try {
    const channels: ChannelsProps[] = await getData<ChannelsProps[]>(
      login,
      endpoint
    );
    return channels;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
