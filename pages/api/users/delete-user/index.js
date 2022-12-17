import { removeUserById } from '../../../../prisma/utils/users.js';

import isUserLogged from '../../../../utils/jose/isUserLogged.js';

const handler = async (req, res) => {
	if (!isUserLogged(req, res)) {
		return res.status(500).json({ error: 'Invalid token !' });
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

	res.setHeader('Allow', ['DELETE']);
	res.status(405).end(`Method ${req.method} is not allowed.`);
};


export default handler;
