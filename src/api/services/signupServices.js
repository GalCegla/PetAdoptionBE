import { createUser, findUser, findUserWithEmail } from "../../DAO/usersDAO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function addUser(req, res) {
  const { email, password } = req.body;
  const existingUser = await findUserWithEmail(email);
  if (existingUser) {
    res.status(400).send("User with this email already exists");
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = {
    ...req.body,
    password: encryptedPassword,
    role: "user",
    adoptedPets: [],
    fosteredPets: [],
    savedPets: [],
  };
  const { insertedId } = await createUser(user);
  const newUser = await findUser(insertedId);

  const token = jwt.sign(
    { user_id: insertedId, email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1m",
    }
  );
  res.status(200).send({ id: insertedId, token, newUser });
}

export default addUser;
