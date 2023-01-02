import { updateUserById } from "../../../../prisma/utils/users.js";

import isUserLogged from "../../../../utils/jose/is-user-logged.js";

const handler = async (req, res) => {
  if (!isUserLogged(req, res)) {
    return res.status(500).json({ error: "Invalid token !" });
  }

  if (req.method === "PATCH") {
    try {
      const id = req.body.id;
      const updatedField = { [req.body.field]: req.body.data };

      const { user, error } = await updateUserById(id, updatedField);

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "User successfully updated !",
        user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["PATCH"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
