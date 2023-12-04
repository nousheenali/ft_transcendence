import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  try {
    const decodedToken = jwtDecode(accessToken.value);
    
    // Optionally, you can add your logic to check the token payload or expiration here
    console.log('Decoded Token:', decodedToken);
    if (decodedToken.TFAEnabled === true && decodedToken.TFAVerified === false) {
      const currentUrl = new URL('/login', request.url);
      currentUrl.searchParams.set('show2faModal', 'true');
      return NextResponse.redirect(currentUrl);
    }
    // Token is decoded, continue to the next middleware or return response
  } catch (error) {
    console.error('JWT Decoding Failed:', error);
    // Decoding failed, possibly due to an invalid format
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); 
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
