import { registerMeetHandlers } from "./meetSocket.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../Models/UserModel.js";
import { verifyUser } from "./socketMiddleware.js";

export function ragisterSocketHandlers(io) {
  io.use(verifyUser);

  io.on("connection", (socket) => {
    console.log(socket.id);
    registerMeetHandlers(io, socket);
  });
}
