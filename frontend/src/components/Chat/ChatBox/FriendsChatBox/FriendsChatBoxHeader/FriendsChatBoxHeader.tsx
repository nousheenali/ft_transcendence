// TODO:
//      Depending on the clicked message, or the clicked friend, the header will change,
//      and that friend chat will be displayed in the FriendsChatBox() component.

export default function FriendsChatBoxHeader() {
  return (
    <div className="w-full h-20 flex justify-between rounded-xl bg-main-theme text-main-texts font-saira-condensed border-b border-main-yellow">
      <h1>User image and indicator</h1>
      <h1>Online or offline</h1>
    </div>
  );
}
