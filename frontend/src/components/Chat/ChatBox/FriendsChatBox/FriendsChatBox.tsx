import FriendsChatBoxHeader from "./FriendsChatBoxHeader/FriendsChatBoxHeader";
import FriendChat from "./FriendChat/FriendChat";

export default function FriendsChatBox() {
  return (
    <div className="overflow-y-scroll">
      <FriendsChatBoxHeader />
      <FriendChat />
    </div>
  );
}