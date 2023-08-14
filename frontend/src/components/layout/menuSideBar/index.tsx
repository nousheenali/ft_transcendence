import React from 'react'
import Image from 'next/image'

export default function MenuSideBar() {
	return (
		<>
			{/* menu section */}
			<ul className="flex flex-col ml-10 gap-1">
				<li className="flex flex-row gap-8 border-2 border-transparent pl-6 p-3 hover:bg-black hover:border-heading-fill hover:border-2 hover:rounded-l-xl">
					
						<Image
							height={30}
							width={30}
							src="/DashBoard_logo.svg"
							alt="DashBoard_logo"
						/>
					<h1 className="font-saira-condensed font-bold text-xl text-main-text">DashBoard</h1>
				</li>

				<li className="flex flex-row gap-8 border-2 border-transparent pl-6 p-3 hover:bg-black hover:border-heading-fill hover:border-2 hover:rounded-l-xl">
					
						<Image
							height={30}
							width={30}
							src="/LeaderBoard_logo.svg"
							alt="DashBoard_logo"
						/>
					<h1 className="font-saira-condensed font-bold text-xl text-main-text">LeaderBoard</h1>
				</li>

				<li className="flex flex-row gap-8 border-2 border-transparent pl-6 p-3 hover:bg-black hover:border-heading-fill hover:border-2 hover:rounded-l-xl">
						<Image
							height={30}
							width={30}
							src="/chat_logo.svg"
							alt="DashBoard_logo"
						/>
					<h1 className="font-saira-condensed font-bold text-xl text-main-text">Chat</h1>
				</li>

				<li className="flex flex-row gap-8 border-2 border-transparent pl-6 p-3 hover:bg-black hover:border-heading-fill hover:border-2 hover:rounded-l-xl">
						<Image
							height={30}
							width={30}
							src="/profile_logo.svg"
							alt="DashBoard_logo"
						/>
					<h1 className="font-saira-condensed font-bold text-xl text-main-text">Profile</h1>
				</li>

				<li className="flex flex-row gap-8 border-2 border-transparent pl-6 p-3 hover:bg-black hover:border-heading-fill hover:border-2 hover:rounded-l-xl">
					
						<Image
							height={30}
							width={30}
							src="/settings_logo.svg"
							alt="DashBoard_logo"
						/>
					<h1 className="font-saira-condensed font-bold text-xl text-main-text">Settings</h1>
				</li>
			</ul>
		</>
	)
}
