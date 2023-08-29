import ChannelChatBoxHeader from "../ChannelsChatBox/ChannelChatBoxHeader/ChannelChatBoxHeader";
import ChannelChat from "../ChannelsChatBox/ChannelChat/ChannelChat";
import SendMessageBox from "../SendMessageBox/SendMessageBox";

export default function ChannelsChatBox() {
  return (
    <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl">
      <ChannelChatBoxHeader
        ChannelName={"42AbuDhabi"}
        ChannelAvatar={{ alt: "42AbuDhabi", src: "av1.svg" }}
        isPublic={true}
      />
      <ChannelChat />
      <SendMessageBox />
    </div>
  );
}
