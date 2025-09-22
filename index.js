// const { Socket } = require('socket.io')

// node server whioch will handle socket connections
// const io = require('socket.io')(8000);

const { Server } = require("socket.io");
const io = new Server(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",  // frontend address
        methods: ["GET", "POST"]
    }
});
const user = {}
io.on("connection",socket=>{
    socket.on("new-user-joined",nam=>{
        console.log("New user",nam);
        user[socket.id]=nam;
    socket.broadcast.emit("user-joined",nam);
    // io.emit("user-joined", nam);   // send to everyone, including the sender

    });

socket.on("send",message=>{
    socket.broadcast.emit("received",{message:message , nam:user[socket.id]})
})

socket.on("disconnect",message=>{
    socket.broadcast.emit("left",user[socket.id])
    delete user[socket.id];
})

});



