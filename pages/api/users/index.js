import { getUsers, getUserById } from '../../../prisma/utils/users.js';

import verifyJwt from '../../../utils/jose/verifyJwt.js';

// Check if user is logged.
const isUserLogged = async (req, res) => {
	const { cookies } = req;
	const jwt = cookies.currentUser;

	if (!jwt) return Boolean(false);

	const isVerified = await verifyJwt(jwt, 'api', res);

	return isVerified;
};

const handler = async (req, res) => {
	if (!isUserLogged(req, res)) {
		return res.status(500).json({ error: 'Invalid token !' });
	}

	if (req.method === 'GET') {
		try {
			// Fetch only one user by id.
			if (req.query.id) {
				const { user, error } = await getUserById(req.query.id);

				if (error) throw new Error(error);

				return res.status(200).json({ user });
			}

			// Fetch all Users.
			const { users, error } = await getUsers();

			if (error) throw new Error(error);

			return res.status(200).json({ users });
		}
		catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	res.setHeader('Allow', ['GET']);
	res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
