import ChatElements from "@/components/Chat/ChatElements";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getChannelsData } from "../../../../services/channels";
import { getUserLatestMessages } from "../../../../services/userMessages";

import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { ChannelsProps, MessagesProps } from "@/components/Chat/types";

//============================================================================================//
export default async function Chat() {
  const session = await getServerSession(options);
  const login = session?.user.login!;

  const privateChannels: ChannelsProps[] = await getChannelsData(
    login,
    API_ENDPOINTS.privateChannels
  );

  const publicChannels: ChannelsProps[] = await getChannelsData(
    login,
    API_ENDPOINTS.publicChannels
  );

  const latestMessages: MessagesProps[] = await getUserLatestMessages(
    login,
    API_ENDPOINTS.userLatestMessages
  );
  return (
    <ChatElements channels={allChannels} latestMessages={latestMessages} />
  );
}

//============================================================================================//
