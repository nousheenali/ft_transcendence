import Breaker from '@/components/br'
import React from 'react'
import StartGameCustomize from '../startGame'

export default function UserProfileSide() {
	return (
		<>
			<div className="flex flex-row items-center justify-between px-[50px] pt-8 pb-4 ">
				<div className="avatar online ">
					<div className="w-[66px] h-[66px] rounded-full">
						<img src="/av1.svg" />
					</div>
				</div>
				<div className="text-main-text font-saira-condensed font-bold text-xl">Gab-172</div>
			</div>


			{/* braker to be updated */}
			<Breaker />
			<StartGameCustomize />
		</>
	)
}
