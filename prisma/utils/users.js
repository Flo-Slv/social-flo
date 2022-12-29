import bcrypt from "bcrypt";

import prisma from "./prisma-client.js";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return { users };
  } catch (error) {
    return { error };
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return { user };
  } catch (error) {
    return { error };
  }
};

export const signUp = async (user) => {
  try {
    const email = user.email.trim();
    const password = user.password.trim();
    const confirm_password = user.confirm_password.trim();

    // Check if email are empty.
    if (email === "") return { error: "Email must not be empty !" };

    // Check if email is valid.
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) return { error: "Email is not valid" };

    // Check if user already exist.
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) return { error: "Email already taken !" };

    // Check if passwords are empty.
    if (password === "" || confirm_password === "")
      return { error: "Passwords must not be empty !" };

    // Check if password are identical.
    if (password !== confirm_password)
      return { error: "Passwords should be identical !" };

    // Do not send 'confirm_password' to DB.
    delete user.confirm_password;

    // Hash the password.
    user.password = bcrypt.hashSync(user.password, 12);

    // Create user in DB.
    const newUser = await prisma.user.create({ data: user });

    return { user: newUser };
  } catch (error) {
    return { error };
  }
};

export const signIn = async (user) => {
  try {
    const email = user.email.trim();
    const password = user.password.trim();

    // Check if email and password are not empty.
    if (email === "" || password === "")
      return { error: "Fieds can not be empty !" };

    const existingUser = await prisma.user.findUniqueOrThrow({
      where: { email: email },
    });

    if (existingUser) {
      // Compare hash of passwords.
      if (!bcrypt.compareSync(password, existingUser.password))
        return { error: "Bad password !" };

      return { user: existingUser };
    }
  } catch (error) {
    return { error };
  }
};

export const removeUserById = async (id) => {
  try {
    const user = await prisma.user.delete({ where: { id } });
    return { user };
  } catch (error) {
    return { error };
  }
};
