const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io')
app.use(express.static(path.resolve('/public')));
const io = new Server(server);
io.on("connection", (socket)=>{
    console.log("A new user has been connected.", socket.id);
    socket.on('user-message', (message)=>{
        console.log('A new user message', message);
        io.emit('message', message);
    });
});
app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./public/index.html'))
});
server.listen(9000, ()=>{
    console.log('Listening');
});
