import ChatSearch from "@/components/Chat/Friends/FriendsSideBar/MessagesSearch/ChatSearch";
import FriendsBox from "@/components/Chat/Friends/FriendsSideBar/FriendsList/FriendsBox/FriendsBox";
import MessagesList from "@/components/Chat/Friends/FriendsSideBar/LatesMessages/MessagesList/MessagesList";
import FriendsSearch from "@/components/Chat/Friends/FriendsSideBar/FriendsList/FriendsSearch/FriendsSearch";
import FriendsBoxHeader from "@/components/Chat/Friends/FriendsSideBar/FriendsList/FriendsBoxHeader/FriendsBoxHeader";

export default function FriendsSideBar() {
  return (
    <>
      <ChatSearch />
      <MessagesList />
      <hr className="w-80 border-line-break" />
      <FriendsBoxHeader />
      <FriendsSearch />
      <FriendsBox />
      <hr className="w-80 border-line-break" />
    </>
  );
}
