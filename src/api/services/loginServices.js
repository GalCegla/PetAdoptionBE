import { findUserWithEmail } from "../../DAO/usersDAO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function logIn(req, res) {
  const { email, password } = req.body;
  const user = await findUserWithEmail(email);
  if (!user) {
    res.status(400).send("User does not exist. Please sign up.");
    return;
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    res.status(400).send("Incorrect password.");
    return;
  }

  const token = jwt.sign(
    { user_id: user._id, email: user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "10m",
    }
  );

  res.status(200).send({ id: user._id, token });
}

export default logIn;
