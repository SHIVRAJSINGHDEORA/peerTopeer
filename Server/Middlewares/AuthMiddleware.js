import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {User} from "../Models/UserModel.js";

export function userVerification(req, res) {
  const token = req.cookies.token;

  console.log(token);

  if (!token) {
    return res.json({ status: false });
  }

  const secretString = process.env.SECRET;

  jwt.verify(token, secretString, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
}
