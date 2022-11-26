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
				email: user.email
			})
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setIssuer()
				.setAudience()
				// 30 days, divide by 1000 to be based on 'epoch' UNIX time.
				.setExpirationTime(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30)
				.sign(secret);

			setCookie('socialFloJWT', jwt, {
				req,
				res,
				httpOnly: Boolean(true),
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30,
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
