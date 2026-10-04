import { verifyMeet } from "./Services/meetServices.js";

export function registerMeetHandlers(io, socket) {
  socket.on("join-room", async (roomId, callback) => {
    const meet = await verifyMeet(roomId);

    if (!meet) {
      return callback({
        success: false,
        message: "Room doesn't exit!",
      });
    }
    const sockets = await io.in(roomId).fetchSockets();
    const users = sockets.map((socket) => socket.data.username);

    const userExist = users.find(
      (username) => username == socket.data.username,
    );

    if (userExist) {
      return callback({
        success: false,
        message: "Not Autherized !",
      });
    }

    console.log(users);
    console.log(socket.data.username);

    socket.join(roomId);
    socket.to(roomId).emit("new-user", socket.data.username, socket.id);

    return callback({ success: true });
  });

  socket.on("check-room", async (roomId, callback) => {
    const existUser = socket.rooms.has(roomId);

    console.log(existUser);

    if (!existUser) {
      return callback({ success: false });
    }

    return callback({ success: true });
  });

  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);

    socket.to(roomId).emit("user-left", socket.data.username);
  });

  socket.on("offer", ({ offer, target, cameraEnabled }) => {
    console.log("target socket id : ", target);

    io.to(target).emit("offer", {
      offer,
      from: socket.id,
      userCamera: cameraEnabled,
      username: socket.data.username,
    });
  });

  socket.on("answer", ({ answer, target, cameraEnabled }) => {
    io.to(target).emit("answer", {
      answer,
      from: socket.id,
      userCamera: cameraEnabled,
      username: socket.data.username,
    });
  });

  socket.on("ice-candidate", ({ candidate, target }) => {
    io.to(target).emit("ice-candidate", { candidate, from: socket.id });
  });
}
