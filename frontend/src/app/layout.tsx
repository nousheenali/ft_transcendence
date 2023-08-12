import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";
import Background from "@/components/Background/Background";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
	title: "Spin Masters",
	description: "Transcendence project",
};

export default function RootLayout({
	                                   children,
                                   }: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Background/>
				{children}
			</body>
		</html>
	);
}
