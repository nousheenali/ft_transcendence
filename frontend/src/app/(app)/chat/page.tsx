"use client";

import React, { useState } from "react";
import MsgChannelBtn from "@/components/Chat/MsgChannelBtn/page";
import UserMessages from "@/components/Chat/UserMessages/UserMessages";
import ChatSearch from "@/components/Chat/ChatSearch/ChatSearch";
import LatestMessage from "@/components/Chat/LatestMessage/LatestMessage";

export default function Chat() {
  return (
    <div className="flex w-full h-screen px-4 justify-start">
      <div className="w-96 mt-5 mb-14 flex flex-col gap-4 items-center border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <MsgChannelBtn />
        <ChatSearch />

        <LatestMessage
          sender={{
            name: "Ghaiath Abdoush",
            profileImage: {
              alt: "Ghaiath Abdoush Profile Picture",
              src: "av1.svg",
            },
            isOnline: false,
          }}
          messageTime="2m ago"
          messageContent=" since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more r"
        />
        <LatestMessage
          sender={{
            name: "Yonatan Monges",
            profileImage: {
              alt: "Yonatan Monges Profile Picture",
              src: "av1.svg",
            },
            isOnline: true,
          }}
          messageTime="10m ago"
          messageContent="Hi!"
        />
                <LatestMessage
          sender={{
            name: "Ghaiath Abdoush",
            profileImage: {
              alt: "Ghaiath Abdoush Profile Picture",
              src: "av1.svg",
            },
            isOnline: false,
          }}
          messageTime="2m ago"
          messageContent=" since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more r"
        />
                <LatestMessage
          sender={{
            name: "Ghaiath Abdoush",
            profileImage: {
              alt: "Ghaiath Abdoush Profile Picture",
              src: "av1.svg",
            },
            isOnline: false,
          }}
          messageTime="2m ago"
          messageContent=" since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more r"
        />
                <LatestMessage
          sender={{
            name: "Ghaiath Abdoush",
            profileImage: {
              alt: "Ghaiath Abdoush Profile Picture",
              src: "av1.svg",
            },
            isOnline: false,
          }}
          messageTime="2m ago"
          messageContent=" since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more r"
        />
      </div>

      <div className="w-9/12 mt-5 mb-14 ml-4 flex flex-col border-b border-main-yellow bg-box-fill rounded-xl overflow-hidden">
        <UserMessages />
      </div>
    </div>
  );
}
