import ChatElements from "@/components/Chat/ChatElements";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getChannelsData } from "../../../../services/channels";
import { getUserMessages } from "../../../../services/userMessages";

import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { ChannelsProps, MessagesProps } from "@/components/Chat/types";

export default async function Chat() {
  const session = await getServerSession(options);
  const login = session?.user.login!;
  const allChannels: ChannelsProps[] = await getChannelsData(
    login,
    API_ENDPOINTS.allChannels
  );

  const userMessages: MessagesProps[] = await getUserMessages(
    login,
    API_ENDPOINTS.userMessages
  );

  return <ChatElements channels={allChannels} login={login} />;
}
