import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const secretString = process.env.SECRET;

export function createSecretToken(id) {
  const token = jwt.sign({id}, secretString, {
    algorithm: "HS256",
    expiresIn: 24 * 60 * 60,
  });

  return token;
}
