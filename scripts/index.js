function resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var h = 52;
    var x, w;
    if (height < width) {
        for (var i = 12; i >= 0; i--) {
            if (height >= i * 86) {
                break;
            } else {
                h -= 4;
            }
        }
        w = (h * 3) / 4;
        x = (height - (18 * w) - (4 * h)) / 2;
    } else {
        for (var i = 12; i >= 0; i--) {
            if (width >= i * 86) {
                break;
            } else {
                h -= 4;
            }
        }
        w = (h * 3) / 4;
        x = (width - (18 * w) - (4 * h)) / 2;
    }
    var y = (width - (18 * w) - (4 * h)) / 2;
    var horiz = document.getElementsByClassName("tile-horiz");
    var vert = document.getElementsByClassName("tile-vert");
    for (var i = 0; i < horiz.length; i++) {
        horiz[i].style.width = h + "px";
        horiz[i].style.height = w + "px";
    }
    for (var i = 0; i < vert.length; i++) {
        vert[i].style.width = w + "px";
        vert[i].style.height = h + "px";
    }
    /*
    document.getElementById("vert-flower").style.width = h + "px";
    document.getElementById("vert-flower").style.height = (w * 8) + "px";
    document.getElementById("vert-flower-1").style.width = h + "px";
    document.getElementById("vert-flower-1").style.height = (w * 8) + "px";
    document.getElementById("vert-finish").style.width = h + "px";
    document.getElementById("vert-finish").style.height = (w * 14) + "px";
    document.getElementById("vert-finish-1").style.width = h + "px";
    document.getElementById("vert-finish-1").style.height = (w * 14) + "px";
    document.getElementById("compass").style.width = (3 * h) + "px";
    document.getElementById("compass").style.height = (3 * h) + "px";
    document.getElementById("compass").style.marginLeft = (x + h) + "px";
    document.getElementById("horiz-hand").style.marginTop = (h * 2) + "px";
    document.getElementById("horiz-hand").style.height = h + "px";
    document.getElementById("horiz-hand-1").style.marginTop = x + "px";
    document.getElementById("horiz-hand-1").style.height = h + "px";
    document.getElementById("horiz-draw").style.marginTop = x + "px";
    document.getElementById("horiz-draw").style.height = h + "px";
    document.getElementById("horiz-draw-1").style.height = h + "px";
    document.getElementById("horiz-fin").style.height = h + "px";
    document.getElementById("horiz-fin").style.width = (w * 14) + "px";
    document.getElementById("horiz-flower").style.height = h + "px";
    document.getElementById("horiz-flower").style.width = (w * 8) + "px";
    document.getElementById("horiz-fin-1").style.height = h + "px";
    document.getElementById("horiz-fin-1").style.width = (w * 14) + "px";
    document.getElementById("horiz-flower-1").style.height = h + "px";
    document.getElementById("horiz-flower-1").style.width = (w * 8) + "px";
    document.getElementById("round-wind").style.marginTop = x + "px";
    document.getElementById("round-wind").style.width = (y - (h * 2)) + "px";
    document.getElementById("round-wind").style.height = ((2 * h) + x + w) + "px";
    document.getElementById("vert-hand").style.width = h + "px";
    document.getElementById("vert-hand").style.marginTop = -(w * 7) + "px";
    document.getElementById("vert-hand-1").style.width = h + "px";
    document.getElementById("vert-hand-1").style.marginTop = -(w * 7) + "px";
    document.getElementById("vert-hand-1").style.marginLeft = (x + h) + "px";
    document.getElementById("vert-draw").style.marginLeft = (h + x) + "px";
    document.getElementById("vert-draw").style.width = h + "px";
    document.getElementById("vert-draw").style.height = (w * 18) + "px";
    document.getElementById("vert-draw-1").style.width = h + "px";
    document.getElementById("vert-draw-1").style.height = (w * 18) + "px";
    document.getElementById("vert-hand-and-draw").style.marginTop = -((8 * w) - (4 * h) - x) + "px";
    document.getElementById("vert-hand-and-draw").style.width = ((h * 2) + x) + "px";
    document.getElementById("vert-hand-and-draw").style.height = (w * 18) + "px";
    document.getElementById("vert-hand-and-draw-1").style.marginTop = -((8 * w) - (4 * h) - x) + "px";
    document.getElementById("vert-hand-and-draw-1").style.marginLeft = (y - x - (w / 4)) + "px";
    document.getElementById("vert-hand-and-draw-1").style.width = ((h * 2) + x) + "px";
    document.getElementById("vert-hand-and-draw-1").style.height = (w * 18) + "px";
    if (width < height) {
        document.getElementById("vert-hand-and-draw-1").style.marginLeft = "222px";
        document.getElementById("vert-hand-and-draw").style.marginRight = "222px";
    }
    document.getElementById("horiz-hand-and-draw").style.marginLeft = -(w * 9) + "px";
    document.getElementById("horiz-hand-and-draw").style.height = ((h * 4) + x) + "px";
    document.getElementById("horiz-hand-and-draw").style.width = (w * 18) + "px";
    document.getElementById("horiz-fin-and-flower").style.width = (22 * w) + "px";
    document.getElementById("horiz-draw-and-hand").style.marginLeft = -(w * 9) + "px";
    document.getElementById("horiz-draw-and-hand").style.marginTop = ((8 * w) - (4 * h) - x) + "px";
    document.getElementById("horiz-draw-and-hand").style.height = ((h * 2) + x) + "px";
    document.getElementById("mid").style.width = (w * 18) + "px";
    document.getElementById("mid").style.height = (w * 18) + "px";
    document.getElementById("mid").style.paddingTop = (((w * 18) - (8 * h)) / 2) + "px";
    document.getElementById("mid").style.paddingBottom = (((w * 18) - (8 * h)) / 2) + "px";
    document.getElementById("mid").style.paddingLeft = ((6 * w) / 2) + "px";
    document.getElementById("mid").style.paddingRight = ((6 * w) / 2) + "px";
    document.getElementById("next-button").style.height = h + "px";
    document.getElementById("next-button").style.width = ((2 * h) + x) + "px";
    document.getElementById("next-button").style.marginTop = ((2 * h) + x) + "px";
    document.getElementById("next-button").style.marginLeft = (y + h + x + (18 * w)) + "px";
    document.getElementById("score").style.width = y + "px";
    document.getElementById("score").style.paddingBottom = (h / 2) + "px";
    
    var scoreText = document.getElementsByClassName("score-text");
    for (var i = 0; i < scoreText.length; i++) {
        scoreText[i].style.fontSize = w + "px";
    }
    document.getElementById("first-row").style.height = (w * 8) + "px";
    document.getElementById("second-row").style.height = ((w * 18) - (2 * ((8 * w) - (4 * h) - x))) + "px";
    document.getElementById("third-row").style.height = (w * 8) + "px";
    */

    
}