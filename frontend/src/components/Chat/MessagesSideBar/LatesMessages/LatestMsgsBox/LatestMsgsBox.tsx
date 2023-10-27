import React, { useEffect, useState } from "react";
import LatestMessage from "@/components/Chat/MessagesSideBar/LatesMessages/LatestMessage/LatestMessage";
import { MessagesProps } from "@/components/Chat/types";

export default function LatestMsgsBox({
  latestMessages,
}: {
  latestMessages: MessagesProps[];
}) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (latestMessages) {
      setLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <span className="loading loading-ring loading-lg text-main-yellow"></span>
    );
  if (!latestMessages) return <p>No data for the latest messages</p>;

  return (
    <div className="flex flex-col w-full h-1/2 rounded-xl pl-5 overflow-y-scroll scroll-container">
      {latestMessages.map((message, index) => (
        <div className="py-1" key={index}>
          <LatestMessage message={message} />
        </div>
      ))}
    </div>
  );
}
