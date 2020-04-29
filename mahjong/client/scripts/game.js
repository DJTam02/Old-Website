




const sock = io();
let hand = new Array();
let draw = new Array();
let bots = ["", "", "", ""];
let doubled = true;
let thisPlayerNum;
let isPrimaryPlayer;
class CPU {
    constructor (name, level, hand) {
        this.name = name;
        this.level = level;
        this.hand = hand;
    }
}
function updateText (text) {
    document.getElementById("info").innerHTML = text;
}
function init() {
    resize();
    invis();
    printPlayerNames();
    if (isPrimaryPlayer) {
        console.log("you are primary player");
        sock.emit("get-computer-players");
        sock.emit("start-round");
    }
    //gameplay();
}
function getDrawRows(sum) {
    let pos = sum % 4;
    let topDrawRow = Array.prototype.slice.call(document.getElementById("top-draw").getElementsByClassName("draw3"));
    let leftDrawRow = Array.prototype.slice.call(document.getElementById("left-draw").getElementsByClassName("draw4"));
    let rightDrawRow = Array.prototype.slice.call(document.getElementById("right-draw").getElementsByClassName("draw2"));
    let botDrawRow = Array.prototype.slice.call(document.getElementById("bot-draw").getElementsByClassName("draw1"));
    if (pos == (thisPlayerNum + 2) % 4) {
        draw = rightDrawRow.slice(sum, rightDrawRow.length).reverse();
        draw = draw.concat(topDrawRow.reverse());
        draw = draw.concat(leftDrawRow);
        draw = draw.concat(botDrawRow);
        draw = draw.concat(rightDrawRow.slice(0, sum).reverse());
        /*draw = Array.prototype.slice.call(document.getElementsByClassName("draw2").slice(sum + 1, document.getElementsByClassName("draw2").length)).reverse();
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw3")).reverse());
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw4")));
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw1")));
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw2").slice(0, sum)).reverse());
        */
    } else if (pos == (thisPlayerNum + 3) % 4) {
        draw = topDrawRow.slice(sum, topDrawRow.length).reverse();
        draw = draw.concat(leftDrawRow);
        draw = draw.concat(botDrawRow);
        draw = draw.concat(rightDrawRow.reverse());
        draw = draw.concat(topDrawRow.slice(0, sum).reverse());
        /*draw = Array.prototype.slice.call(document.getElementsByClassName("draw3").slice(sum + 1, document.getElementsByClassName("draw3").length)).reverse();
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw4")));
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw1")));
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw2")).reverse());
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw3").slice(0, sum)).reverse());
        */
    } else if (pos == (thisPlayerNum + 1) % 4) {
        draw = botDrawRow.slice(sum, botDrawRow.length);
        draw = draw.concat(rightDrawRow.reverse());
        draw = draw.concat(topDrawRow.reverse());
        draw = draw.concat(leftDrawRow);
        draw = draw.concat(botDrawRow.slice(0, sum));
        /*
        draw = Array.prototype.slice.call(document.getElementsByClassName("draw1").slice(sum + 1, document.getElementsByClassName("draw1").length));
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw2")).reverse());
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw3")).reverse());
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw4")));
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw1").slice(0, sum)).reverse());
        */
    } else if (pos == thisPlayerNum) {
        draw = leftDrawRow.slice(sum, leftDrawRow.length);
        draw = draw.concat(botDrawRow);
        draw = draw.concat(rightDrawRow.reverse());
        draw = draw.concat(topDrawRow.reverse());
        draw = draw.concat(leftDrawRow.slice(0, sum));
        /*
        draw = Array.prototype.slice.call(document.getElementsByClassName("draw4").slice(sum + 1, document.getElementsByClassName("draw4").length));
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw1")));
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw2")).reverse());
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw3")).reverse());
        draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw4").slice(0, sum)).reverse());
        */
    } 
}
sock.on("push-computer-players", (info) => {
    for (let i = 0; i < 4; i++) {
        if (info[i][1] == true) {
            bots[i] = new CPU(info[i][0], info[i][2], new Array());
        } else {
            bots[i] = "";
        }
    }
});
function printPlayerNames() {
    thisPlayerNum = parseInt(localStorage.getItem("player-num")) - 1;
    sessionStorage.setItem('player-name', localStorage.getItem('player-name'));
    isPrimaryPlayer = (localStorage.getItem("isPrimaryPlayer") == "true");
    localStorage.removeItem('player-num');
    localStorage.removeItem('player-name');
    localStorage.removeItem('isPrimaryPlayer');
    alert("player num is: " + thisPlayerNum);
    sock.emit('get-all-player-names');
}
function swap(evt) {
    let id = evt.currentTarget.id;
    if (prev == "" || prev == false) {
        prev = id;
    } else {
        let currNum = parseInt(id.replace("hand-", "")) - 1;
        let prevNum = parseInt(prev.replace("hand-", "")) - 1;
        var prevText = document.getElementById(prev).textContent;
        var currText = document.getElementById(id).textContent;
        document.getElementById(prev).innerHTML = currText;
        document.getElementById(id).innerHTML = prevText;
        let temp = hand[currNum];
        hand[currNum] = hand[prevNum];
        hand[prevNum] = temp;
        prev = "";
    }
}
function botDraw(evt) {
    sock.emit("get-tiles", 1, evt.currentTarget.playerNum, parseInt(sessionStorage.getItem("tileCounter")));
    document.getElementById("take-tiles-button").removeEventListener("click", botDraw);
    botTurn(evt);
}
function botTurn(evt) {
    //For now just emit random
    let ran = Math.floor(Math.random() * 14);
    console.log("ran is: " + ran + " and bot hand length is: " + bots[evt.currentTarget.playerNum].hand.length);
    document.getElementById("take-tiles-button").removeEventListener("click", botTurn);
    /*for (let i = 0; i < bots[evt.currentTarget.playerNum].hand.length; i++) {
        console.log(bots[evt.currentTarget.playerNum].hand[i].unicode)
    }*/
    let temp = bots[evt.currentTarget.playerNum].hand[ran].unicode;
    for (let i = ran + 1; i < bots[evt.currentTarget.playerNum].hand.length; i++) {
        bots[evt.currentTarget.playerNum].hand[i - 1] = bots[evt.currentTarget.playerNum].hand[i]; 
    }
    bots[evt.currentTarget.playerNum].hand[13] = "";
    sock.emit("tile-played", temp, evt.currentTarget.playerNum);
    sock.emit("turn-finished", evt.currentTarget.playerNum);
}
function drawTile() {
    document.getElementById("take-tiles-button").style.display = "none";
    document.getElementById("take-tiles-button").removeEventListener("click", drawTile);
    sock.emit("get-tiles", 1, thisPlayerNum, parseInt(sessionStorage.getItem("tileCounter")));
}
function promptPlaceTile() {
    updateText("You have drawn a tile. Please drag and drop a tile in the middle.");
    let playerHand = document.getElementById("bot-hand").getElementsByClassName("tile-vert");
    playerHand[13].innerHTML = "<span>" + hand[13].unicode + "</span>";
    playerHand[13].style.padding = "0px";
    playerHand[13].style.opacity = "100%"
    playerHand[13].style.fontSize = h + "px";
    playerHand[13].style.backgroundColor = "transparent";
    playerHand[13].style.border = "0px";
    playerHand[13].style.color = "black";
    for (let i = 0; i < playerHand.length; i++) {
        playerHand[i].setAttribute("draggable", true);
    }
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let botHand = document.getElementById("bot-hand").getElementsByClassName("tile-vert");
    for (let i = 0; i < botHand.length; i++) {
        botHand[i].draggable = false;
    }
    updatePlayerHand(data);
}
function updatePlayerHand (data) {
    data = parseInt(data.replace("hand-", "")) - 1;
    let temp = hand[data].unicode;
    for (let i = data + 1; i < hand.length; i++) {
        hand[i - 1] = hand[i];
        document.getElementById("hand-" + i).innerHTML = document.getElementById("hand-" + (i + 1)).innerHTML;
    }
    hand[13] = "";
    document.getElementById("hand-14").innerHTML = "";
    document.getElementById("hand-14").style.opacity = "0%";
    prev = "";
    sock.emit("tile-played", temp, thisPlayerNum);
    sock.emit("turn-finished");
}
sock.on('get-all-player-names', (names) => {
    if (thisPlayerNum == 0) {
        document.getElementById("right-player-name").innerHTML = names[1];
        document.getElementById("top-player-name").innerHTML = names[2];
        document.getElementById("left-player-name").innerHTML = names[3];
        document.getElementById("bottom-player-name").innerHTML = names[0];
    } else if (thisPlayerNum == 1) {
        document.getElementById("right-player-name").innerHTML = names[2];
        document.getElementById("top-player-name").innerHTML = names[3];
        document.getElementById("left-player-name").innerHTML = names[0];
        document.getElementById("bottom-player-name").innerHTML = names[1];
    } else if (thisPlayerNum == 2) {
        document.getElementById("right-player-name").innerHTML = names[3];
        document.getElementById("top-player-name").innerHTML = names[0];
        document.getElementById("left-player-name").innerHTML = names[1];
        document.getElementById("bottom-player-name").innerHTML = names[2];
    } else {
        document.getElementById("right-player-name").innerHTML = names[0];
        document.getElementById("top-player-name").innerHTML = names[1];
        document.getElementById("left-player-name").innerHTML = names[2];
        document.getElementById("bottom-player-name").innerHTML = names[3];
    }
});
sock.on('update-text', updateText);
sock.on('update-round-wind', (num) => {
    let path = "resources/images/";
    if (num == 0) {
        path = path + "east.jpg";
    } else if (num == 1) {
        path = path + "south.jpg";
    } else if (num == 2) {
        path = path + "north.jpg";
    } else {
        path = path + "west.jpg";
    }
    document.getElementById("round-wind-img").setAttribute("src", path);
});
sock.on('roll-dice', (num) => {
    document.getElementById("roll-dice").style.display = "inline";
    document.getElementById("roll-dice").addEventListener('click', rollDice);
    if (bots[num].level > 0 && isPrimaryPlayer) {
        updateText("Click \"Next\" to see the computer roll the dice.");
        document.getElementById("roll-dice").innerHTML = "Next";
    } else if (num == thisPlayerNum) {
        updateText("It's your turn to roll the dice. Click \"Roll Dice\" to roll the dice.");
    }
    sessionStorage.setItem("player-rolled-dice", num);
});
function rollDice () {
    //for dev
    console.log("rolling dice..");
    document.getElementById("roll-dice").removeEventListener('click', rollDice);
    let sum = 0;
    let dice = [Math.floor(Math.random() * (6 - 1 + 1)) + 1, Math.floor(Math.random() * (6 - 1 + 1)) + 1, Math.floor(Math.random() * (6 - 1 + 1)) + 1];
    for (let i = 0; i < dice.length; i++) {
        sum += dice[i];
    }
    getDrawRows(sum);
    sock.emit('print-dice-roll', dice);
}
sock.on('print-dice-roll', (dice) => {
    for (let i = 0; i < 3; i++) {
        let elem = document.createElement("img");
        elem.setAttribute("class", "dice");
        elem.setAttribute("height", (w * 3));
        elem.setAttribute("width", (w * 3));
        elem.setAttribute("margin", "auto");
        if (dice[i] == 1) {
            elem.src = "resources/images/dice1.png";
        } else if (dice[i] == 2) {
            elem.src = "resources/images/dice2.png";
        } else if (dice[i] == 3) {
            elem.src = "resources/images/dice3.png";
        } else if (dice[i] == 4) {
            elem.src = "resources/images/dice4.png";
        } else if (dice[i] == 5) {
            elem.src = "resources/images/dice5.png";
        } else {
            elem.src = "resources/images/dice6.png";
        }
        document.getElementById("mid").appendChild(elem);
    }
    document.getElementById("roll-dice").id = "take-tiles-button";
    document.getElementById("take-tiles-button").innerHTML = "Take Tiles";
});
sock.on('move-to-take-tiles', () => {
    sock.emit('dice-rolled');
});
sock.on('update-draw-rows', (num, tileCounter, playerNum, name) => {
    for (let i = tileCounter; i < tileCounter + num; i++) {
        if (doubled) {
            doubled = false;
        } else {
            draw[Math.floor(i / 2)].style.opacity = "0%";
            doubled = true;
        }
    }
    if (tileCounter < 48) {
        if (thisPlayerNum == playerNum) {
            let playerHand = document.getElementById('bot-hand').getElementsByClassName("tile-vert");
            for (let i = 0; i < (Math.floor(tileCounter / 16) + 1) * num; i++) {
                playerHand[i].innerHTML = "<span>" + hand[i].unicode + "</span>";
                playerHand[i].style.padding = "0px";
                playerHand[i].style.opacity = "100%"
                playerHand[i].style.fontSize = h + "px";
                playerHand[i].style.backgroundColor = "transparent";
                playerHand[i].style.border = "0px";
                playerHand[i].style.color = "black";
            }
        } else if (playerNum == (thisPlayerNum + 1) % 4) {
            let rightHand = document.getElementById("right-hand").getElementsByClassName("tile-horiz");
            for (let i = 0; i < (Math.floor(tileCounter / 16) + 1) * num; i++) {
                rightHand[i].style.opacity = "100%";
            }
        } else if (playerNum == (thisPlayerNum + 2) % 4) {
            let topHand = document.getElementById("top-hand").getElementsByClassName("tile-vert");
            for (let i = 0; i < (Math.floor(tileCounter / 16) + 1) * num; i++) {
                topHand[i].style.opacity = "100%";
            }
        } else if (playerNum == (thisPlayerNum + 3) % 4) {
            let leftHand = document.getElementById("left-hand").getElementsByClassName("tile-horiz");
            for (let i = 0; i < (Math.floor(tileCounter / 16) + 1) * num; i++) {
                leftHand[i].style.opacity = "100%";
            }
        }
    } else if (tileCounter >= 53) {
        updateText(name + " has picked up a tile. Waiting for " + name + " to play a tile...");
        if (thisPlayerNum == playerNum) {
            let playerHand = document.getElementById("bot-hand").getElementsByClassName("tile-vert");
            playerHand[13].style.opacity = "100%";
        } else if (playerNum == (thisPlayerNum + 1) % 4) {
            let rightHand = document.getElementById("right-hand").getElementsByClassName("tile-horiz");
            rightHand[13].style.opacity = "100%";
        } else if (playerNum == (thisPlayerNum + 2) % 4) {
            let topHand = document.getElementById("top-hand").getElementsByClassName("tile-vert");
            topHand[13].style.opacity = "100%";
        } else if (playerNum == (thisPlayerNum + 3) % 4) {
            let leftHand = document.getElementById("left-hand").getElementsByClassName("tile-horiz");
            leftHand[13].style.opacity = "100%";
        }
    } else {
        if (thisPlayerNum == playerNum) {
            let playerHand = document.getElementById('bot-hand').getElementsByClassName("tile-vert");
            for (let i = 0; i < 12 + num; i++) {
                playerHand[i].innerHTML = "<span>" + hand[i].unicode + "</span>";
                playerHand[i].style.padding = "0px";
                playerHand[i].style.opacity = "100%"
                playerHand[i].style.fontSize = h + "px";
                playerHand[i].style.backgroundColor = "transparent";
                playerHand[i].style.border = "0px";
                playerHand[i].style.color = "black";
            }
        } else if (playerNum == (thisPlayerNum + 1) % 4) {
            let rightHand = document.getElementById("right-hand").getElementsByClassName("tile-horiz");
            for (let i = 0; i < 12 + num; i++) {
                rightHand[i].style.opacity = "100%";
            }
        } else if (playerNum == (thisPlayerNum + 2) % 4) {
            let topHand = document.getElementById("top-hand").getElementsByClassName("tile-vert");
            for (let i = 0; i < 12 + num; i++) {
                topHand[i].style.opacity = "100%";
            }
        } else if (playerNum == (thisPlayerNum + 3) % 4) {
            let leftHand = document.getElementById("left-hand").getElementsByClassName("tile-horiz");
            for (let i = 0; i < 12 + num; i++) {
                leftHand[i].style.opacity = "100%";
            }
        }
    }
    tileCounter += num;
    sessionStorage.setItem("tileCounter", tileCounter);
    console.log(name + " has taken a tile");
});
sock.on('start-tile-take', () => {
    document.getElementById("take-tiles-button").style.display = "inline";
    updateText("Click the \"Take Tiles\" button to take your tiles!");
    if (parseInt(sessionStorage.getItem("player-rolled-dice")) != thisPlayerNum) {
        updateText("Click the \"Next\" button to see the computer take their tiles.");
        document.getElementById("take-tiles-button").innerHTML = "Next";
    }
    document.getElementById("take-tiles-button").num = 4;
    document.getElementById("take-tiles-button").playerNum = parseInt(sessionStorage.getItem("player-rolled-dice"));
    document.getElementById("take-tiles-button").tileCounter = 0;
    document.getElementById("take-tiles-button").addEventListener("click", emitGetTiles);
});
function emitGetTiles() {
    document.getElementById("take-tiles-button").removeEventListener('click', emitGetTiles);
    document.getElementById("take-tiles-button").style.display = "none";
    //let sum = document.getElementById("take-tiles-button").sum;
    let num = document.getElementById("take-tiles-button").num;
    let playerNum = document.getElementById("take-tiles-button").playerNum;
    let tileCounter = document.getElementById("take-tiles-button").tileCounter;
    sock.emit("get-tiles", num, playerNum, tileCounter);
}
sock.on("send-tiles", (newTiles, playerNum, tileCounter) => {
    let counter = 0;
    if (bots[playerNum].level > 0) {
        if (bots[playerNum].hand.length < 14) {
            let start = bots[playerNum].hand.length;
            let end = bots[playerNum].hand.length + newTiles.length;
            for (let i = start; i < end; i++) {
                bots[playerNum].hand[i] = newTiles[counter];
                counter++;
            }
        } else {
            bots[playerNum].hand[13] = newTiles[counter];
        }
    } else {
        if (hand.length < 14) { 
            let start = hand.length;
            let end = hand.length + newTiles.length;
            for (let i = start; i < end; i++) {
                hand[i] = newTiles[counter];
                counter++;
            }
        } else {
            hand[13] = newTiles[counter];
        }
    }
    if (tileCounter < 54) {
        sock.emit("next-player-get-tiles", playerNum, tileCounter);
    } else if (thisPlayerNum == playerNum) {
        promptPlaceTile();
    }
});
sock.on("find-next-player-get-tiles", (playerNum, tileCounter) => {
    if (bots[playerNum] != "" && isPrimaryPlayer) {
        updateText("Click the \"Next\" button to see the computer get their tiles.");
        document.getElementById("take-tiles-button").innerHTML = "Next";
    } else if (thisPlayerNum == playerNum) {
        updateText("Click the \"Take Tiles\" button to take your tiles!");
        document.getElementById("take-tiles-button").innerHTML = "Take Tiles";
    }
    document.getElementById("take-tiles-button").style.display = "inline";
    document.getElementById("take-tiles-button").playerNum = playerNum;
    if (tileCounter == 48) {
        document.getElementById("take-tiles-button").num = 2;
        document.getElementById("take-tiles-button").tileCounter = tileCounter;
        document.getElementById("take-tiles-button").addEventListener("click", emitGetTiles);
    } else if (tileCounter == 53) {
        document.getElementById("take-tiles-button").num = 1;
        document.getElementById("take-tiles-button").tileCounter = tileCounter;
        document.getElementById("take-tiles-button").addEventListener("click", emitGetTiles);
        document.getElementById("take-tiles-button").innerHTML = "Pong/Seung/Gong";
        document.getElementById("take-tiles-button").style.display = "none";
        console.log("finished tile taking");
        sock.emit("tile-take-done");
    } else if (tileCounter >= 50) {
        document.getElementById("take-tiles-button").num = 1;
        document.getElementById("take-tiles-button").tileCounter = tileCounter;
        document.getElementById("take-tiles-button").addEventListener("click", emitGetTiles);
    } else {
        document.getElementById("take-tiles-button").num = 4;
        document.getElementById("take-tiles-button").tileCounter = tileCounter;
        document.getElementById("take-tiles-button").addEventListener("click", emitGetTiles);
    }
});
sock.on('remove-dice', () => {
    document.getElementById("mid").innerHTML ="";
});
sock.on("first-turn", (playerNum) => {
    console.log("first turn is called");
    document.getElementById("take-tiles-button").removeEventListener('click', emitGetTiles);
    els = document.getElementById("bot-hand").getElementsByClassName('tile-vert');
    for (let i = 0; i < els.length; i++) {
        els[i].addEventListener('click', swap);
    }
    if (bots[playerNum].level > 0 && isPrimaryPlayer) {
        console.log("bot turn");
        updateText("Click \"Next\" to see the bot player their tile.");
        document.getElementById("take-tiles-button").innerHTML = "Next";
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").playerNum = playerNum;
        document.getElementById("take-tiles-button").addEventListener("click", botTurn);
    } else if (playerNum == thisPlayerNum) {
        console.log("player turn");
        updateText("It is your turn. Please discard a tile.");
        promptPlaceTile();
    }
    //First turn
    //Emit turn-finished
});
sock.on("place-tile", (tile, playerNum) => {
    //if (thisPlayerNum != playerNum) {
        let el = document.createElement("BUTTON");
        el.classList.add("tile-vert");
        el.innerHTML = tile;
        console.log("tile is: " + tile);
        el.style.padding = "0px";
        el.style.opacity = "100%"
        el.style.fontSize = h + "px";
        el.style.backgroundColor = "transparent";
        el.style.border = "0px";
        el.style.color = "black";
        document.getElementById("mid").appendChild(el);
        if (thisPlayerNum == playerNum) {
            let playerHand = document.getElementById("bot-hand").getElementsByClassName("tile-vert");
            playerHand[playerHand.length - 1].style.opacity = "0%";
        } else if (playerNum == (thisPlayerNum + 1) % 4) {
            let rightHand = document.getElementById("right-hand").getElementsByClassName("tile-horiz");
            rightHand[rightHand.length - 1].style.opacity = "0%";
        } else if (playerNum == (thisPlayerNum + 2) % 4) {
            let topHand = document.getElementById("top-hand").getElementsByClassName("tile-vert");
            topHand[topHand.length - 1].style.opacity = "0%";
        } else if (playerNum == (thisPlayerNum + 3) % 4) {
            let leftHand = document.getElementById("left-hand").getElementsByClassName("tile-horiz");
            leftHand[leftHand.length - 1].style.opacity = "0%";
        }
    //}
});
sock.on('turn', (num) => {
    console.log("turn called");
    els = document.getElementById("bot-hand").getElementsByClassName('tile-vert');
    for (let i = 0; i < els.length; i++) {
        els[i].addEventListener('click', swap);
    }
    if (bots[num].level > 0 && isPrimaryPlayer) {
        updateText("Click \"Next\" to see the bot player their tile.");
        document.getElementById("take-tiles-button").innerHTML = "Next";
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").playerNum = num;
        document.getElementById("take-tiles-button").addEventListener("click", botDraw);
    } else if (num == thisPlayerNum) {
        updateText("It is your turn. Please click \"Pick Up Tile\" to pick up a tile. Then discard a tile.");
        document.getElementById("take-tiles-button").innerHTML = "Pick Up Tile";
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").addEventListener("click", drawTile);
    }
});
/*function gameplay() {
    let gameLoop = 0;
    let roundLoop = 0;
    while (gameLoop < 4) {
        roundLoop = 0;
        while (roundLoop < 4) {
            turn(roundLoop, );
        }
    }
}*/
