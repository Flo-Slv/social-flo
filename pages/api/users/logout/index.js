import { deleteCookie } from 'cookies-next';

const handler = (req, res) => {
	const { cookies } = req;
	const jwt = cookies.socialFloJWT;

	// User not logged.
	if (!jwt) return res.status(500).json({ error: 'Invalid token !'});

	// Delete cookie.
	deleteCookie('socialFloJWT', { req, res });

	return res.status(200).json({ message: 'User successfully logout !' });

};
export default handler;
