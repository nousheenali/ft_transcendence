import { MessagesProps } from "@/components/Chat/types";
import ChatSearch from "@/components/Chat/Friends/FriendsSideBar/MessagesSearch/ChatSearch";
import FriendsBox from "@/components/Chat/Friends/FriendsSideBar/FriendsList/FriendsBox/FriendsBox";
import OneMessage from "@/components/Chat/Friends/FriendsSideBar/LatesMessages/OneMessage/OneMessage";
import FriendsSearch from "@/components/Chat/Friends/FriendsSideBar/FriendsList/FriendsSearch/FriendsSearch";
import FriendsBoxHeader from "@/components/Chat/Friends/FriendsSideBar/FriendsList/FriendsBoxHeader/FriendsBoxHeader";

export default function MessagesSideBar({
  latestMessages,
}: {
  latestMessages: MessagesProps[];
}) {
  return (
    <>
      <ChatSearch />
      <OneMessage latestMessages={latestMessages} />
      <hr className="w-80 border-line-break" />
      <FriendsBoxHeader />
      <FriendsSearch />
      <FriendsBox />
      <hr className="w-80 border-line-break" />
    </>
  );
}
