import FriendsBox from "@/components/Chat/Friends/FriendsSideBar/FriendsList/FriendsBox/FriendsBox";
import MessagesList from "@/components/Chat/Friends/FriendsSideBar/LatesMessages/MessagesList/MessagesList";
import FriendsBoxHeader from "@/components/Chat/Friends/FriendsSideBar/FriendsList/FriendsBoxHeader/FriendsBoxHeader";

export default function FriendsSideBar() {
  return (
    <>
      <MessagesList />
      <hr className="w-80 border-line-break" />
      <FriendsBoxHeader />
      <FriendsBox />
      <hr className="w-80 border-line-break" />
    </>
  );
}
