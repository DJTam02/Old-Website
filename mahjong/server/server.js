const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();

const clientPath = path.join(__dirname, '../client');
console.log('serving static from ' + clientPath);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    console.log("connection secured");
    sock.emit('message', 'Connection secure');
})

server.on('error', (err) => {
    console.error('server error:', err);
});
server.listen(3000, () => {
    console.log("started on 3000");
});