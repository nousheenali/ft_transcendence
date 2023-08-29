import FriendsChatBoxHeader from "./FriendsChatBoxHeader/FriendsChatBoxHeader";
import FriendChat from "./FriendChat/FriendChat";
import SendMessageBox from "../SendMessageBox/SendMessageBox"


export default function FriendsChatBox() {
  return (
    <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl">
      <FriendsChatBoxHeader
        senderName = {"Yonatan Monges"}
        senderAvatar = {{alt:"Yonatan Monges", src:"av1.svg"}}
        isOnline = {true}
        />
      <FriendChat />
      <SendMessageBox />
    </div>
  );
}
