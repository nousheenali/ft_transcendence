import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { userInformation } from './components/Profile/types';
import { getUserData } from '../services/user';
// import { userInformation } from './components/Profile/types';
// import { getUserData } from '../services/user';
// import { getServerSession } from 'next-auth';
// import { API_ENDPOINTS } from '../config/apiEndpoints';
// import { options } from './app/api/auth/[...nextauth]/options';
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.SECRET }); //console.log('session in middleware: ', session)

  // console.log(session);

  // const sessionServer = await getServerSession(options);
  // const login = sessionServer?.user.login!;

  // const userInfo: userInformation = await getUserData(
  //   session.name,
  //   API_ENDPOINTS.getUserbyLogin
  // );
  // let login = session?.login;

  const userInfo: userInformation = await getUserData(
    session?.name,
    API_ENDPOINTS.getUserbyLogin
  );

  console.log(userInfo);
  if (userInfo.TFAEnabled && userInfo.TFAVerified === false) {
    const currentUrl = new URL('/login', request.url);
    currentUrl.searchParams.set('show2faModal', 'true');
    return NextResponse.redirect(currentUrl);
  }
  if (!session)
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
}

export const config = {
  matcher: [
    '/',
    '/leaderboard',
    '/chat',
    '/help',
    '/matchhistory',
    '/profile',
    '/settings',
    '/game',
  ],
};
