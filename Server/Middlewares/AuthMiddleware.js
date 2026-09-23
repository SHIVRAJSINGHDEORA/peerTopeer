import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../Models/UserModel.js";

export function verifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ status: false });
  }

  const secretString = process.env.SECRET;

  jwt.verify(token, secretString, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false });
    }

    const user = await User.findById(data.id);

    if (!user) {
      return res.status(401).json({ status: false });
    }

    req.user = user;
    next();
  });
}
