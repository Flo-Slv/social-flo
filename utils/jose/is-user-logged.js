import verifyJwt from './verify-jwt.js';

const isUserLogged = async (req, res) => {
	const { cookies } = req;
	const jwt = cookies.currentUser;

	if (!jwt) return Boolean(false);

	const isVerified = await verifyJwt(jwt, 'api', res);

	return isVerified;
};

export default isUserLogged;
