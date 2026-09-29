export function registerMeetHandlers(io,socket){
    socket.on("join-room",async(roomId,username)=>{
        const sockets = await io.fetchSockets();
        const users = sockets.array.forEach(element => {
            return element.data.username
        });

        console.log(users);
        
        socket.join(roomId);
        socket.to(roomId).emit("new-user",username);
    })

}