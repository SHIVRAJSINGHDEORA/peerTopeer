import { verifyMeet } from "./Services/meetServices.js";
import {User} from "../Models/UserModel.js"
import { Meet } from "../Models/meetModel.js";

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

    const host = await User.findOne({_id : meet.host});

    const isAdmin = host.username == socket.data.username;

    socket.data.isAdmin = isAdmin;
    socket.data.roomId = roomId;

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

    socket.rooms.forEach(async (roomId) => {
      if (roomId !== socket.id) {
        socket.to(roomId).emit("user-disconnected", socket.id);

        if(socket.data.isAdmin){
          console.log(`Admin disconnected. Deleting meet ${roomId} from DB...`);

          try{
            await Meet.deleteOne({meetId : roomId});
            socket.to(roomId).emit("meeting-ended", "The host has ended the meeting.");
            io.in(roomId).socketsLeave(roomId);
          }catch(err){
            console.log("Error ocuured in deleting meet",err);

          }
        }
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