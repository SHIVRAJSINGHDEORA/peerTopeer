import cookieParser from "cookie-parser";
import { registerMeetHandlers } from "./meetSocket.js";
import { verifyUser } from "./socketMiddleware.js";

const cookieMiddleware = cookieParser();

const wrap = (middleware) => (socket, next) =>
  cookieMiddleware(socket.request, {}, next);

export function ragisterSocketHandlers(io) {
  io.use(wrap(cookieMiddleware));
  io.use(verifyUser);

  io.on("connection", (socket) => {
    console.log(socket.id);
    registerMeetHandlers(io, socket);
  });
}
