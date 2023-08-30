import Channel from '../Channel';
import {ChannelProps} from '../../../types';
import { useEffect, useState } from 'react';

const getChannels = async () => {
	try {
	  const data = await import('../../../../../data/channels.json');
	  return data.channels; // Return the 'users' array from the data
	} catch (error) {
	  console.error('Error fetching channels data:', error);
	  return []; // Return an empty array in case of error
	}
  };


export default function PrivateChannels() {
	const [channels, setChannels] = useState<ChannelProps[]>([]);
	const [isLoading, setLoading] = useState(true)
  
	useEffect(() => {
	  getChannels().then((channels) => {
		  setChannels(channels);
		setLoading(false)
	  });
	}, []);
  
	if (isLoading) return (<span className="loading loading-ring loading-lg text-main-yellow"></span>);
	if (!channels) return (<p>No channels data</p>);
  
	return (
	  <div className="flex flex-col w-full h-2/4 px-1 rounded-xl overflow-y-scroll scroll-container">
		{channels.map((OneChannel, index) => (
		  <div key={index}>
			<Channel
			  key={index}
			  channel={OneChannel.channel}
			/>
		  </div>
		))}
	  </div>
	);
  }