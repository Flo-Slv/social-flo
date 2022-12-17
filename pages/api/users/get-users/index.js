
import { getUsers } from '../../../../prisma/utils/users.js';

import isUserLogged from '../../../../utils/jose/is-user-logged.js';

const handler = async (req, res) => {
	if (!isUserLogged(req, res)) {
		return res.status(500).json({ error: 'Invalid token !' });
	}

	if (req.method === 'GET') {
		try {
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
