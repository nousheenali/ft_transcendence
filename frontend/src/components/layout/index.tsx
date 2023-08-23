"use client"
import MobileSidebar from "../mobileSidebar";
import AsideBar from "./asidebar"

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({children}: MainLayoutProps){
    return (
        <main>
        
        <MobileSidebar />
        <div className="flex w-full space-x-4 h-screen max-h-screen py-5 px-4">
            <AsideBar isMobile={false} />
           
            <main className="w-full">
                {children}
            </main>
        </div>

        </main>
    )
}