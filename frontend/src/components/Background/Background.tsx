import Image from "next/image";
import React from "react";

export default function Background() {
	return (
		<div className='fixed z-[-1] object-cover border-0 h-screen w-screen blur-md transform scale-105'>
			<Image src='/website-background.webp'
			       alt='website-background'
				   layout="fill"
					/>
		</div>
	);
}