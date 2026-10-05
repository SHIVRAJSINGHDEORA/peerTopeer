import { verifyMeet } from "./Services/meetServices.js";

export function registerMeetHandlers(io, socket) {
 
  socket.on("check-room", async (roomId, callback) => {
    const meet = await verifyMeet(roomId);
    if (!meet) {
      return callback({ success: false, message: "Room doesn't exist!" });
    }

    
    const sockets = await io.in(roomId).fetchSockets();
    const userExist = sockets.find((s) => s.data.username === socket.data.username);

    if (userExist) {
      return callback({ success: false, message: "User already in room in another tab!" });
    }

    return callback({ success: true });
  });

  
  socket.on("join-room", async (roomId, callback) => {
    const meet = await verifyMeet(roomId);
    if (!meet) return callback({ success: false, message: "Room doesn't exist!" });

    socket.join(roomId);
    console.log("Joined room:", socket.data.username);

    socket.to(roomId).emit("new-user", {
      username: socket.data.username,
      socketId: socket.id,
    });

    if (callback) callback({ success: true });
  });

  
  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
    socket.to(roomId).emit("user-disconnected", socket.id);
  });

 
  socket.on("disconnecting", () => {
    socket.rooms.forEach((roomId) => {
      if (roomId !== socket.id) {
        socket.to(roomId).emit("user-disconnected", socket.id);
      }
    });
  });

  
  socket.on("camera-toggle", ({ roomId, cameraEnabled }) => {
    socket.to(roomId).emit("camera-toggle", {
      socketId: socket.id,
      isCameraEnabled: cameraEnabled,
    });
  });

  
  socket.on("offer", ({ offer, target, cameraEnabled }) => {
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