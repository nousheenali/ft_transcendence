import Image from "next/image";

export default function ChatNav() {
  return (
    <div className="flex w-full h-screen px-4 justify-start ">
      <div
        className="w-80 mt-5 mb-14
							flex flex-col
							border-b border-main-yellow
							bg-box-fill rounded-2xl overflow-hidden"
      >
        <div
          className="w-full h-11
						flex flex-row justify-evenly py-2 
						rounded-md bg-main-theme 
						text-main-texts font-saira-condensed 
						border-b border-main-yellow"
        >
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="text-xl">Messages</div>
            <Image
              alt="messages-icon"
              src="chat/message-notif.svg"
              width={20}
              height={20}
            />
          </div>

          <div className="flex flex-row justify-end items-center gap-2">
            <div className="text-xl">Channels</div>
            <Image
              alt="messages-icon"
              src="chat/people.svg"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
