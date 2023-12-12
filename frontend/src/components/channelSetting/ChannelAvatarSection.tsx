import React from "react";

export default function ChannelAvatarSection({
  channelName,
  channelCreater,
}: {
  channelName: string;
  channelCreater: string;
}) {
  return (
    <div className="flex flex-row gap-4 mt-20 mb-20 ml-96 ">
      <div className="flex w-1/5 justify-center">
        <img height={100} width={117} src="/av1.svg" alt="avatar" />
      </div>
      <div className="w-full h-7 mt-8  font-saira-condensed text-main-text">
        <h1 className="text-2xl font-bold">{channelName}</h1>
        <h1>
          Created By -{" "}
          <span className="text-main-yellow">{channelCreater}</span>
        </h1>
      </div>
    </div>
  );
}
