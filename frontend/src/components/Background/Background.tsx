import Image from "next/image";
import React from "react";

export default function Background() {
	return (
		<div className='background h-screen blur-[12px]'>
			<Image src='/website-background.webp'
			       alt='website-background'
			       layout='fill'
			       objectFit='cover'
			/>
		</div>
	);
}