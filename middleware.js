import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const publicRoutes = ['/login', '/yolo'];
const protectedRoutes = ['/'];

export const middleware = async request => {
	const hasJWT = request.cookies.has('socialFloJWT');

	// Redirect to login page if not logged.
	if (protectedRoutes.includes(request.nextUrl.pathname) && !hasJWT)
		return NextResponse.redirect(new URL('/login', request.url));

	// Redirect to homepage if already logged.
	if (publicRoutes.includes(request.nextUrl.pathname) && hasJWT) {
		// Get jwt cookie.
		const socialFloJWT = request.cookies.get('socialFloJWT')?.value;

		// Decode jwt.
		const secret = new TextEncoder().encode(process.env.SECRET_KEY);
		try {
			const { payload } = await jwtVerify(socialFloJWT, secret);

			// To get current date based on 'epoch' UNIX time, we need to divide by 1000.
			const currentDate = Math.floor(Date.now() / 1000);

			// jwt expired.
			if (currentDate > payload.exp)
				return NextResponse.redirect(new URL('/login'), request.url);

			return NextResponse.redirect(new URL('/', request.url));
		}
		catch (err) {
			throw new Error(err.message);
		}
	}
};
