import ChatElements from "@/components/Chat/ChatElements";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getChannelsData } from "../../../../services/channels";
import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { ChannelsProps } from "@/components/Chat/types";


export default async function Chat() {
  const session = await getServerSession(options);
  const login = session?.user.login!;
  const allChannels: ChannelsProps[] = await getChannelsData(login, API_ENDPOINTS.allChannels);

  return <ChatElements channels={allChannels}/>; 
}
