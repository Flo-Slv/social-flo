import {
	getUsers,
	createUser,
	getUserById,
	removeUserById
} from '/prisma/utils/users.js';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { cookies } = req;
			const jwt = cookies.socialFloJWT;

			if (!jwt)
				return res.status(500).json({ error: 'You need to be login !' });

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
