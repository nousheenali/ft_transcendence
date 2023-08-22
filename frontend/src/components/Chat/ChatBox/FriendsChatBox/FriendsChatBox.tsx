import FriendsChatBoxHeader from "./FriendsChatBoxHeader/FriendsChatBoxHeader";

export default function FriendsChatBox() {
  return (
    <div className="w-full h-20 flex justify-between rounded-xl bg-main-theme text-main-texts font-saira-condensed border-b border-main-yellow">
      <FriendsChatBoxHeader />
    
    </div>
  );
}