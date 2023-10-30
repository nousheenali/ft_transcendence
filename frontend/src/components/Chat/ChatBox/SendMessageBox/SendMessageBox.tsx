import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// import EmojiPicker from "emoji-picker-react";
import Image from "next/image";

const socket: Socket = io();

export default function SendMessageBox() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('chat', (e) => {
      setMessages((messages) => [e, ...messages]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, []);
  

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
      socket.emit('chat', {message: 'hello world'})
    }


  return (
    <div className="flex items-center justify-between w-full h-20 px-4 py-2 bg-sender-chatbox-bg rounded-xl font-saira-condensed text-lg">
      <input
        className="flex-grow h-full px-4 py-2 rounded-xl focus:outline-none"
        placeholder="Type a message"
        // value={currentMessage}
        // onChange={(e) => setCurrentMessage(e.target.value)}
      />
      {/* <button onClick={sendMessage}>Send</button> */}
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <button className="p-2 rounded-full hover:bg-main-text focus:outline-none">
          <Image
            src="/chat/emoji.svg"
            alt="emoji icon"
            width={24}
            height={24}
          />
        </button>
        <button className="p-2 rounded-full hover:bg-main-text focus:outline-none">
          <Image src="/chat/send.svg" alt="send icon" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
