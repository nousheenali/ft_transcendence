import ChannelChatBoxHeader from "../ChannelsChatBox/ChannelChatBoxHeader/ChannelChatBoxHeader";
import ChannelChat from "../ChannelsChatBox/ChannelChat/ChannelChat";
import SendMessageBox from "../SendMessageBox/SendMessageBox";
import { ChannelsProps } from "../../types";

export default function ChannelsChatBox(
  data: { channel: ChannelsProps },
  login: string
) {
  return (
    <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl">
      <ChannelChatBoxHeader channel={data.channel} />
      <ChannelChat data={{ channel: data.channel }} login={login} />
      <SendMessageBox />
    </div>
  );
}