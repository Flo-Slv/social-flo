import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

import { login } from '../../../../prisma/utils/users.js';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const data = req.body;
			
			const { user, error } = await login(data);

			if (error) throw new Error(error);

			const secret = process.env.SECRET_KEY;

			const token = sign(
				{
					exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
					id: user.id,
					email: user.email
				},
				secret
			);

			const cookie = serialize('SocialFloJWT', token, {
				httpOnly: Boolean(true),
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30,
				path: '/'
			});

			res.setHeader('Set-Cookie', cookie);

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
