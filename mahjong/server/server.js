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

let players = [false, false, false, false];
let botsHands = [
    new Array(),
    new Array(),
    new Array(),
    new Array()
];
let roundNum = -1;
let primaryPlayer = 0;
let tileCounter = 0;
let flowerCounter = 0;

let allTilesArray;
function startRound() {
    roundNum++;
    let botRolling = false;
    if (players[(roundNum + 4) % 4].isCPU) {
        text = players[(roundNum + 4) % 4].name + " has to roll the dice. Waiting for " + players[primaryPlayer].name + " to press next to proceed...";
        botRolling = true;
    } else {
        text = "Waiting for " + players[(roundNum + 4) % 4].name + " to roll the dice.";
    }
    io.emit('update-text', text);
    io.emit('update-round-wind', ((roundNum + 4) % 4));
    io.emit('roll-dice', ((roundNum + 4) % 4), botRolling);
}
function giveBotTiles(botNum, num) {
    let start = botsHands[botNum].length;
    for (let i = start; i < start + num; i++) {
        botsHands[botNum][i] = getTile();
    } 
    players[botNum].handIndex += num; 
}
function nextFlower(playerNum) {
    if (flowerCounter < 4) {
        flowerCounter++;
        if (players[playerNum].isCPU) {
            io.emit("check-bot-flower", botsHands[playerNum], playerNum, 2);
        } else {
            text = players[playerNum].name + " has replaced their flowers. Waiting for " + players[(playerNum + 1) % 4].name + " to replace their flowers...";
            io.emit("update-text", text);
            io.emit("flower", playerNum);
        }
    } else {
        firstTurn(((roundNum + 4) % 4));
    }
}
function firstTurn(playerNum) {
    if (players[playerNum].isCPU) {
        text = players[(playerNum + 3) % 4].name + " has no flowers. " + players[playerNum].name + " needs to play a tile. Waiting for " + players[primaryPlayer].name + " to press next to proceed...";
        io.emit("bot-first-turn", playerNum);
    } else {
        text = "Waiting for " + players[playerNum].name + " to play their turn...";
        io.emit("first-turn", playerNum);
    }
    io.emit('update-text', text);
}

function botTurn(playerNum) {
    //For now just emit random
    let ran = Math.floor(Math.random() * botsHands[playerNum].length);
    /*if (bots[evt.currentTarget.playerNum].name == "Jacob") {
        for (let i = 0; i < bots[evt.currentTarget.playerNum].hand.length; i++) {
            console.log("i is: " + i + ": " + bots[evt.currentTarget.playerNum].hand[i].unicode);
        }
    }*/
    let temp = botsHands[playerNum][ran].unicode;
    let tempValue = botsHands[playerNum][ran].value;
    let tempSuit = botsHands[playerNum][ran].suit;
    botsHands[playerNum].splice(ran, 1);
    players[playerNum].handIndex--;
    console.log("handIndex is: " + players[playerNum].handIndex);
    io.emit("place-tile", temp, tempValue, tempSuit, playerNum, players[playerNum].handIndex);
    turn((playerNum + 1) % 4);
}
function spliceBotHand(flower, botNum) {
    let output = new Array(flower.length);
    for (let i = 0; i < flower.length; i++) {
        output[i] = botsHands[botNum][flower[i]];
    }
    for (let i = 0; i < flower.length; i++) {
        botsHands[botNum].splice(flower[i] - i, 1);
    }
    players[botNum].handIndex = botsHands[botNum].length;
    return output;
}
function turn(playerNum) {
    if (players[playerNum].isCPU) {
        text = players[(playerNum + 3) % 4].name + " has played their tile. " + players[playerNum].name + " needs to draw a tile. Waiting for " + players[primaryPlayer].name + " to press next to proceed...";
        io.emit("bot-turn", playerNum);
    } else {
        text = "Waiting for " + players[playerNum].name + " to play their turn...";
        io.emit("turn", playerNum);
    }
    io.emit('update-text', text);
}
function gameEvent(tiles, playerNum) {
    let lastFin = players[playerNum].finIndex;
    players[playerNum].finIndex += (tiles.length + 1);
    let lastHand = players[playerNum].handIndex;
    players[playerNum].handIndex -= tiles.length;
    io.emit("game-event", tiles, playerNum, lastFin, lastHand);
}
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
class Player {
    constructor (name, isCPU, level, finIndex, flowerIndex, handIndex) {
        this.name = name;
        this.isCPU = isCPU;
        this.level = level;
        this.finIndex = finIndex;
        this.flowerIndex = flowerIndex;
        this.handIndex = handIndex;
    }
}

