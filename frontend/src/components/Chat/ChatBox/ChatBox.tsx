import ChatBoxHeader from "./ChatBoxHeader/ChatBoxHeader";

export default function ChatBox() {
  return (
    <div className="w-full h-20 flex justify-between rounded-xl bg-main-theme text-main-texts font-saira-condensed border-b border-main-yellow">
      <ChatBoxHeader />
    
    </div>
  );
}