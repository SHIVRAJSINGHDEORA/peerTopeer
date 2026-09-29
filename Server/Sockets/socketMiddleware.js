import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../Models/UserModel.js";

export function verifyUser(socket, next) {

  const token = socket.request.cookies.token;
  
  if (!token) {
    const err = new Error("not authorized");
    err.data = { content: { status: false } };
    next(err);
    return;
  }

  const secretString = process.env.SECRET;

  jwt.verify(token, secretString, async (err, data) => {
    if (err) {
      console.log(err.message);
      const error = new Error("not authorized");
      error.data = { content: { status: false } };
      next(error);
      return;
    }

    const user = await User.findById(data.id);

    if (!user) {
      const err = new Error("not authorized");
      err.data = { content: { status: false } };
      next(err);
      return;
    }

    console.log(user);

    socket.data.username = user.username;
    next();
  });
}
