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

let connectionNum = 0;

let p1Info = ["",""];
let p2Info = ["",""];
let p3Info = ["",""];
let p4Info = ["",""];

io.on('connection', (sock) => {
    connectionNum++;
    console.log("connection secured");  
    sock.emit('connection', connectionNum);   
    sock.on('updatePlayerNum', (connectNum) => {
        io.emit('updatePlayerNum', connectNum);
    });
    sock.on('disconnect', function () {
        connectionNum--;
        io.emit('updatePlayerNum', connectionNum);
      });
    sock.on('confirm', (info) => {
        if (info[0] == "p1") {
            p1Info[0] = info[1];
            p1Info[1] = info[2];
        } else if (info[0] == "p2") {
            p2Info[0] = info[1];
            p2Info[1] = info[2];
        } else if (info[0] == "p3") {
            p3Info[0] = info[1];
            p3Info[1] = info[2];
        } else {
            p4Info[0] = info[1];
            p4Info[1] = info[2];
        }
        io.emit('confirm', info);
    });
    sock.on('cancel', (player) => {
        if (player == "p1") {
            p1Info[0] = "";
            p1Info[1] = "";
        } else if (player == "p2") {
            p2Info[0] = "";
            p2Info[1] = "";
        } else if (player == "p3") {
            p3Info[0] = "";
            p3Info[1] = "";
        } else {
            p4Info[0] = "";
            p4Info[1] = "";
        }
        io.emit('cancel', player);
    });
    sock.on('getp1Name', () => {
        if (p1Info[1] == true) {
            sock.emit('getp1Name', p1Info[0] + " (CPU)");
        } else {
            sock.emit('getp1Name', p1Info[0]);
        }
    });
    sock.on('getp2Name', () => {
        if (p2Info[1] == true) {
            sock.emit('getp2Name', p2Info[0] + " (CPU)");
        } else {
            sock.emit('getp2Name', p2Info[0]);
        }
    });
    sock.on('getp3Name', () => {
        if (p3Info[1] == true) {
            sock.emit('getp3Name', p3Info[0] + " (CPU)");
        } else {
            sock.emit('getp3Name', p3Info[0]);
        }
    });
    sock.on('getp4Name', () => {
        if (p4Info[1] == true) {
            sock.emit('getp4Name', p4Info[0] + " (CPU)");
        } else {
            sock.emit('getp4Name', p4Info[0]);
        }
    });
    sock.on('checkPlayers', () => {
        if (p1Info[0] != "" && p2Info[0] != "" && p3Info[0] != "" && p4Info[0] != "") {
            io.emit('gameReady');
        } else {
            sock.emit('gameNotReady');
        }
    });
})
io.on('disconnect', function() {
    console.log("disconnect");  
    io.emit('updatePlayerNum', connectionNum - 1);
});

server.on('error', (err) => {
    console.error('server error:', err);
});
server.listen(3000, () => {
    console.log("started on 3000");
});