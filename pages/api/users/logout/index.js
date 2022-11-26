import { serialize } from 'cookie';

const handler = (req, res) => {
	const { cookies } = req;
	const jwt = cookies.socialFloJWT;

	// User not logged.
	if (!jwt) return res.status(500).json({ error: 'Invalid token !'});

	// Set cookie as empty and expired.
	const cookie = serialize('socialFloJWT', null, {
		httpOnly: Boolean(true),
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: -1,
		path: '/'
	});

	res.setHeader('Set-Cookie', cookie);

	return res.status(200).json({ message: 'User successfully logout !' });

};
export default handler;
