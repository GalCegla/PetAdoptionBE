import jwt from "jsonwebtoken";

export default function verifyController(req, res) {
  const { token } = req.body;

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    return res.status(200).send(verified);
  } catch {
    return res.status(400).send("Not verified.");
  }
}
