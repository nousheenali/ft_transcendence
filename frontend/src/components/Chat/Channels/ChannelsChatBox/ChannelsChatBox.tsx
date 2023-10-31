import ChannelChatBoxHeader from "./ChannelChatBoxHeader/ChannelChatBoxHeader";
import ChannelChat from "./ChannelChat/ChannelChat";
import SendMessageBox from "../../ChatBox/SendMessageBox/SendMessageBox";
import { ChannelsProps } from "../../types";

export default function ChannelsChatBox({
  channel,
}: {
  channel: ChannelsProps;
}) {
  return (
    <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col justify-between border-b border-main-yellow bg-box-fill rounded-xl">
      <ChannelChatBoxHeader channel={channel} />
      <ChannelChat channel={channel} />
      <SendMessageBox receiver={channel}/>
    </div>
  );
}
