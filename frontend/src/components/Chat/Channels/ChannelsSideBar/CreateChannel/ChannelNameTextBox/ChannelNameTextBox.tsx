import React from 'react'
import { Input } from 'react-daisyui';

export default function ChannelNameTextBox() {
  return (
    <div className="flex flex-row items-center justify-around gap-14">
      <h1 className="text-main-text font-saira-condensed text-xl">Name</h1>
      <Input className="w-64 rounded-2xl" />
    </div>
  );
}
