import { SignJWT } from 'jose';
import { setCookie } from 'cookies-next';

import { login } from '../../../../prisma/utils/users.js';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const data = req.body;
			
			const { user, error } = await login(data);

			if (error) throw new Error(error);

			const secret = new TextEncoder().encode(process.env.SECRET_KEY);

			const jwt = await new SignJWT({
				id: user.id,
				email: user.email,
				name: user.name ?? ''
			})
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setIssuer()
				.setAudience()
				// 30 days - divide by 1000 to be based on 'epoch' UNIX time.
				.setExpirationTime(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30)
				.sign(secret);

			const env = process.env.NODE_ENV;

			setCookie('currentUser', jwt, {
				req,
				res,
				// httpOnly: Boolean(true) to avoid basics xss attacks via js.
				// But, we can't access to currentUser in Client Component...
				// So I did a trick inside Root Layout to get currentUser.
				httpOnly: Boolean(true),
				// secure: Boolean(true) in prod only, force to use https.
				secure: env !== 'development',
				// sameSite: 'strict' to avoid attacks
				// ('lax' or 'strict' ? need to test it more).
				sameSite: 'strict',
				// domain: IN PROD, CHANGE TO CORRECT DOMAIN !
				domain: env === 'development' ? 'localhost' : 'https://flo-slv.dev',
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/'
			});

			return res.status(200).json({ message: 'User successfully login !' });
		}
		catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	res.setHeader('Allow', ['POST']);
	res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
