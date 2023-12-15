import {
  ChannelsProps,
  ChannelUserProps,
  MessagesProps,
} from "@/components/Chat/types";
import { getData } from "./api";

/**==============================================================================================
 * ╭── 🟣
 * ├ 👇 Helper function to fetch the channels of a user.
 * └── 🟣
 * @param login The login of the user
 * @param endpoint The endpoint in the channel service to fetch the data from
 * @returns The channels of the user
 **/
export const getChannelsData = async (login: string, endpoint: string) => {
  try {
    const channels: ChannelsProps[] = await getData<ChannelsProps[]>(
      login,
      endpoint
    );
    return channels;
  } catch (error: any) {
    // console.log(error.message);
    throw new Error(error.message);
  }
};

/**==============================================================================================
 * ╭── 🟣
 * ├ 👇 Helper function to fetch the current channel data.
 * └── 🟣
 * @param login The login of the user
 * @param endpoint The endpoint in the channel service to fetch the data from
 * @returns The channels of the user
 **/
export const getCurrentChannelData = async (login: string, endpoint: string) => {
  try {
    const channel: ChannelsProps = await getData<ChannelsProps>(
      login,
      endpoint
    );
    return channel;
  } catch (error: any) {
    // console.log(error.message);
    throw new Error(error.message);
  }
};

/**==============================================================================================
 * ╭── 🟣
 * ├ 👇 Helper function to fetch the channel's user.
 * └── 🟣
 * @param login The login of the user
 * @param endpoint The endpoint in the channel service to fetch the data from
 * @returns The users of the channel
 **/

export const getChannelUsersData = async (login: string, endpoint: string) => {
  try {
    const channelUsers: ChannelUserProps[] = await getData<ChannelUserProps[]>(
      login,
      endpoint
    );
    return channelUsers;
  } catch (error: any) {
    // console.log(error.message);
    throw new Error(error.message);
  }
};

/**==============================================================================================
 * ╭── 🟣
 * ├ 👇 Helper function to fetch the channel's messages.
 * └── 🟣
 * @param login The login of the user
 * @param endpoint The endpoint in the channel service to fetch the data from
 * @returns The messages of the channel
 **/

export const getChannelMessagesData = async (
  login: string,
  endpoint: string
) => {
  try {
    const channelMessages: MessagesProps[] = await getData<MessagesProps[]>(
      login,
      endpoint
    );
    return channelMessages;
  } catch (error: any) {
    // console.log(error.message);
    throw new Error(error.message);
  }
};
