import {ChannelProps} from '../../types';
import Image from "next/image";


export default function Channel({channel}: ChannelProps) {
	return (
		<div
		  className="flex flex-row justify-center items-center w-80 h-14 rounded-xl px-1 py-1 overflow-hidden hover:cursor-pointer">
		  
	
		  {/* [1] */}
		  <div className="w-36 h-12 basis-1/6">
			<Image
			  alt={channel.channelAvatar.alt}
			  src={channel.channelAvatar.src}
			  width={45}
			  height={45}
			/>
		  </div>

		  <div className="flex flex-col overflow-y-hidden basis-4/6 ml-2">
			<span className="font-saira-condensed text-main-text font-light truncate ...">{channel.name}</span>
		  </div>
		
		</div>
	  );
}