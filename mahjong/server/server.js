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

let text = "";

let connectionNum = 0;

let playerInfo = [
    ["","",0],
    ["","",0],
    ["","",0],
    ["","",0]
];
let roundNum = 0;
let counter = 0; 
let primaryPlayer = 0;
//let tileCounter = 0;

let allTilesArray;

class Tile {
    constructor (newSuit, newValue, newRemaining, newUnicode) {
        this.suit = newSuit;
        this.value = newValue,
        this.remaining = newRemaining;
        this.unicode = newUnicode;
    }
    reduce() {
        this.remaining--;
    }
}
function findAllTiles() {
    let allTiles = new Array(42);
    allTiles[0] = new Tile("East", 0, 4, "\ud83c\udc00");
    allTiles[1] = new Tile("South", 0, 4, "\ud83c\udc01");
    allTiles[2] = new Tile("West", 0, 4, "\ud83c\udc02");
    allTiles[3] = new Tile("North", 0, 4, "\ud83c\udc03");
    allTiles[4] = new Tile("Red", 0, 4, "\ud83c\udc04");
    allTiles[5] = new Tile("Green", 0, 4, "\ud83c\udc05");
    allTiles[6] = new Tile("Blue", 0, 4, "\ud83c\udc06");

    allTiles[7] = new Tile("Number", 1, 4, "\ud83c\udc07");
    allTiles[8] = new Tile("Number", 2, 4, "\ud83c\udc08");
    allTiles[9] = new Tile("Number", 3, 4, "\ud83c\udc09");
    allTiles[10] = new Tile("Number", 4, 4, "\ud83c\udc0A");
    allTiles[11] = new Tile("Number", 5, 4, "\ud83c\udc0B");
    allTiles[12] = new Tile("Number", 6, 4, "\ud83c\udc0C");
    allTiles[13] = new Tile("Number", 7, 4, "\ud83c\udc0D");
    allTiles[14] = new Tile("Number", 8, 4, "\ud83c\udc0E");
    allTiles[15] = new Tile("Number", 9, 4, "\ud83c\udc0F");
    
    allTiles[16] = new Tile("Sticks", 1, 4, "\ud83c\udc10");
    allTiles[17] = new Tile("Sticks", 2, 4, "\ud83c\udc11");
    allTiles[18] = new Tile("Sticks", 3, 4, "\ud83c\udc12");
    allTiles[19] = new Tile("Sticks", 4, 4, "\ud83c\udc13");
    allTiles[20] = new Tile("Sticks", 5, 4, "\ud83c\udc14");
    allTiles[21] = new Tile("Sticks", 6, 4, "\ud83c\udc15");
    allTiles[22] = new Tile("Sticks", 7, 4, "\ud83c\udc16");
    allTiles[23] = new Tile("Sticks", 8, 4, "\ud83c\udc17");
    allTiles[24] = new Tile("Sticks", 9, 4, "\ud83c\udc18");

    allTiles[25] = new Tile("Circles", 1, 4, "\ud83c\udc19");
    allTiles[26] = new Tile("Circles", 2, 4, "\ud83c\udc1A");
    allTiles[27] = new Tile("Circles", 3, 4, "\ud83c\udc1B");
    allTiles[28] = new Tile("Circles", 4, 4, "\ud83c\udc1C");
    allTiles[29] = new Tile("Circles", 5, 4, "\ud83c\udc1D");
    allTiles[30] = new Tile("Circles", 6, 4, "\ud83c\udc1E");
    allTiles[31] = new Tile("Circles", 7, 4, "\ud83c\udc1F");
    allTiles[32] = new Tile("Circles", 8, 4, "\ud83c\udc20");
    allTiles[33] = new Tile("Circles", 9, 4, "\ud83c\udc21");

    allTiles[34] = new Tile("Plum", 1, 4, "\ud83c\udc22");
    allTiles[35] = new Tile("Orchid", 2, 4, "\ud83c\udc23");
    allTiles[36] = new Tile("Bamboo", 3, 4, "\ud83c\udc24");
    allTiles[37] = new Tile("Chrysanthemum", 4, 4, "\ud83c\udc25");

    allTiles[38] = new Tile("Spring", 1, 4, "\ud83c\udc26");
    allTiles[39] = new Tile("Summer", 2, 4, "\ud83c\udc27");
    allTiles[40] = new Tile("Autumn", 3, 4, "\ud83c\udc28");
    allTiles[41] = new Tile("Winter", 4, 4, "\ud83c\udc29");
    return allTiles;
}

