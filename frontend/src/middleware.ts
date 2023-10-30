import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { userInformation } from "./components/Profile/types";
import { getUserData } from "../services/user";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.SECRET }); //console.log('session in middleware: ', session)
  const userInfo: userInformation = await getUserData(
    session?.name,
    API_ENDPOINTS.getUserbyLogin
  );
  if (userInfo && userInfo.TFAEnabled && userInfo.TFAVerified === false) {
    const currentUrl = new URL("/login", request.url);
    currentUrl.searchParams.set("show2faModal", "true");
    return NextResponse.redirect(currentUrl);
  }
  if (!session) return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/",
    "/leaderboard",
    "/chat",
    "/help",
    "/matchhistory",
    "/profile",
    "/settings",
    "/game",
  ],
};
