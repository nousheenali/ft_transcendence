import React from "react";
import { NextRequest } from "next/server";
import ProfilePage from "@/components/Profile/ProfilePage";

export default async function page(req: NextRequest) {
  return <ProfilePage/>;
}
