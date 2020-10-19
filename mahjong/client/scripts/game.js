const sock = io();
let hand = new Array();
let draw = new Array();
let bots = ["", "", "", ""];
let finishedArrays = [
    new Array(),
    new Array(),
    new Array(),
    new Array(),
    new Array()
]
let playerPos = new Array(4);
let doubled = true;
let backDoubled = true;
let isPrimaryPlayer = false;
let thisPlayerNum;
function init() {
    resize();
    invis();
    initializePlayers();
    printPlayerNames();
}
function printPlayerNames() {
    sessionStorage.setItem('player-name', localStorage.getItem('player-name'));
    sessionStorage.setItem("tileTakeDone", "false");
    sessionStorage.setItem("flower-done", "false");
    localStorage.removeItem('player-name');
    sock.emit('get-all-player-names');
}
sock.on('get-all-player-names', (names, primaryPlayerNum) => {
    for (let i = 0; i < playerPos.length; i++) {
        document.getElementById("player-name" + playerPos[i]).innerHTML = names[i];
    }
    if (playerPos[primaryPlayerNum] == 0) {
        isPrimaryPlayer = true;
        console.log("round started");
        sock.emit("start-round");
    }
});
function initializePlayers() {
    thisPlayerNum = parseInt(localStorage.getItem("player-num")) - 1;
    localStorage.removeItem('player-num');
    for (let i = 0; i < playerPos.length; i++) {
        playerPos[i] = (i + 4 - thisPlayerNum) % 4;
    }
}












