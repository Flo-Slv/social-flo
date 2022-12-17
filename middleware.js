import { NextResponse } from 'next/server';

import verifyJwt from './utils/jose/verifyJwt.js';

const publicRoutes = ['/', '/sign-in', '/sign-up', '/football', '/rugby', '/judo'];
const protectedRoutes = ['/profile', '/sports', '/todo'];

export const middleware = async request => {
	const hasJWT = request.cookies.has('currentUser');

	// Redirect to login page if not logged.
	if (protectedRoutes.includes(request.nextUrl.pathname) && !hasJWT)
		return NextResponse.redirect(new URL('/sign-in', request.url));

	// Redirect to homepage if already logged.
	if (publicRoutes.includes(request.nextUrl.pathname) && hasJWT) {
		// Get jwt.
		const jwt = request.cookies.get('currentUser')?.value;

		const isVerified = await verifyJwt(jwt, 'middleware', NextResponse);

		if (isVerified) return NextResponse.redirect(new URL('/profile', request.url));
	}
};
