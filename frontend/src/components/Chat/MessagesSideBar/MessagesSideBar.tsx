import ChatSearch from "@/components/Chat/MessagesSideBar/MessagesSearch/ChatSearch";
import LatestMsgsBox from "@/components/Chat/MessagesSideBar/LatesMessages/LatestMsgsBox/LatestMsgsBox";
import FriendsBoxHeader from "@/components/Chat/MessagesSideBar/Friends/FriendsBoxHeader/FriendsBoxHeader";
import FriendsSearch from "@/components/Chat/MessagesSideBar/Friends/FriendsSearch/FriendsSearch";
import FriendsBox from "@/components/Chat/MessagesSideBar/Friends/FriendsBox/FriendsBox";
import { MessagesProps } from "@/components/Chat/types";
/**
 * The MessagesSideBar component is responsible for rendering the MessagesSideBar part of the Chat page,
 * so if the user is on the Chat page, and he presses the Messages tab, the MessagesSideBar component will be rendered.
 */
export default function MessagesSideBar({
  latestMessages,
}: {
  latestMessages: MessagesProps[];
}) {
  return (
    <>
      <ChatSearch />
      <LatestMsgsBox latestMessages={latestMessages} />
      <hr className="w-80 border-line-break" />
      <FriendsBoxHeader />
      <FriendsSearch />
      <FriendsBox />
      <hr className="w-80 border-line-break" />
    </>
  );
}
