
function resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    h = 52;
    if (height < width - 400) {
        for (var i = 12; i >= 0; i--) {
            if (height >= i * 86) {
                break;
            } else {
                h -= 4;
            }
        }
        w = (h * 3) / 4;
        x = (height - (18 * w) - (4 * h)) / 2;
        y = (width - (18 * w) - (4 * h)) / 2;
        document.getElementById("full").style.width = (width - (h / 2)) + "px";
        document.getElementById("full").style.height = ((18 * w) + (8 * h) + (2 * x)) + "px";
    } else {
        for (var i = 12; i >= 0; i--) {
            if (width >= i * 86) {
                break;
            } else {
                h -= 4;
            }
        }
        w = (h * 3) / 4;
        x = ((width - (18 * w) - (4 * h)) / 2) - (h / 4);
        y = 228;
        document.getElementById("square").style.marginLeft = y + "px";
        document.getElementById("square").style.marginRight = y + "px";

        document.getElementById("full").style.width = ((18 * w) + (4 * h) + (2 * x) + (2 * y)) + "px";
        document.getElementById("full").style.height = ((18 * w) + (8 * h) + (2 * x)) + "px";
    }
    horiz = document.getElementsByClassName("tile-horiz");
        vert = document.getElementsByClassName("tile-vert");
        for (var i = 0; i < horiz.length; i++) {
            horiz[i].style.width = h + "px";
            horiz[i].style.height = w + "px";
        }
        for (var i = 0; i < vert.length; i++) {
            vert[i].style.width = w + "px";
            vert[i].style.height = h + "px";
            vert[i].style.fontSize = h + "px";
        }
        //Text
        text = document.getElementsByClassName("text");
        for (var i = 0; i < text.length; i++) {
            text[i].style.fontSize = (w / 1.5) + "px";
        }
    //Top left
    document.getElementById("top-left").style.width = ((5 * h) + (2 * x)) + "px";
    document.getElementById("top-left").style.height = (22 * w) + "px";

    document.getElementById("left-flower-and-fin").style.width = h + "px";
    document.getElementById("left-flower-and-fin").style.height = (22 * w) + "px";

    document.getElementById("left-flower").style.width = h + "px";
    document.getElementById("left-fin").style.width = h + "px";

    document.getElementById("compass").style.marginLeft = x + "px";
    if ((4 * h) + x < y - h) {
        document.getElementById("top-left").style.width = ((5 * h) + (2 * x)) + "px";
        document.getElementById("compass").style.width = ((4 * h) + x) + "px";
        document.getElementById("compass").style.height = ((4 * h) + x) + "px";

        document.getElementById("bot-right").style.width = ((3 * h) + (3 * x)) + "px";
        document.getElementById("info").style.width = (y - (3 * x)) + "px";
        document.getElementById("info").style.height = ((4 * h)) + "px";
    } else {
        document.getElementById("top-left").style.width = (y + x) + "px";
        document.getElementById("compass").style.width = (y - h) + "px";
        document.getElementById("compass").style.height = (y - h) + "px";

        document.getElementById("bot-right").style.width = (y + x - h) + "px";
        document.getElementById("info").style.width = (y - (2 * h)) + "px";
        document.getElementById("info").style.height = (y - h) + "px";
    }
    //Top right
    document.getElementById("top-right").style.width = (22 * w) + "px";
    document.getElementById("top-right").style.height = ((4 * h) + x) + "px";

    document.getElementById("top-flower-and-fin").style.width = (22 * w) + "px";
    document.getElementById("top-flower-and-fin").style.height = h + "px";

    document.getElementById("top-fin").style.height = h + "px";
    document.getElementById("top-flower").style.height = h + "px";

    document.getElementById("round-wind").style.paddingTop = h + "px";
    document.getElementById("round-wind").style.width = (y - x) + "px";
    document.getElementById("round-wind").style.height = ((2 * h) + x) + "px";


    //Bot left
    document.getElementById("bot-left").style.width = (y - h) + "px";
    document.getElementById("bot-left").style.height = ((4 * h) + x) + "px";

    document.getElementById("score").style.marginBottom = h + "px";
    document.getElementById("score").style.width = (y - h) + "px";
    document.getElementById("score").style.height = ((h * 2) + x) + "px";

    document.getElementById("bot-flower-and-fin").style.width = (22 * w) + "px";
    document.getElementById("bot-flower-and-fin").style.height = h + "px";

    document.getElementById("bot-flower").style.height = h + "px";
    document.getElementById("bot-fin").style.height = h + "px";


    //Bot right
    document.getElementById("bot-right").style.height = (22 * w) + "px";
    
    document.getElementById("info").style.margin = "auto";
    document.getElementById("info").style.right = h + "px";

    document.getElementById("right-flower-and-fin").style.width = h + "px";
    document.getElementById("right-flower-and-fin").style.height = (22 * w) + "px";

    document.getElementById("right-fin").style.width = h + "px";
    document.getElementById("right-flower").style.width = h + "px";


    //Square
    document.getElementById("square").style.margin = "auto";
    document.getElementById("square").style.marginBottom = (2 * h) + "px";
    document.getElementById("square").style.marginTop = (2 * h) + "px";
    document.getElementById("square").style.width = ((18 * w) + (4 * h) + (2 * x)) + "px";
    document.getElementById("square").style.height = ((18 * w) + (4 * h) + (2 * x)) + "px";


    //Hands
    document.getElementById("top-hand").style.marginLeft = -(7 * w) + "px";
    document.getElementById("top-hand").style.width = (14 * w) + "px";
    document.getElementById("top-hand").style.height = h + "px";


    document.getElementById("left-hand").style.marginTop = -(7 * w) + "px";
    document.getElementById("left-hand").style.width = h + "px";
    document.getElementById("left-hand").style.height = (14 * w) + "px";


    document.getElementById("right-hand").style.marginTop = -(7 * w) + "px";
    document.getElementById("right-hand").style.width = h + "px";
    document.getElementById("right-hand").style.height = (14 * w) + "px";


    document.getElementById("bot-hand").style.marginLeft = -(7 * w) + "px";
    document.getElementById("bot-hand").style.width = ((16 * w) + (2 * h) + x) + "px";
    document.getElementById("bot-hand").style.height = h + "px";


    //Draws
    document.getElementById("draw").style.width = ((18 * w) + (2 * h)) + "px";
    document.getElementById("draw").style.height = ((18 * w) + (2 * h)) + "px";
    document.getElementById("draw").style.top = (x + h) + "px";
    document.getElementById("draw").style.margin = "auto";


    document.getElementById("top-draw").style.marginLeft = (-9 * w) + "px";
    document.getElementById("top-draw").style.width = (18 * w) + "px";
    document.getElementById("top-draw").style.height = h + "px";

    document.getElementById("left-draw").style.marginTop = -(9 * w) + "px";
    document.getElementById("left-draw").style.height = (18 * w) + "px";
    document.getElementById("left-draw").style.width = h + "px";

    document.getElementById("right-draw").style.marginTop = -(9 * w) + "px";
    document.getElementById("right-draw").style.height = (18 * w) + "px";
    document.getElementById("right-draw").style.width = h + "px";

    document.getElementById("bot-draw").style.marginLeft = -(9 * w) + "px";
    document.getElementById("bot-draw").style.width = (18 * w) + "px";
    document.getElementById("bot-draw").style.height = h + "px";


    document.getElementById("mid").style.width = (18 * w) + "px";
    document.getElementById("mid").style.height = (18 * w) + "px";
    document.getElementById("mid").style.paddingTop = ((((18 * w) - (8 * h)) / 2 + h) / 2) + "px";
    document.getElementById("mid").style.paddingBottom = (((18 * w) - (8 * h)) / 2) + "px";
    document.getElementById("mid").style.paddingLeft = ((6 * w) / 2) + "px";
    document.getElementById("mid").style.paddingLeft = ((6 * w) / 2) + "px";
    document.getElementById("mid").style.margin = "auto";

    if (document.getElementById("button")) {
        document.getElementById("button").style.marginLeft = (2 * w) + "px";
        document.getElementById("button").style.width = ((2 * h) + x) + "px";
        document.getElementById("button").style.height = h + "px";
    }

    var handTiles = document.getElementById("bot-hand").getElementsByClassName("tile-vert");
    for (let i = 0; i < handTiles.length; i++) {
        handTiles[i].style.fontSize = h + "px";
    }

    document.getElementById("p1-score").innerHTML = h;
    document.getElementById("p2-score").innerHTML = w;
    document.getElementById("p3-score").innerHTML = x;
    document.getElementById("p4-score").innerHTML = y;
    if (document.getElementsByClassName("dice")) {
        var dice = document.getElementsByClassName("dice");
        for (var i = 0; i < dice.length; i++) {
            dice[i].style.width = (w * 3) + "px";
            dice[i].style.height = (w * 3) + "px";
        }
    }
}
//var sum;
/*function rollDice () {
    if (document.getElementById("roll-dice")) {
        var dice = [Math.floor(Math.random() * (6 - 1 + 1)) + 1, Math.floor(Math.random() * (6 - 1 + 1)) + 1, Math.floor(Math.random() * (6 - 1 + 1)) + 1]
        sum = dice[0] + dice[1] + dice[2];
        for (var i = 0; i < 3; i++) {
            var elem = document.createElement("img");
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
        document.getElementById("roll-dice").innerHTML = "Take Tiles";
        document.getElementById("roll-dice").id = "take-tiles-button";
        document.getElementById("info").innerHTML = "The dice has been rolled!";
    } else if (document.getElementById("take-tiles-button")) {
        document.getElementById("mid").innerHTML ="";
        var draw = new Array();
        var pos = sum % 4;
        if (pos == 2) {
            draw = Array.prototype.slice.call(document.getElementsByClassName("draw2")).reverse();
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw3")).reverse());
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw4")));
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw1")));
        } else if (pos == 3) {
            draw = draw = Array.prototype.slice.call(document.getElementsByClassName("draw3")).reverse();
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw4")));
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw1")));
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw2")).reverse());
        } else if (pos == 1) {
            draw = Array.prototype.slice.call(document.getElementsByClassName("draw1"));
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw2")).reverse());
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw3")).reverse());
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw4")));
        } else if (pos == 0) {
            draw = Array.prototype.slice.call(document.getElementsByClassName("draw4"));
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw1")));
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw2")).reverse());
            draw = draw.concat(Array.prototype.slice.call(document.getElementsByClassName("draw3")).reverse());
        } 
        for (let i = sum; i < sum + 26; i++) {
            draw[i].style.opacity = "0%";
        }
        var topHand = document.getElementById("top-hand").getElementsByClassName("tile-vert");
        for (let i = 0; i < topHand.length; i++) {
            topHand[i].style.opacity = "100%";
        }
        var leftHand = document.getElementById("left-hand").getElementsByClassName("tile-horiz");
        for (let i = 0; i < leftHand.length; i++) {
            leftHand[i].style.opacity = "100%";
        }
        var rightHand = document.getElementById("right-hand").getElementsByClassName("tile-horiz");
        for (let i = 0; i < rightHand.length; i++) {
            rightHand[i].style.opacity = "100%";
        }
        showPlayerHand();
        document.getElementById("take-tiles-button").innerHTML = "Next";
        document.getElementById("take-tiles-button").id = "next-button";
        document.getElementById("info").innerHTML = "Each player has collected their tiles. Click next to begin playing.";
    } else {

    }
}*/
function invis() {
    var topHand = document.getElementById("top-hand").getElementsByClassName("tile-vert");
    for (let i = 0; i < topHand.length; i++) {
        topHand[i].style.opacity = "0%";
    }
    var leftHand = document.getElementById("left-hand").getElementsByClassName("tile-horiz");
    for (let i = 0; i < leftHand.length; i++) {
        leftHand[i].style.opacity = "0%";
    }
    var rightHand = document.getElementById("right-hand").getElementsByClassName("tile-horiz");
    for (let i = 0; i < rightHand.length; i++) {
        rightHand[i].style.opacity = "0%";
    }
    var botHand = document.getElementById("bot-hand").getElementsByClassName("tile-vert");
    for (let i = 0; i < botHand.length; i++) {
        botHand[i].style.opacity = "0%";
    }
    var rightFin = document.getElementById("right-fin").getElementsByClassName("tile-horiz");
    for (let i = 0; i < rightFin.length; i++) {
        rightFin[i].style.opacity = "0%";
    }
    var leftFin = document.getElementById("left-fin").getElementsByClassName("tile-horiz");
    for (let i = 0; i < leftFin.length; i++) {
        leftFin[i].style.opacity = "0%";
    }
    var topFin = document.getElementById("top-fin").getElementsByClassName("tile-vert");
    for (let i = 0; i < topFin.length; i++) {
        topFin[i].style.opacity = "0%";
    }
    var botFin = document.getElementById("bot-fin").getElementsByClassName("tile-vert");
    for (let i = 0; i < botFin.length; i++) {
        botFin[i].style.opacity = "0%";
    }
    var topFlower = document.getElementById("top-flower").getElementsByClassName("tile-vert");
    for (let i = 0; i < topFlower.length; i++) {
        topFlower[i].style.opacity = "0%";
    }
    var botFlower = document.getElementById("bot-flower").getElementsByClassName("tile-vert");
    for (let i = 0; i < botFlower.length; i++) {
        botFlower[i].style.opacity = "0%";
    }
    var leftFlower = document.getElementById("left-flower").getElementsByClassName("tile-horiz");
    for (let i = 0; i < leftFlower.length; i++) {
        leftFlower[i].style.opacity = "0%";
    }
    var rightFlower = document.getElementById("right-flower").getElementsByClassName("tile-horiz");
    for (let i = 0; i < rightFlower.length; i++) {
        rightFlower[i].style.opacity = "0%";
    }
}
/*function showPlayerHand() {   replaced: check server.js
    let allTiles = findAllTiles();
    let playerHand = new Array(14);
    var handLength = playerHand.length;
    for (let i = 0; i < playerHand.length; i++) {
        let ran = Math.floor(Math.random() * (42));
        if (allTiles[ran].remaining > 0) {
            player.hand[i] = allTiles[ran];
            let hand = document.getElementById("bot-hand").getElementsByClassName("tile-vert");
            hand[i].innerHTML = "<span>" + botPlayer.hand[i].unicode + "</span>";
            hand[i].style.padding = "0px";
            hand[i].style.opacity = "100%"
            hand[i].style.fontSize = h + "px";
            hand[i].style.backgroundColor = "transparent";
            hand[i].style.border = "0px";
            hand[i].style.color = "black";
            allTiles[ran].remaining--;
        } else {
            i--;
        }
    }
}*/
/*function swap(id) {
    if (prev == "" || prev == false) {
        prev = id;
    } else {
        var prevText = document.getElementById(prev).textContent;
        var currText = document.getElementById(id).textContent;
        document.getElementById(prev).innerHTML = currText;
        document.getElementById(id).innerHTML = prevText;
        prev = "";
    }
}*/