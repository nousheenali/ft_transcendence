import React from 'react';

export default function Chat() {
  return (
    <div className="flex h-screen w-full bg-black">
      <div className="flex flex-col">
        <div className="border border-red-500 h-full">
          <p className="text-white">left container for channels / messages</p>
        </div>

        <div className="border border-red-500 h-full">
          <p className="text-white">Friends search list</p>
        </div>
      </div>

      <div className="w-full border border-green-500">
        <p className="text-white">Chat Window</p>
      </div>
    </div>
  );
}
