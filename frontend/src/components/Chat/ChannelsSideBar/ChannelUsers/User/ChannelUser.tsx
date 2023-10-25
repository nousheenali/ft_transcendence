import { preload } from 'react-dom';
import {ChannelUserProps} from '../../../types';
import Image from "next/image";


export default function ChannelUser(data: {user: ChannelUserProps}) {
	return (
		<div
		  className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer">
		  
	
		  {/* [1] */}
		  <div className="indicator profile w-36 h-12 basis-1/6 rounded-3xl overflow-hidden">
			<Image
			  alt={data.user.name}
			  src={data.user.avatar}
			//   width={40}
			//   height={40}
			  fill={true}
			/>
			{/* If the user online, the indicator will be green, otherwise red */}
			{data.user.isOnline ? (
			  <span className="indicator-item indicator-bottom badge bg-green-400 badge-xs absolute left-7 top-6"></span>
			) : (
			  <span className="indicator-item indicator-bottom badge bg-red-400 badge-xs absolute left-7 top-6"></span>
			)}
		  </div>

		  <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
			<span className="font-saira-condensed text-main-text font-light truncate ...">{data.user.name}</span>
		  </div>
		
		</div>
	  );
}