import { jwtVerify } from 'jose';

import {
	getUsers,
	createUser,
	getUserById,
	removeUserById
} from '/prisma/utils/users.js';

// Check if user is logged.
const isUserLogged = async (req, res) => {
	const { cookies } = req;
	const jwt = cookies.socialFloJWT;

	if (!jwt) return Boolean(false);

	try {
		// Decode jwt.
		const secret = new TextEncoder().encode(process.env.SECRET_KEY);
		const { payload } = await jwtVerify(jwt, secret);

		// To get current date based on 'epoch' UNIX time, we need to divide by 1000.
		const currentDate = Math.floor(Date.now() / 1000);

		// jwt expired.
		if (currentDate > payload.exp) return Boolean(false);

		return Boolean(true);
	}
	catch (err) {
		return res.status(500).json({ error: 'Invalid token !' });
	}
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

	if (req.method === 'POST') {
		try {
			const data = req.body;
			
			const { user, error } = await createUser(data);

			if (error) throw new Error(error);

			return res.status(200).json({ 
				message: 'User successfully created !',
				user
			});
		}
		catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	if (req.method === 'DELETE') {
		try {
			const { user, error } = await removeUserById(req.query.id);

			if (error) throw new Error(error);

			return res.status(200).json({
				message: 'User successfully deleted !',
				user
			});
		}
		catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
	res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