function findAllTiles() {
    let allTiles = new Array(42);
    allTiles[0] = new Tile("East", 1, 4, "\ud83c\udc00");
    allTiles[1] = new Tile("South", 5, 4, "\ud83c\udc01");
    allTiles[2] = new Tile("West", 6, 4, "\ud83c\udc02");
    allTiles[3] = new Tile("North", 3, 4, "\ud83c\udc03");
    allTiles[4] = new Tile("Red", 4, 4, "\ud83c\udc04");
    allTiles[5] = new Tile("Green", 2, 4, "\ud83c\udc05");
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

    allTiles[34] = new Tile("Plum", 1, 1, "\ud83c\udc22");
    allTiles[35] = new Tile("Orchid", 2, 1, "\ud83c\udc23");
    allTiles[36] = new Tile("Bamboo", 3, 1, "\ud83c\udc24");
    allTiles[37] = new Tile("Chrysanthemum", 4, 1, "\ud83c\udc25");

    allTiles[38] = new Tile("Spring", 1, 1, "\ud83c\udc26");
    allTiles[39] = new Tile("Summer", 2, 1, "\ud83c\udc27");
    allTiles[40] = new Tile("Autumn", 3, 1, "\ud83c\udc28");
    allTiles[41] = new Tile("Winter", 4, 1, "\ud83c\udc29");
    return allTiles;
}

