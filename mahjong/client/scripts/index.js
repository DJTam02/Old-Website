
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
    document.getElementById("mid").style.paddingTop = (((18 * w) - (8 * h)) / 2 + h) + "px";
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
var sum;
function rollDice () {
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
}
function init() {
    this.resize();
    this.invis();
    let temp = new Array(14);
    botPlayer = new Player(temp, 1, "East", localStorage.getItem("p1Type"));
    botPlayer = new Player(temp, 2, "South", localStorage.getItem("p2Type"));
    botPlayer = new Player(temp, 3, "West", localStorage.getItem("p3Type"));
    botPlayer = new Player(temp, 4, "North", localStorage.getItem("p4Type"));
}
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
function showPlayerHand() {
    let allTiles = findAllTiles();
    let playerHand = new Array(14);
    var handLength = playerHand.length;
    for (let i = 0; i < playerHand.length; i++) {
        let ran = Math.floor(Math.random() * (42));
        if (allTiles[ran].remaining > 0) {
            botPlayer.hand[i] = allTiles[ran];
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
}
class Tile {
    constructor (newSuit, newValue, newRemaining, newUnicode) {
        this.suit = newSuit;
        this.value = newValue,
        this.remaining = newRemaining;
        this.unicode = newUnicode;
    }
}
class Player {
    constructor (newHand, newPos, newWind, newIsHuman) {
        this.hand = newHand;
        this.pos = newPos;
        this.wind = newWind;
        this.isHuman = newIsHuman;
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
function swap(id) {
    if (prev == "" || prev == false) {
        prev = id;
    } else {
        var prevText = document.getElementById(prev).textContent;
        var currText = document.getElementById(id).textContent;
        document.getElementById(prev).innerHTML = currText;
        document.getElementById(id).innerHTML = prevText;
        prev = "";
    }
}