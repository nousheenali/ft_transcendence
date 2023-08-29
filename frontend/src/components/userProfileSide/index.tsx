import Breaker from '@/components/br'
import React from 'react'
import StartGameCustomize from '../startGame'

interface UserProfileSideProps {
	image: string,
	name: string,
}

export default function UserProfileSide ({image, name}: UserProfileSideProps) {
	return (
		<>
			<div className="flex flex-row items-center justify-between px-[50px] pt-8 pb-4 ">

				<div className="relative">
					<img className="w-24 h-24 rounded-full" src={image} />
					<span className="bottom-1 left-16  absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
				</div>

				<div className="text-main-text font-saira-condensed font-bold text-xl">{name}</div>
			</div>
			<Breaker />
			<StartGameCustomize />
		</>
	)
}
