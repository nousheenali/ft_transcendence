import React from 'react'
import { Modal } from 'react-daisyui'
import Image from 'next/image'
export default function Header() {
  return (
	<Modal.Header className="font-bold">
	<div className="flex flex-row bg-heading-stroke-30 border-2 rounded-t-2xl border-aside-border p-2 items-center justify-center font-saira-condensed font-bold text-20 text-2xl text-main-text space-x-2 gap-8">
	  <div className="mt-1">
		<h1>Customize your game</h1>
	  </div>
	  <div>
		<Image
		  src="/StartGame_icon.svg"
		  width={40}
		  height={40}
		//   className="inline-block ml-2"
		  alt="Customize your game"
		/>
	  </div>
	</div>
  </Modal.Header>
  )
}
