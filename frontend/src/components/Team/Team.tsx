import type { NextPage } from 'next';
import Image from 'next/image';

const Team: NextPage = () => {
	return (
		<div id="team-section" className="relative w-full ">
			<div className="absolute -top-6 left-1/4 text-center z-10">
				<b className="text-9xl font-saira-condensed text-main-text font-bold">OUR</b>
			</div>
			<div className="absolute -bottom-5 left-1/2 text-center z-10">
				<b className="text-9xl font-saira-condensed text-main-yellow font-bold">TEAM</b>
			</div>

			<div className="flex flex-row space-x-1 justify-center items-center">
				<div className="relative">
					<Image className="rounded-full border border-lime-400 border-opacity-25"
					       src="/Team/Member_1.png" alt="Member_1 image" width={220} height={560} />
				</div>
				<div className="relative">
					<Image className="rounded-full border border-lime-400 border-opacity-25"
					       src="/Team/Member_2.png" alt="Member_2 image" width={220} height={560} />
				</div>
				<div className="relative">
					<Image className="rounded-full border border-lime-400 border-opacity-25"
					       src="/Team/Member_3.png" alt="Member_3 image" width={220} height={560} />
				</div>
				<div className="relative">
					<Image className="rounded-full border border-lime-400 border-opacity-25"
					       src="/Team/Member_4.png" alt="Member_4 image" width={220} height={560} />
				</div>
				<div className="relative">
					<Image className="rounded-full border border-lime-400 border-opacity-25"
					       src="/Team/Member_5.png" alt="Member_5 image" width={220} height={560} />
				</div>
			</div>
		</div>
	);
}

export default Team;