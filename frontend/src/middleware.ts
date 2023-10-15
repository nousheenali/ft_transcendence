import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {
	const session = await getToken({ req: request, secret: process.env.SECRET }); //console.log('session in middleware: ', session)

	if(!session) return NextResponse.redirect(new URL('/login', request.url))
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