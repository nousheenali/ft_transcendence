import Image from "next/image";
import {ChatFriendsProps} from "@/components/Chat/types";


export default function Friend({friend}: ChatFriendsProps) {
	return (
		<div
		  className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer">
		  
	
		  {/* [1] */}
		  <div className="indicator profile w-36 h-12 basis-1/6">
			<Image
			  alt={friend.profileImage.alt}
			  src={friend.profileImage.src}
			  width={45}
			  height={45}
			/>
			{/* If the player online, the indicator will be green, otherwise red */}
			{friend.isOnline ? (
			  <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-7 top-6"></span>
			) : (
			  <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-7 top-6"></span>
			)}
		  </div>

		  <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
			<span className="font-saira-condensed text-main-text font-light truncate ...">{friend.name}</span>
		  </div>
		
		</div>
	  );
}