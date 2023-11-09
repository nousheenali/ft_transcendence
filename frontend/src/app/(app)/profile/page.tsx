import React from "react";
import { NextRequest } from "next/server";
import ProfilePage from "@/components/Profile/ProfilePage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function page(req: NextRequest) {
  //login is passed to profilePage because useSession in 
  //profile page doesn't load correctly and gives error on page refresh
  const session = await getServerSession(options);
  const login = await session?.user.login!;
  return <ProfilePage login={login} />;
}
