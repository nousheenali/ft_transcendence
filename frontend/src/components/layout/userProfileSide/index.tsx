import Breaker from '@/components/br'
import React from 'react'

export default function UserProfileSide() {
	return (
		<>
			<div className="flex flex-row items-center justify-between px-[50px] pt-8 pb-4 ">
				<div className="avatar online ">
					<div className="w-[66px] h-[66px] rounded-full">
						<img src="/av1.svg" />
					</div>
				</div>
				<div className="text-main-text ">Gab-172</div>
			</div>


			{/* braker to be updated */}
			<Breaker />

			<div className="flex items-center justify-center p-4 mb-6">
				<button className="text-start-game font-saira-condensed font-bold text-xl h-18 w-screen border-2 border-aside-border rounded-2xl  p-4 bg-heading-fill hover:bg-[#111417] opacity-90 mx-4">
					Start Game
				</button>
			</div>

		</>
	)
}