//Start
function updateText (text) {
    document.getElementById("info").innerHTML = text;
}
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
sock.on('roll-dice', (num, botRolling) => {
    if (botRolling && isPrimaryPlayer) {
        updateText("Click \"Next\" to see the computer roll the dice.");
        document.getElementById("roll-dice").style.display = "inline";
        document.getElementById("roll-dice").addEventListener('click', rollDice);
        document.getElementById("roll-dice").innerHTML = "Next";
    } else if (playerPos[num] == 0) {
        updateText("It's your turn to roll the dice. Click \"Roll Dice\" to roll the dice.");
        document.getElementById("roll-dice").style.display = "inline";
        document.getElementById("roll-dice").addEventListener('click', rollDice);
    }
});
function rollDice () {
    document.getElementById("roll-dice").removeEventListener('click', rollDice);
    let sum = 0;
    let dice = new Array(3);
    for (let i = 0; i < dice.length; i++) {
        dice[i] = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        sum += dice[i];
    }
    sock.emit('print-dice-roll', dice, sum);
}
function getDrawRows(sum) {
    let pos = sum % 4;
    let startDrawRow = Array.prototype.slice.call(document.getElementById("draw" + ((playerPos[pos] + 3) % 4)).getElementsByClassName("tile"));
    if (playerPos[pos] == 3 || playerPos[pos] == 2) {
        draw = startDrawRow.slice(0, startDrawRow.length - sum).reverse();
    } else {
        draw = startDrawRow.slice(sum, startDrawRow.length);
    }
    for (let i = 1; i < 4; i++) {
        let tempDrawRow = Array.prototype.slice.call(document.getElementById("draw" + ((playerPos[pos] + 3 + i) % 4)).getElementsByClassName("tile"));
        if ((playerPos[pos] + 3 + i) % 4 == 1 || (playerPos[pos] + 3 + i) % 4 == 2) {
            draw = draw.concat(tempDrawRow.reverse());
        } else {
            draw = draw.concat(tempDrawRow);
        }
    } 
    if (playerPos[pos] == 3 || playerPos[pos] == 2) {
        draw = draw.concat(startDrawRow.slice(startDrawRow.length - sum, startDrawRow.length).reverse());
    } else {
        draw = draw.concat(startDrawRow.slice(0, sum));
    }
}
sock.on('print-dice-roll', (dice, sum) => {
    getDrawRows(sum);
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










//Get Tiles
sock.on("bot-took-tiles", (num, playerNum, name) => {
    if (isPrimaryPlayer) {
        updateText("Click the \"Next\" button to see " + name + " take their tiles.");
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").innerHTML = "Next";
        document.getElementById("take-tiles-button").num = num;
        document.getElementById("take-tiles-button").playerNum = playerNum;
        document.getElementById("take-tiles-button").addEventListener("click", nextClicked);
    }
});
sock.on("find-next-player-get-tiles", (playerNum, num) => {
    if (playerPos[playerNum] == 0) {
        updateText("Click the \"Take Tiles\" button to take your tiles!");
        document.getElementById("take-tiles-button").innerHTML = "Take Tiles";
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").playerNum = playerNum;
        document.getElementById("take-tiles-button").num = num;
        document.getElementById("take-tiles-button").side = 1;
        document.getElementById("take-tiles-button").addEventListener("click", emitGetTiles);
    }
});
function nextClicked (evt) {
    document.getElementById("take-tiles-button").removeEventListener("click", nextClicked);
    let num = evt.currentTarget.num;
    let playerNum = evt.currentTarget.playerNum;
    sock.emit("next-clicked", num, playerNum);
    sock.emit("next-player-get-tiles", playerNum);
}
function emitGetTiles(evt) {
    document.getElementById("take-tiles-button").removeEventListener('click', emitGetTiles);
    document.getElementById("take-tiles-button").style.display = "none";
    //let sum = document.getElementById("take-tiles-button").sum;
    let num = document.getElementById("take-tiles-button").num;
    let playerNum = document.getElementById("take-tiles-button").playerNum;
    sock.emit("get-tiles", num, playerNum, evt.currentTarget.side);
    /*if (sessionStorage.getItem("tileTakeDone") == "true") {
        console.log("tile take done is: " + sessionStorage.getItem("tileTakeDone"));
        promptPlaceTile();
    } else {
        sock.emit("next-player-get-tiles", playerNum);
    }*/
}
sock.on("send-tiles", (newTiles) => {
    let start = hand.length;
    let end = hand.length + newTiles.length;
    let playerHand = document.getElementById("hand0").getElementsByClassName("tile");
    for (let i = start; i < end; i++) {
        hand[i] = newTiles[i - start];
        playerHand[i].innerHTML = hand[i].unicode;
        playerHand[i].addEventListener("click", swap);
    }
    updatePlayerHand();
    if (sessionStorage.getItem("tileTakeDone") == "true") {
        let flowers = checkForFlowers(hand);
        if (flowers.length > 0) {
            console.log("flower");
            flowerDrawn(flowers, thisPlayerNum);
        } else {
            if (sessionStorage.getItem("flower-done") == "true") {
                console.log("prompt place tile");
                promptPlaceTile();
            } else {
                console.log("next flower");
                updatePlayerHand();
                document.getElementById("take-tiles-button").innerHTML = "Next";
                document.getElementById("take-tiles-button").playerNum = thisPlayerNum;
                updateText("You have no more flowers! Click \"Next\" to proceed.");
                document.getElementById("take-tiles-button").addEventListener("click", goNextFlower);
            }
        }
    } else {
        console.log("next tiles");
        sock.emit("next-player-get-tiles", thisPlayerNum);
    }
});
sock.on('update-draw-rows', (num, last, playerNum) => {
    let numToSplice = 0;
    console.log("doubled is: " + doubled);
    for (let i = 0; i < num; i++) {
        if (doubled) {
            doubled = false;
        } else {
            draw[Math.floor(i / 2)].style.opacity = "0%";
            doubled = true;
            numToSplice++;
        }
    }
    draw.splice(0, numToSplice);
    let otherHand = Array.prototype.slice.call(document.getElementById("hand" + playerPos[playerNum]).getElementsByClassName("tile"));
    if (playerPos[playerNum] == 1 || playerPos[playerNum] == 2) {
        otherHand = otherHand.reverse();
    }
    for (let i = 0; i < last; i++) {
        otherHand[i].style.opacity = "100%";
    }
    document.getElementById("pong").style.display = "none";
    document.getElementById("seung").style.display = "none";
    document.getElementById("pong").removeEventListener("click", pong);
    document.getElementById("seung").removeEventListener("click", seung);
});
sock.on('remove-dice', () => {
    document.getElementById("mid").innerHTML ="";
    sessionStorage.setItem("tileTakeDone", "true");
    document.getElementById("take-tiles-button").style.display = "none";
    els = document.getElementById("hand0").getElementsByClassName('tile-vert');
    for (let i = 0; i < hand.length; i++) {
        els[i].addEventListener('click', swap);
    }
});













//Flowers   
sock.on("check-bot-flower", (botHand, playerNum, phase) => {
    if (isPrimaryPlayer) {
        let output = checkForFlowers(botHand);
        sock.emit("bot-flower-checked", output, playerNum, phase);
    }
});
sock.on("bot-no-flowers", (playerNum, name) => {
    document.getElementById("take-tiles-button").innerHTML = "Next";
    document.getElementById("take-tiles-button").style.display = "inline";
    updateText(name + " has no flowers. Press \"Next\" to continue.");
    document.getElementById("take-tiles-button").playerNum = playerNum;
    document.getElementById("take-tiles-button").addEventListener("click", goNextFlower);
});
sock.on("prompt-next", (flower, playerNum, phase) => {
    if (isPrimaryPlayer) {
        document.getElementById("take-tiles-button").innerHTML = "Next";
        document.getElementById("take-tiles-button").style.display = "inline";
        updateText(name + " has flowers. Press \"Next\" to continue.");
        document.getElementById("take-tiles-button").playerNum = playerNum;
        document.getElementById("take-tiles-button").flower = flower;
        document.getElementById("take-tiles-button").phase = phase;
        document.getElementById("take-tiles-button").addEventListener("click", showBotFlowers);
    }
});
function showBotFlowers(evt) {
    document.getElementById("take-tiles-button").removeEventListener("click", showBotFlowers);
    sock.emit("show-bot-flowers", evt.currentTarget.flower, evt.currentTarget.playerNum, evt.currentTarget.phase);
}
function goNextFlower(evt) {
    document.getElementById("take-tiles-button").removeEventListener("click", goNextFlower);
    sock.emit("get-next-flower", evt.currentTarget.playerNum);
}
sock.on("flower", (playerNum) => {
    if (playerPos[playerNum] == 0) {
        let flower = checkForFlowers(hand);
        document.getElementById("take-tiles-button").style.display = "inline";
        if (flower.length > 0) {
            document.getElementById("take-tiles-button").innerHTML = "Replace Flowers";
            document.getElementById("take-tiles-button").playerNum = playerNum;
            document.getElementById("take-tiles-button").flower = flower;
            updateText("You have flowers! Click \"Replace Flowers\" to replace your flowers.");
            document.getElementById("take-tiles-button").addEventListener("click", playerHasFlower);
            //has flower
        } else {
            document.getElementById("take-tiles-button").innerHTML = "Next";
            document.getElementById("take-tiles-button").playerNum = playerNum;
            updateText("You have no flowers! Click \"Next\" to proceed.");
            document.getElementById("take-tiles-button").addEventListener("click", goNextFlower);
        }
    }
});
sock.on('update-draw-row-back', (num, last, playerNum) => {
    let spliceAmount = 0;
    for (let i = (draw.length * 2); i > (draw.length * 2) - num; i--) {
        if (backDoubled) {
            backDoubled = false;
        } else {
            draw[Math.ceil(i / 2) - 1].style.opacity = "0%";
            backDoubled = true;
            spliceAmount++;
        }
    }
    draw.splice(draw.length - 1, spliceAmount);
    let otherHand = Array.prototype.slice.call(document.getElementById("hand" + playerPos[playerNum]).getElementsByClassName("tile"));
    if (playerPos[playerNum] == 1 || playerPos[playerNum] == 2) {
        otherHand = otherHand.reverse();
    }
    for (let i = 0; i < last; i++) {
        otherHand[i].style.opacity = "100%";
    }
    document.getElementById("pong").style.display = "none";
    document.getElementById("seung").style.display = "none";
    document.getElementById("pong").removeEventListener("click", pong);
    document.getElementById("seung").removeEventListener("click", seung);
});
function playerHasFlower(evt) {
    document.getElementById("take-tiles-button").removeEventListener("click", playerHasFlower);
    let flower = evt.currentTarget.flower;
    let output = new Array(flower.length);
    for (let i = 0; i < flower.length; i++) {
        output[i] = hand[flower[i] - i];
        hand.splice(flower[i] - i, 1);
    }
    updatePlayerHand();
    sock.emit("show-flower", output, evt.currentTarget.playerNum);
    for (let i = 0; i < flower.length; i++) {
        sock.emit("get-tiles", 1, evt.currentTarget.playerNum); //Add id or delay
    }
}
function flowerDrawn(flower, playerNum) {
    document.getElementById("take-tiles-button").style.display = "inline";
    document.getElementById("take-tiles-button").innerHTML = "Replace Flowers";
    document.getElementById("take-tiles-button").playerNum = playerNum;
    document.getElementById("take-tiles-button").flower = flower;
    updateText("You have drawn a flower! Click \"Replace Flowers\" to replace your flowers.");
    document.getElementById("take-tiles-button").addEventListener("click", playerHasFlower);
}
function checkForFlowers(array) {
    let flowerIndices = new Array();
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].suit == "Plum" || array[i].suit == "Orchid" || array[i].suit == "Bamboo" || array[i].suit == "Chrysanthemum" || array[i].suit == "Spring" || array[i].suit == "Summer" || array[i].suit == "Autumn" || array[i].suit == "Winter") {
            flowerIndices[counter] = i;
            counter++;
        }
    }
    console.log("flowerIndices is: " + flowerIndices);
    return flowerIndices;
}
function getNextFlower(evt) {
    document.getElementById("take-tiles-button").removeEventListener("click", getNextFlower);
    sock.emit("get-next-flower", evt.currentTarget.playerNum);
}
/*function botCallFlower(evt) {
    document.getElementById("take-tiles-button").removeEventListener("click", botCallFlower);
    let playerNum = evt.currentTarget.playerNum;
    sock.emit("show-flower", evt.currentTarget.flowers, playerNum, bots[playerNum].flowerIndex);
    sock.emit("get-tiles", evt.currentTarget.flowers.length, evt.currentTarget.playerNum);
    sock.emit("get-next-flower", playerNum);
}*/
sock.on("show-flower", (flower, playerNum, flowerIndex, handIndex) => {
    row = Array.prototype.slice.call(document.getElementById("flower" + playerPos[playerNum]).getElementsByClassName("tile"));
    if (playerPos[playerNum] == 1 || playerPos[playerNum] == 2) {
        row = row.reverse();
    }
    for (let i = flowerIndex; i < flowerIndex + flower.length; i++) {
        row[i].innerHTML = flower[i - flowerIndex].unicode;
        row[i].style.padding = "0px";
        row[i].style.opacity = "100%"
        row[i].style.fontSize = h + "px";
        row[i].style.backgroundColor = "transparent";
        row[i].style.border = "0px";
        row[i].style.color = "black";
    }
    let otherHand = document.getElementById("hand" + playerPos[playerNum]).getElementsByClassName("tile");
    for (let i = handIndex - 1; i > (handIndex - 1) - flower.length; i--) {
        otherHand[i].style.opacity = "0%";
    }
});













