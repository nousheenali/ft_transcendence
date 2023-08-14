import Breaker from '@/components/br'
import React from 'react'
import Image from 'next/image'
export default function FooterSideBar() {
	return (
		<>
			<div className="mt-auto flex flex-col">
				<Breaker />
				<ul className="mt-2 ml-10 flex flex-col mb-8">
					<li className="flex flex-row gap-8 border-2 border-transparent pl-6 p-3 hover:bg-black hover:border-heading-fill hover:border-2 hover:rounded-l-xl">
						<div>
								<Image
									height={24}
									width={24}
									src="/help_logo.svg"
									alt="Help_logo"
								/>
						</div>
						<h1 className="font-saira-condensed font-bold text-xl text-main-text">Help</h1>
					</li>

					<li className="flex flex-row gap-8 border-2 border-transparent pl-6 p-3 hover:bg-black hover:border-heading-fill hover:border-2 hover:rounded-l-xl">
						<div>
								<Image
									height={24}
									width={24}
									src="/logout_logo.svg"
									alt="Logout_logo"
								/>
						</div>
						<h1 className="font-saira-condensed font-bold text-xl text-main-text">Logout</h1>
					</li>
				</ul>
			</div>

		</>
	)
}