function getTile() {
    let tile;
    for (let i = 0; i < 1; i++) {
        let ran = Math.floor(Math.random() * (allTilesArray.length));
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
        players[playerNum] = new Player(info[1], info[2], info[3], 0, 0, 0);
        io.emit('confirm', info);
    });
    sock.on('cancel', (player) => {
        let playerNum = parseInt(player.charAt(1)) - 1;
        players[playerNum] = false;
        io.emit('cancel', player);
    });
    sock.on('checkPlayers', () => {
        if (players[0] != false && players[1] != false && players[2] != false && players[3] != false) {
            if (players[0].isCPU && players[1].isCPU && players[2].isCPU && players[3].isCPU) {
                sock.emit("allCPU");
            } else {
                if (!players[0].isCPU) {
                    primaryPlayer = 0;
                } else if (!players[1].isCPU) {
                    primaryPlayer = 1;
                } else if (!players[2].isCPU) {
                    primaryPlayer = 2;
                } else {
                    primaryPlayer = 3;
                }
                io.emit('gameReady');
                allTilesArray = findAllTiles();
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
        let allNames = new Array(4);
        for (let i = 0; i < 4; i++) {
            if (players[i] != false) {
                if (players[i].isCPU) {
                    allNames[i] = players[i].name + " (CPU Level " + players[i].level + ")";
                } else {
                    allNames[i] = players[i].name;
                }
            } else {
                allNames[i] = "";
            }
        }
        sock.emit('get-all-player-names', allNames, primaryPlayer);
    });
    //Needs to be added to game.js and tested
    //All io functions created except round end
    sock.on('start-round', () => {
        startRound();
    });
    sock.on("print-dice-roll", (dice, sum) => {
        io.emit('print-dice-roll', dice, sum);
        if (players[(roundNum + 4) % 4].isCPU) {
            text = players[(roundNum + 4) % 4].name + " has rolled the dice. " + players[(roundNum + 4) % 4].name + " needs to pick up their tiles. Waiting for " + players[primaryPlayer].name + " to press the next button.";
            io.emit('update-text', text);
            giveBotTiles((roundNum + 4) % 4, 4);
            io.emit("bot-took-tiles", 4, (roundNum + 4) % 4, players[(roundNum + 4) % 4].name);
        } else {
            text = players[(roundNum + 4) % 4].name + " has rolled the dice. Waiting for " + players[(roundNum + 4) % 4].name + " to pick up their tiles...";
            io.emit('update-text', text);
            io.emit("find-next-player-get-tiles", (roundNum + 4) % 4, 4);
        }
        tileCounter += 4;
    });
    sock.on("next-clicked", (num, playerNum) => {
        io.emit("update-draw-rows", num, players[playerNum].handIndex, playerNum);
    });
    sock.on("get-tiles", (num, playerNum, side) => {
        let outgoingTiles = new Array(num);
        for (let i = 0; i < num; i++) {
            outgoingTiles[i] = getTile();
        }
        players[playerNum].handIndex += num;
        if (side == 1) {
            console.log("front");
            io.emit("update-draw-rows", num, players[playerNum].handIndex, playerNum);
        } else {
            console.log("back");
            io.emit("update-draw-row-back", num, players[playerNum].handIndex, playerNum);
        }   
        sock.emit("send-tiles", outgoingTiles);
    });
    sock.on("next-player-get-tiles", (playerNum) => {
        if (tileCounter == 53) {
            io.emit('remove-dice');
            nextFlower((roundNum + 4) % 4);
            if (players[(roundNum + 4) % 4].isCPU == false) { 
                text = "Everyone has taken their tiles. Waiting for " + players[(roundNum + 4) % 4].name + " to replace their flowers...";
                io.emit("update-text", text);
            }
        } else {
            if (tileCounter == 48) {
                num = 2;
            } else if (tileCounter >= 50) {
                num = 1;
            } else {
                num = 4;
            }
            if (players[(playerNum + 1) % 4].isCPU) {
                text = players[playerNum].name + " has picked up their tiles. " + players[(playerNum + 1) % 4].name + " needs to pick up their tile. Waiting for " + players[primaryPlayer].name + " to press the next button.";
                giveBotTiles((playerNum + 1) % 4, num);
                io.emit("bot-took-tiles", num, (playerNum + 1) % 4, players[(playerNum + 1) % 4].name);
            } else {
                text = players[playerNum].name + " has picked up their tiles. Waiting for " + players[(playerNum + 1) % 4].name  + " to pick up their tiles...";
                io.emit("find-next-player-get-tiles", (playerNum + 1) % 4, num);
            }
            tileCounter += num;
            io.emit("update-text", text);
        }
    }); 
    sock.on("bot-flower-checked", (flower, playerNum, phase) => {
        if (phase == 1) {
            if (flower.length == 0) {
                botTurn(playerNum);
            } else {
                text = players[playerNum].name + " has drawn a flower and needs to replace them. Waiting for " + players[primaryPlayer].name + " to press next to proceed...";
                let output = spliceBotHand(flower, playerNum);
                io.emit("prompt-next", output, playerNum, phase);
            }
        } else {
            if (flower.length == 0) {
                text = players[playerNum].name + " has no flowers. Waiting for " + players[primaryPlayer].name + " to press next to proceed...";
                io.emit("bot-no-flowers", playerNum, players[playerNum].name);
            } else {
                text = players[playerNum].name + " has flowers and needs to replace them. Waiting for " + players[primaryPlayer].name + " to press next to proceed...";
                let output = spliceBotHand(flower, playerNum);
                io.emit("prompt-next", output, playerNum, phase);
            }
            io.emit("update-text", text);
        }
    });
    sock.on("show-bot-flowers", (flower, playerNum, phase) => {
        io.emit("show-flower", flower, playerNum, players[playerNum].flowerIndex, players[playerNum].handIndex);
        players[playerNum].flowerIndex += flower.length;
        giveBotTiles(playerNum, flower.length);
        io.emit("update-draw-row-back", flower.length, players[playerNum].handIndex, playerNum);
        io.emit("check-bot-flower", botsHands[playerNum], playerNum, phase);
    });
    sock.on("get-next-flower", (playerNum) => {
        nextFlower((playerNum + 1) % 4);
    });
    sock.on("show-flower", (flower, playerNum) => {
        players[playerNum].handIndex -= flower.length;
        io.emit("show-flower", flower, playerNum, players[playerNum].flowerIndex, players[playerNum].handIndex);
        //io.emit("update-draw-row-back", flower.length, players[playerNum].handIndex, playerNum);
        players[playerNum].flowerIndex += flower.length;
    });
    sock.on("bot-turn", (playerNum) => {
        giveBotTiles(playerNum, 1);
        io.emit("update-draw-rows", 1, players[playerNum].handIndex, playerNum);
        io.emit("check-bot-flower", botsHands[playerNum], playerNum, 1);
    });
    sock.on("bot-first-turn", (playerNum) => {
        botTurn(playerNum);
    });
    sock.on("turn-finished", (playerNum) => {
        turn((playerNum + 1) % 4);
    });
    sock.on("tile-played", (tile, value, suit, playerNum) => {
        players[playerNum].handIndex--;
        io.emit("place-tile", tile, value, suit, playerNum, players[playerNum].handIndex);
    });
    sock.on("game-event", (tiles, playerNum) => {
        gameEvent(tiles, playerNum);
        if (tiles.length == 3) {
            io.emit("draw-from-back", playerNum);
        } else {
            io.emit("first-turn", playerNum);
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