//Turns
sock.on("bot-turn", (playerNum) => {
    if (isPrimaryPlayer) {
        updateText("Click \"Next\" to see the bot play their tile.");
        document.getElementById("take-tiles-button").innerHTML = "Next";
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").playerNum = playerNum;
        document.getElementById("take-tiles-button").addEventListener("click", botTurn);
    }
});
sock.on("bot-first-turn", (playerNum) => {
    if (isPrimaryPlayer) {
        updateText("Click \"Next\" to see the bot play their tile.");
        document.getElementById("take-tiles-button").innerHTML = "Next";
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").playerNum = playerNum;
        document.getElementById("take-tiles-button").addEventListener("click", botFirstTurn);
    }
});
function botTurn(evt) {
    document.getElementById("take-tiles-button").style.display = "none";
    document.getElementById("take-tiles-button").removeEventListener("click", botTurn);
    sock.emit("bot-turn", evt.currentTarget.playerNum);
}
function botFirstTurn(evt) {
    document.getElementById("take-tiles-button").style.display = "none";
    document.getElementById("take-tiles-button").removeEventListener("click", botFirstTurn);
    sock.emit("bot-first-turn", evt.currentTarget.playerNum);
}
sock.on("first-turn", (playerNum) => {
    document.getElementById("win").style.display = "inline";
    document.getElementById("win").addEventListener("click", checkWin);
    document.getElementById("hand0").addEventListener("drop", playerHandDrop);
    document.getElementById("hand0").addEventListener("dragover", allowDrop);
    let playerHand = document.getElementById("hand0").getElementsByClassName("tile-vert");
    for (let i = 0; i < hand.length; i++) {
        playerHand[i].setAttribute("draggable", true);
    }
    if (playerPos[playerNum] == 0) {
        updateText("It is your turn. Please discard a tile.");
        promptPlaceTile();
    }
});
sock.on('turn', (num) => {
    sessionStorage.setItem("flower-done", "true");
    document.getElementById("win").style.display = "inline";
    document.getElementById("win").addEventListener("click", checkWin);
    document.getElementById("hand0").addEventListener("drop", playerHandDrop);
    document.getElementById("hand0").addEventListener("dragover", allowDrop);
    let playerHand = document.getElementById("hand0").getElementsByClassName("tile-vert");
    for (let i = 0; i < hand.length; i++) {
        playerHand[i].setAttribute("draggable", true);
    }
    /*els = document.getElementById("bot-hand").getElementsByClassName('tile-vert');
    for (let i = 0; i < els.length; i++) {
        els[i].addEventListener('click', swap);
    }*/
    if (playerPos[num] == 0) {
        updateText("It is your turn. Please click \"Pick Up Tile\" to pick up a tile. Then discard a tile.");
        document.getElementById("take-tiles-button").innerHTML = "Pick Up Tile";
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").style.side = 1;
        document.getElementById("take-tiles-button").addEventListener("click", drawTile);
    }
});
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
function drawTile(evt) {
    document.getElementById("take-tiles-button").style.display = "none";
    let botHand = document.getElementById("hand0").getElementsByClassName("tile-vert");
    botHand[hand.length].addEventListener("click", swap);
    document.getElementById("take-tiles-button").removeEventListener("click", drawTile);
    sock.emit("get-tiles", 1, thisPlayerNum, evt.currentTarget.side);
}
function promptPlaceTile() {
    document.getElementById("take-tiles-button").style.display = "none";
    console.log("hand length is: " + hand.length);
    updateText("You have drawn a tile. Please drag and drop a tile in the middle.");
    let playerHand = document.getElementById("hand0").getElementsByClassName("tile-vert");
    playerHand[hand.length - 1].innerHTML = "<span>" + hand[hand.length - 1].unicode + "</span>";
    playerHand[hand.length - 1].style.padding = "0px";
    playerHand[hand.length - 1].style.opacity = "100%"
    playerHand[hand.length - 1].style.fontSize = h + "px";
    playerHand[hand.length - 1].style.backgroundColor = "transparent";
    playerHand[hand.length - 1].style.border = "0px";
    playerHand[hand.length - 1].style.color = "black";
    console.log("hand length is: " + hand.length);
    document.getElementById("mid").addEventListener("drop", dropMid);
    document.getElementById("mid").addEventListener("dragover", allowDrop);
    //ondrop="drop(event)" ondragover="allowDrop(event)"
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropMid(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    document.getElementById("mid").removeEventListener("drop", dropMid);
    document.getElementById("mid").removeEventListener("ondragover", allowDrop);
    /*let botHand = document.getElementById("hand0").getElementsByClassName("tile-vert");
    for (let i = 0; i < botHand.length; i++) {
        botHand[i].draggable = false;
    }*/
    let temp, tempValue, tempSuit;
    if (data.charAt(0) == "h") {
        data = parseInt(data.replace("hand-", "")) - 1;
        temp = hand[data].unicode;
        tempValue = hand[data].value;
        tempSuit = hand[data].suit;
        hand.splice(data, 1);
        updatePlayerHand();
    } else {
        let tileNum = parseInt(data.charAt(data.length - 1));
        let arrayNum = parseInt(data.charAt(data.length - 2));
        temp = finishedArrays[arrayNum][tileNum].unicode;
        tempValue = finishedArrays[arrayNum][tileNum].value;
        tempSuit = finishedArrays[arrayNum][tileNum].suit;
        finishedArrays[arrayNum].splice(tileNum, 1);
        updateFinishedSet(arrayNum);
    }
    prev = "";
    sock.emit("tile-played", temp, tempValue, tempSuit, thisPlayerNum);
    sock.emit("turn-finished", thisPlayerNum);
}
function drop(ev) { //write new
    prev = "";
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let elementId = ev.currentTarget.id;
    let children = ev.currentTarget.childNodes;
    if (elementId == "playerFinished3" && children.length >= 2) {
        alert("That area is full!");
    } else {
        if (children.length >= 3) {
            alert("That area is full!");
        } else {
            if (data.charAt(0) == "h") {
                data = parseInt(data.replace("hand-", "")) - 1;
                let arrayNum = parseInt(elementId.replace("playerFinished", ""));
                finishedArrays[arrayNum].push(hand[data]);
                hand.splice(data, 1);
                updatePlayerHand();
                updateFinishedSet(arrayNum);
            } else {
                let transferArrayNum = parseInt(data.charAt(data.length - 2));
                let numToTransfer = parseInt(data.charAt(data.length - 1));
                let arrayNum = parseInt(elementId.replace("playerFinished", ""));
                console.log("data is: " + data);
                console.log("transferArrayNum is: " + transferArrayNum + " with type of: " + typeof transferArrayNum + " and numToTransfer is: " + numToTransfer + " with a type of: " + typeof numToTransfer);
                finishedArrays[arrayNum].push(finishedArrays[transferArrayNum][numToTransfer]);
                finishedArrays[transferArrayNum].splice(numToTransfer, 1);
                updateFinishedSet(arrayNum);
                updateFinishedSet(transferArrayNum); 
            }
        }
    }
}
function playerHandDrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data.charAt(0) == "h") {
        data = parseInt(data.replace("hand-", "")) - 1;
        let temp = hand[data];
        hand.splice(data, 1);
        hand.push(temp);
        updatePlayerHand();
    } else {
        let tileNum = parseInt(data.charAt(data.length - 1));
        let arrayNum = parseInt(data.charAt(data.length - 2));
        hand.push(finishedArrays[arrayNum][tileNum]);
        finishedArrays[arrayNum].splice(tileNum, 1);
        updatePlayerHand();
        updateFinishedSet(arrayNum);
    }
}
function updateFinishedSet(num) {
    let div = document.getElementById("playerFinished" + num);
    div.innerHTML = "";
    if (finishedArrays[num].length > 1) {
        for (let i = 1; i < finishedArrays[num].length; i++) {
            let key = finishedArrays[num][i];
            let j = i - 1;
            while (j >= 0 && finishedArrays[num][j].value > key.value) {
                finishedArrays[num][j + 1] = finishedArrays[num][j];
                j--;
                console.log("j is: " + j);
            }
            finishedArrays[num][j + 1] = key;
        }
    }
    for (let i = 0; i < finishedArrays[num].length; i++) {
        let el = document.createElement("button");
        el.innerHTML = finishedArrays[num][i].unicode;
        el.id = ("playerFinishedTile" + num + i);
        el.classList.add("tile-vert");
        console.log("element id is: " + el.id); 
        el.style.padding = "0px";
        el.style.opacity = "100%"
        el.style.fontSize = h + "px";
        el.style.backgroundColor = "transparent";
        el.style.border = "0px";
        el.style.color = "black";
        el.setAttribute("draggable", true);
        el.addEventListener("dragstart", function() {drag(event)}, false);
        div.appendChild(el);
    }
}
function updatePlayerHand () {
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].unicode != document.getElementById("hand-" + (i + 1)).innerHTML) {
            document.getElementById("hand-" + (i + 1)).innerHTML = hand[i].unicode;
        }
        document.getElementById("hand-" + (i + 1)).addEventListener("click", swap);
        document.getElementById("hand-" + (i + 1)).style.opacity = "100%";
    }
    for (let i = hand.length + 1; i < 15; i++) {
        document.getElementById("hand-" + i).innerHTML = "";
        document.getElementById("hand-" + i).style.opacity = "0%";
        document.getElementById("hand-" + i).removeEventListener("click", swap);
    }
}
sock.on("place-tile", (tile, value, suit, playerNum, lastIndex) => {
    //if (thisPlayerNum != playerNum) {
    if (playerPos[playerNum] != 0) {
        document.getElementById("pong").style.display = "inline";
        document.getElementById("pong").removeAttribute("disabled");
        document.getElementById("pong").playerNum = playerNum;
        document.getElementById("seung").style.display = "inline";
        document.getElementById("seung").removeAttribute("disabled");
        document.getElementById("seung").playerNum = playerNum;
        document.getElementById("pong").addEventListener("click", pong);
        document.getElementById("seung").addEventListener("click", seung);
    }
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
    el.setAttribute("value", value);
    el.setAttribute("name", suit);
    document.getElementById("mid").appendChild(el);
    let tempHand = Array.prototype.slice.call(document.getElementById("hand" + playerPos[playerNum]).getElementsByClassName("tile"));
    if (playerPos[playerNum] == 1 || playerPos[playerNum] == 2) {
        tempHand = tempHand.reverse();
    }
    console.log("lastIndex is: " + lastIndex);
    tempHand[lastIndex].style.opacity = "0%";
    //}
});
function pong() {
    let child = document.getElementById("mid").lastChild;
    let text = child.innerHTML;
    let indices = new Array();
    let output = new Array();
    let counter = 0;
    for (let i = 0; i < hand.length; i++) {
        if (text == hand[i].unicode) {
            indices[counter] = i;
            output[counter] = hand[i];
            counter++;
        }
    }
    if (counter == 2) {
        for (let i = 0; i < indices.length; i++) {
            hand.splice(indices[i] - i, 1);
        }
        updatePlayerHand();
        sock.emit("game-event", indices, thisPlayerNum);
    } else if (counter == 3) {
        for (let i = 0; i < indices.length; i++) {
            hand.splice(indices[i] - i, 1);
        }
        updatePlayerHand();
        sock.emit("game-event", indices, thisPlayerNum);
    } else {
        alert("You cannot Pong!")
    }
}
function seung(evt) {
    let child = document.getElementById("mid").lastChild;
    let value = parseInt(child.value);
    let suit = child.name;
    let up1 = -1;
    let down1 = -1;
    let up2 = -1;
    let down2 = -1;
    let tiles = [-1, -1];
    let playerNum = evt.currentTarget.playerNum;
    if ((playerNum + 1) % 4 == thisPlayerNum) {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].suit == suit) {
                console.log("hand value is:" + hand[i].value + " and value is: " + value + " and i is: " + i);
                if (hand[i].value == value + 1) {
                    up1 = i;
                } else if (hand[i].value == value + 2) {
                    up2 = i;
                } else if (hand[i].value == value - 1) {
                    down1 = i;
                } else if (hand[i].value == value - 2) {
                    down2 = i;
                }
            }
        }
    }
    console.log("up1 is: " + up1 + " and up2 is: " + up2 + " and down1 is: " + down1 + " and down2 is: " + down2)
    if (up1 > -1 && up2 > -1) {
        tiles[0] = hand[up1];
        tiles[1] = hand[up2];
        hand.splice(up1, 1);
        hand.splice(up2 - 1, 1);
        updatePlayerHand();
        sock.emit("game-event", tiles, thisPlayerNum);
    } else if (down1 > -1 && down2 > -1) {
        tiles[0] = hand[down1];
        tiles[1] = hand[down2];
        hand.splice(down1, 1);
        hand.splice(down2 - 1, 1);
        updatePlayerHand();
        sock.emit("game-event", tiles, thisPlayerNum);
    } else if (up1 > -1 && down1 > -1) {
        tiles[0] = hand[up1];
        tiles[1] = hand[down1];
        hand.splice(up1, 1);
        hand.splice(down1 - 1, 1);
        updatePlayerHand();
        sock.emit("game-event", tiles, thisPlayerNum);
    } else {
        alert("You cannot Seung!");
    }
}
sock.on("game-event", (tiles, playerNum, lastFin, handIndex) => {
    console.log("game-event called");
    document.getElementById("take-tiles-button").style.display = "none";
    document.getElementById("take-tiles-button").removeEventListener("click", drawTile);
    document.getElementById("pong").style.display = "none";
    document.getElementById("seung").style.display = "none";
    let output = new Array();
    let el = document.getElementById("mid").lastChild;
    let tempHand = Array.prototype.slice.call(document.getElementById("hand" + playerPos[playerNum]).getElementsByClassName("tile"));
    if (playerPos[playerNum] == 1 || playerPos[playerNum] == 2) {
        tempHand = tempHand.reverse();
    }
    let row = document.getElementById("fin" + playerPos[playerNum]).getElementsByClassName("tile");
    console.log("handIndex is: " + handIndex);
    for (let i = handIndex - 1; i > handIndex - 1 - tiles.length; i--) {
        tempHand[i].style.opacity = "0%";
    }
    if (tiles[0].value > tiles[1].value) {
        if (el.value > tiles[0].value) {
            //el, 0, 1
            output[0] = tiles[1];
            output[1] = tiles[0];
            output[2] = el;
        } else if (el.value < tiles[1].value) {
            //0, 1, el
            output[0] = el;
            output[1] = tiles[1];
            output[2] = tiles[0];
        } else {
            //0, el, 1
            output[0] = tiles[1];
            output[1] = el;
            output[2] = tiles[0];
        }
    } else if (tiles[0].value < tiles[1].value) {
        if (el.value > tiles[1].value) {
            //el, 1, 0
            output[0] = tiles[0];
            output[1] = tiles[1];
            output[2] = el;
        } else if (el.value < tiles[0].value) {
            //1, 0 , el
            output[0] = el;
            output[1] = tiles[0];
            output[2] = tiles[1];
        } else {
            //1, el, 0
            output[0] = tiles[0];
            output[1] = el;
            output[2] = tiles[1];
        }
    } else {
        for (let i = 0; i < tiles.length + 1; i++) {
            output[i] = el;
        }
    }
    for (let i = lastFin; i < lastFin + output.length; i++) {
        if (output[i - lastFin] == el) {
            row[i].innerHTML = el.innerHTML;
            row[i].style.padding = "0px";
            row[i].style.opacity = "100%"
            row[i].style.fontSize = h + "px";
            row[i].style.backgroundColor = "transparent";
            row[i].style.border = "0px";
            row[i].style.color = "black";
        } else {
            row[i].innerHTML = output[i - lastFin].unicode;
            row[i].style.padding = "0px";
            row[i].style.opacity = "100%"
            row[i].style.fontSize = h + "px";
            row[i].style.backgroundColor = "transparent";
            row[i].style.border = "0px";
            row[i].style.color = "black";
        }
    }
    document.getElementById("mid").removeChild(el);
});
sock.on("draw-from-back", (playerNum) => {
    if (playerPos[playerNum] == 0) {
        updateText("You have called Gong! Please click \"Draw Tile\" to pick up a tile!");
        document.getElementById("take-tiles-button").innerHTML = "Draw Tile";
        document.getElementById("take-tiles-button").style.display = "inline";
        document.getElementById("take-tiles-button").side = 2;
        document.getElementById("take-tiles-button").addEventListener("click", drawTile);
    }
});
function checkWin() {
    let validHand = false;
    let seungNum = 0;
    let pongNum = 0;
    for (let i = 0; i < finishedArrays.length - 1; i++) {
        validHand = false;
        if (finishedArrays[i][0].value == finishedArrays[i][1].value + 1 && finishedArrays[i][0].value == finishedArrays[i][2].value + 2 && finishedArrays[i][0].suit == finishedArrays[i][1].suit && finishedArrays[i][0].suit == finishedArrays[i][2].suit) {
            validHand = true;
            seungNum++;
        }
        if (!validHand && finishedArrays[i][0].value == finishedArrays[i][1].value && finishedArrays[i][0].value == finishedArrays[i][2].value && finishedArrays[i][0].suit == finishedArrays[i][1].suit && finishedArrays[i][0].suit == finishedArrays[i][2].suit) {
            validHand = true;
            pongNum++;
        }
        if (!validHand) {
            break;
        }
    }
    if (validHand && finishedArrays[finishedArrays.length - 1][0].value == finishedArrays[finishedArrays.length - 1][1].value && finishedArrays[finishedArrays.length - 1][0].suit == finishedArrays[finishedArrays.length - 1][1].suit) {
        validHand = true;
    } else {
        validHand = false;
    }
    //check point system with homies
}
/*
function checkFinished() {
    let tempHand = [...hand];
    let numArray = new Array(1);
    let circArray = new Array(1);
    let stickArray = new Array(1);
    let otherArray = new Array(1);
    let temp;
    for (let i = 0; i < tempHand.length; i++) {
        if (tempHand[i].suit == "Number") {
            temp = tempHand;
            numArray[numArray.length - 1] = temp; 
        } else if (tempHand[i].suit == "Sticks") {
            temp = tempHand;
            stickArray[stickArray.length - 1] = temp; 
        } else if (tempHand[i].suit == "Circles") {
            temp = tempHand;
            circArray[circArray.length - 1] = temp; 
        } else {
            temp = tempHand;
            otherArray[otherArray.length - 1] = temp; 
        }
    }
    sortByUnicode(numArray);
    sortByUnicode(stickArray);
    sortByUnicode(circArray);
    sortByUnicode(otherArray);
    console.log("numArray is: ");
    for (let i = 0; i < numArray.length; i++) {
        console.log(numArray[i].unicode);
    }
    console.log("circArray is: ");
    for (let i = 0; i < circArray.length; i++) {
        console.log(circArray[i].unicode);
    }
    console.log("stickArray is: ");
    for (let i = 0; i < stickArray.length; i++) {
        console.log(stickArray[i].unicode);
    }
    console.log("otherArray is: ");
    for (let i = 0; i < otherArray.length; i++) {
        console.log(otherArray[i].unicode);
    }

    let numCheck = checkMiniArray(numArray, false);
    if (numCheck) {
        let stickCheck = checkMiniArray(stickArray);
        if (stickCheck) {
            let circCheck = checkMiniArray(circArray);
            if (circCheck) {
                let otherCheck = checkMiniArray(otherArray);
                if (otherCheck) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function checkMiniArray(array, pairFound) {
    let returnArray = new Array(2);
    let isFinished = true;
    let i = 0;
    if (array.length % 3 == 0) {
        //no 2
        removeAll3(arrayWithNo3);
    } else if (array.length % 3 == 2 && !pairFound) {
        let arrayWithNo3 = [...array];
        let threes = removeAll3(arrayWithNo3);
        removeAllStraights(arrayWithNo3);
    } else {
        isFinished = false;
    }
    returnArray[0] = isFinished;
    returnArray[1] = pairFound;
    return returnArray;
}
function sortByUnicode(array) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
    }
}
function removeAll3(array) {
    let removed = new Array(1);
    for (let i = 0; i < array.length - 2; i++) {
        if (array[i].unicode == array[i + 1].unicode && array[i].unicode == array[i + 2].unicode) {
            removed[removed.length - 1] = array[i];
            removed[removed.length - 1] = array[i + 1];
            removed[removed.length - 1] = array[i + 2];
            array.splice(i, 3);
            i--;
        }
    }
    return removed;
}
function removeAllStraights(array) {

}
*/