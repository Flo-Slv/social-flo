import { jwtVerify } from 'jose';

const verifyJwt = async (jwt, from, res = null) => {
	try {
		const secret = new TextEncoder().encode(process.env.SECRET_KEY);
		const { payload } = await jwtVerify(jwt, secret);

		// To get current date based on 'epoch' UNIX time, we need to divide by 1000.
		const currentDate = Math.floor(Date.now() / 1000);

		// jwt expired.
		if (currentDate > payload.exp && from === 'middleware')
			return res.redirect(new URL('/login'), request.url); // res = NextResponse

		if (currentDate > payload.exp && from === 'api')
			return res.status(500).json({ error: 'Token expired '});

		if (currentDate > payload.exp && from === 'layout')
			return Boolean(false);

		// jwt verified for 'layout'.
		if (from === 'layout') return payload;
		
		// jwt verified for 'middleware' and 'api'.
		return Boolean(true);
	}
	catch (err) {
		if (from === 'middleware') throw new Error(err.message);
		
		if (from === 'api')
			return res.status(500).json({ error: 'Invalid token !' });

		if (from === 'layout') {
			console.log('catch err.message: ', err.message);
			return Boolean(false);
		}
	}
};

export default verifyJwt;
