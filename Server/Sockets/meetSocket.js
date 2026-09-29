export function registerMeetHandlers(io,socket){
    socket.on("join-room",async(roomId)=>{
        const sockets = await io.in(roomId).fetchSockets();

        const users = sockets.map((socket)=>socket.data.username);

        console.log(users);
        console.log(socket.data.username);
        
        socket.join(roomId);
        socket.to(roomId).emit("new-user",socket.data.username);
    })

}