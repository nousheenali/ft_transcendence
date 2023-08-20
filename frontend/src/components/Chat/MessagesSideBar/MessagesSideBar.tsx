
import ChatSearch from "@/components/Chat/MessagesSideBar/LatesMessages/MessagesSearch/ChatSearch";
import LatestMsgsBox from "@/components/Chat/MessagesSideBar/LatesMessages/LatestMsgsBox/LatestMsgsBox";
import FriendsBoxHeader from "@/components/Chat/MessagesSideBar/Friends/FriendsBoxHeader/FriendsBoxHeader";
import FriendsSearch from "@/components/Chat/MessagesSideBar/Friends/FriendsSearch/FriendsSearch";
import FriendsBox from "@/components/Chat/MessagesSideBar/Friends/FriendsBox/FriendsBox";

export default function MessagesSideBar() {
  return (
    <>
      <ChatSearch />
      <LatestMsgsBox />
      <hr className="w-80 border-line-break" />
      <FriendsBoxHeader />
      <FriendsSearch />
      <FriendsBox />
      <hr className="w-80 border-line-break" />
    </>
  );
}
