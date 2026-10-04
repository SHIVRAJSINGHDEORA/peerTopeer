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
    socket.to(roomId).emit("new-user", socket.data.username);

    return callback({ success: true });
  });

  socket.on("check-room", async (roomId, callback) =>{

    const existUser = socket.rooms.has(roomId);

    console.log(existUser);

    if(!existUser){
      return callback({success : false});
    }

    return callback({success : true});
  })
}
