import { ChannelsProps } from "@/components/Chat/types";
// import { getData } from "./api";

const backendUrl = "http://localhost:3001";

export async function getData<T>(endpoint: string): Promise<T> {
	try {
	  const response = await fetch(`${backendUrl}${endpoint}`);
	  if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
		  `HTTP error!
			  Status: ${response.status}
			  Message: ${errorData.message}`
		);
	  }
	  const records = await response.json();
	  return records;
	} catch (error: any) {
	  throw new Error(error.message);
	}
  }

/**
 * Helper function to fetch the channels of a user.
 * @param endpoint The endpoint in the channel service to fetch the data from
 * @returns The channels of the user
 */
export const getChannelsData = async (endpoint: string) => {
	try {
	  const channels: ChannelsProps = await getData<ChannelsProps>(endpoint);
	  return channels;
	} catch (error: any) {
	  throw new Error(error.message);
	}
  };