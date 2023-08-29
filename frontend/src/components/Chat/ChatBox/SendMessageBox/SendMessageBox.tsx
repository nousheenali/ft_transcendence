import React, { useState } from "react";
// import EmojiPicker from "emoji-picker-react";
import Image from "next/image";

/**
 * SendMessageBox component is used to send messages to a friend or a channel, it contains an input field and two buttons:
 * 1. Emoji button: to open the emoji picker
 * 2. Send button: to send the message
 * 
 * TODO:
 * -----
 * 1. Add the emoji picker
 * 2. Add the functionality to send the message
 */

export default function SendMessageBox() {
  return (
    <div className="flex items-center justify-between w-full h-20 px-4 py-2 bg-sender-chatbox-bg rounded-xl font-saira-condensed text-lg">
      <input
        className="flex-grow h-full px-4 py-2 rounded-xl focus:outline-none"
        placeholder="Type a message"
      />
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <button className="p-2 rounded-full hover:bg-main-text focus:outline-none">
          <Image src="/chat/emoji.svg" alt="emoji icon" width={24} height={24} />
        </button>
        <button className="p-2 rounded-full hover:bg-main-text focus:outline-none">
          <Image src="/chat/send.svg" alt="send icon" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}