function getTile() {
    let tile;
    for (let i = 0; i < 1; i++) {
        let ran = Math.floor(Math.random() * (42));
        if (allTilesArray[ran].remaining > 0) {
            tile = allTilesArray[ran];
            allTilesArray[ran].reduce();
        } else {
            i--;
        }
    }
    return tile;
}

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
        let playerNum = parseInt(info[0].charAt(1)) - 1;
        playerInfo[playerNum][0] = info[1]; 
        playerInfo[playerNum][1] = info[2];
        playerInfo[playerNum][2] = info[3];
        io.emit('confirm', info);
    });
    sock.on('cancel', (player) => {
        let playerNum = parseInt(player.charAt(1)) - 1;
        playerInfo[playerNum][0] = "";
        playerInfo[playerNum][1] = "";
        playerInfo[playerNum][2] = 0;
        io.emit('cancel', player);
    });
    sock.on('getp1Name', () => {
        if (playerInfo[0][1] == true) {
            sock.emit('getp1Name', playerInfo[0][0] + " (CPU Level " + playerInfo[0][2] + ")");
        } else {
            sock.emit('getp1Name', playerInfo[0][0]);
        }
    });
    sock.on('getp2Name', () => {
        if (playerInfo[1][1] == true) {
            sock.emit('getp2Name', playerInfo[1][0] + " (CPU Level " + playerInfo[1][2] + ")");
        } else {
            sock.emit('getp2Name', playerInfo[1][0]);
        }
    });
    sock.on('getp3Name', () => {
        if (playerInfo[2][1] == true) {
            sock.emit('getp3Name', playerInfo[2][0] + " (CPU Level " + playerInfo[2][2] + ")");
        } else {
            sock.emit('getp3Name', playerInfo[2][0]);
        }
    });
    sock.on('getp4Name', () => {
        if (playerInfo[3][1] == true) {
            sock.emit('getp4Name', playerInfo[3][0] + " (CPU Level " + playerInfo[3][2] + ")");
        } else {
            sock.emit('getp4Name', playerInfo[3][0]);
        }
    });
    sock.on('checkPlayers', () => {
        if (playerInfo[0][0] != "" && playerInfo[1][0] != "" && playerInfo[2][0] != "" && playerInfo[3][0] != "") {
            if (playerInfo[0][1] && playerInfo[1][1] && playerInfo[2][1] && playerInfo[3][1]) {
                sock.emit("allCPU");
            } else {
                if (!playerInfo[0][1]) {
                    primaryPlayer = 0;
                    io.emit("primary-player", 1);
                } else if (!playerInfo[1][1]) {
                    primaryPlayer = 1;
                    io.emit("primary-player", 2);
                } else if (!playerInfo[2][1]) {
                    primaryPlayer = 2;
                    io.emit("primary-player", 3);
                } else {
                    primaryPlayer = 3;
                    io.emit("primary-player", 4);
                }
                io.emit('gameReady');
            }
            
        } else {
            sock.emit('gameNotReady');
        }
    });
    sock.on('cpuTrue', (player, isSelected) => {
        io.emit('cpuTrue', player, isSelected);
    });
    sock.on('checkClicked', (parent, level) => {
        io.emit('checkClicked', parent, level);
    });
    sock.on('typing', (player, text) => {
        io.emit('typing', player, text);
    });
    sock.on('get-all-player-names', () => {
        let allNames = [playerInfo[0][0], playerInfo[1][0], playerInfo[2][0], playerInfo[3][0]];
        sock.emit('get-all-player-names', allNames);
        allTilesArray = findAllTiles();
    });
    sock.on('get-computer-players', () => {
        sock.emit('push-computer-players', playerInfo);
    });
    //Needs to be added to game.js and tested
    //All io functions created except round end
    sock.on('start-round', () => {
        if (playerInfo[(roundNum + 4) % 4][1] == true) {
            text = playerInfo[(roundNum + 4) % 4][0] + " has to roll the dice. Waiting for " + playerInfo[primaryPlayer][0] + " to press next to proceed...";
        } else {
            text = "Waiting for " + playerInfo[(roundNum + 4) % 4][0] + " to roll the dice.";
        }
        io.emit('update-text', text);
        io.emit('update-round-wind', ((roundNum + 4) % 4));
        io.emit('roll-dice', ((roundNum + 4) % 4));
    });
    sock.on("print-dice-roll", (dice) => {
        io.emit('print-dice-roll', dice);
        sock.emit('move-to-take-tiles');
    })
    sock.on("dice-rolled", () => {
        if (playerInfo[(roundNum + 4) % 4][1] == true) {
            text = playerInfo[(roundNum + 4) % 4][0] + " has rolled the dice. " + playerInfo[(roundNum + 4) % 4][0] + " needs to pick up their tiles. Waiting for " + playerInfo[primaryPlayer][0] + " to press the next button.";
        } else {
            text = playerInfo[(roundNum + 4) % 4][0] + " has rolled the dice. Waiting for " + playerInfo[(roundNum + 4) % 4][0] + " to pick up their tiles...";
        }
        io.emit('update-text', text);
        sock.emit("start-tile-take");
    });
    sock.on("get-tiles", (num, playerNum, tileCounter) => {
        let outgoingTiles = new Array(num);
        for (let i = 0; i < num; i++) {
            outgoingTiles[i] = getTile();
        }
        tileCounter += num;
        sock.emit("send-tiles", outgoingTiles, playerNum, tileCounter);
        io.emit("update-draw-rows", num, tileCounter - num, playerNum, playerInfo[playerNum][0]);
    });
    sock.on("next-player-get-tiles", (playerNum, tileCounter) => {
        if (playerInfo[(roundNum + 4) % 4][1] == true) {
            text = playerInfo[playerNum][0] + " has picked up their tiles. " + playerInfo[(roundNum + 4) % 4][0] + " needs to pick up their tile. Waiting for " + playerInfo[primaryPlayer][0] + " to press the next button.";
        } else {
            text = playerInfo[playerNum][0] + " has picked up their tiles. Waiting for " + playerInfo[(playerNum + 5) % 4][0] + " to pick up their tiles...";
        }
        io.emit("update-text", text);
        io.emit("find-next-player-get-tiles", (playerNum + 5) % 4, tileCounter);
    }); 
    sock.on("tile-take-done", () => {
        text = "Everyone has taken their tiles. Waiting for " + playerInfo[(roundNum + 4) % 4][0] + " to play a tile...";
        io.emit('update-text', text);
        io.emit('remove-dice');
        io.emit("first-turn", ((roundNum + 4) % 4));
    });
    sock.on("turn-finished", () => {
        counter++;
        text = "Waiting for " + playerInfo[counter % 4][0] + " to player their turn...";
        io.emit('update-text', text);
        io.emit("turn", (counter % 4));
    });
    sock.on("tile-played", (tile, playerNum) => {
        io.emit("place-tile", tile, playerNum);
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