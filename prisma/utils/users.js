import prisma from './prisma-client.js';

export const getUsers = async () => {
	try {
		const users = await prisma.user.findMany();
		return { users };
	}
	catch (error) {
		return { error };
	}
};

export const getUserById = async id => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		return { user };
	}
	catch (error) {
		return { error };
	}
};

export const createUser = async user => {
	try {
		const existingUser = await prisma.user.findUnique({
			where: { email: user.email }
		});

		if (existingUser) return { error: 'Email already taken !' }

		const newUser = await prisma.user.create({
			data: user
		});

		return { user: newUser };
	}
	catch (error) {
		return { error };
	}
};

export const login = async user => {
	try {
		const existingUser = await prisma.user.findUniqueOrThrow({
			where: { email: user.email }
		});

		if (existingUser) {
			console.log('login existingUser: ', existingUser);

			if (existingUser.password !== user.password.trim()) {
				return { error: 'Bad password !' };
			}

			return { user: existingUser };
		}
	}
	catch (error) {
		return { error };
	}
};

export const removeUserById = async id => {
	try {
		const user = await prisma.user.delete({ where: { id } });
		return { user };
	}
	catch (error) {
		return { error };
	}
};
