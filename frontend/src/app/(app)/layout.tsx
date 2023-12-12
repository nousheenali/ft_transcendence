"use client";

import MainLayout from "@/components/layout";
import { ToastContainer, toast } from "react-toastify";
import Background from "@/components/Background/Background";
import ChatSocket from "@/components/Chat/ChatSocket/ChatSocket";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser } = useContext(AuthContext);

  const router = useRouter();
  console.log(user);
  const pathname = usePathname();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/auth/check`,
          {
            withCredentials: true,
          }
        );
        if (data.TFAEnabled === true && data.TFAVerified === false) {
          router.push("/login?show2faModal=true");
        }
        setUser(data);
      } catch (error) {
        console.log(error);
        if (user) {
          router.push(`${process.env.NEXT_PUBLIC_BACKEND}/auth/logout`);
        }
        router.push("/login");
      }
    };
    checkLogin();
  }, []);

  if (
    !user?.login ||
    (user?.TFAEnabled === true && user?.TFAVerified === false)
  )
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Background />
        <span className="loading loading-ring loading-lg text-main-yellow"></span>
      </div>
    );
  return (
    <html lang="en">
      <body>
        <Background />
        <MainLayout>
          <ChatSocket>{children}</ChatSocket>
          <ToastContainer position="top-right" />
        </MainLayout>
      </body>
    </html>
  );
}
