import AsideBar from "./asidebar"
import Image from "next/image";

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({children}: MainLayoutProps){
    return (
        <>
        <div className='background h-screen blur-[15px]'>
        <Image src='/website-background.webp'
               alt='website-background'
               objectFit='cover'
               layout='fill'
        />
    </div>
        <div className="flex w-full space-x-4 h-screen max-h-screen py-5 px-4">
            
            <AsideBar />
           
            <main className="w-full">
                {children}
            </main>
        </div>
        </>
    )
}