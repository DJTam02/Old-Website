var clicked = false;
var radius = 50;
var circles = new Array();
var connect = -1;
var hovered = false;
var infoPage = 0;
class LinkedList {
    edges;
    constructor() {
        this.edges = new Array(0);
    }
    add(num, index) {   
        var temp = [num, index, 1];
        this.edges[this.edges.length] = temp;
    }       
    remove(index) {
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i][0] == index) {
                this.edges.splice(i, 1);
                break;
            }
        }
    }
    delete() {
        let counter = 0;
        for (let i = 0; i < this.edges.length; i) {
            console.log(this.edges[i]);
            $('.lineBox').eq(this.edges[i][1] - counter).remove();
            this.edges.splice(i, 1);
            counter++;
        }
    }
    connects(num) {
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i][0] == num) {
                return true;
            }
        }
        return false;
    }
    getIndex(num) {
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i][0] == num) {
                return i;
            }
        }
        return -1;
    }
}
$("#original").on('mousedown', function(e) {
    clicked = true;
    newNode();
});
function newNode() {
    $("body").append('<svg class="box" height="100" width="100" style="top: 35px; left: 40px;"><circle class="circ" cx="' + radius + '" cy="' + radius + '" r="' + radius + '" fill="red" /></svg>');
    var temp = new Array(3);
    temp[0] = $(".circ:last");
    temp[1] = true; // Is clicked
    temp[2] = new LinkedList();
    circles[temp[0].index('.circ')] = temp;
    if (temp[0].index('.circ') * 50 < 250) {
        circles[temp[0].index('.circ')][0].attr("fill", "rgb(" + (temp[0].index('.circ') * 50) + ", 0, 0)");
    } else if (temp[0].index('.circ') * 50 < 500) {
        circles[temp[0].index('.circ')][0].attr("fill", "rgb(0, " + ((temp[0].index('.circ') * 50) - 150) + ", 0)");
    } else {
        circles[temp[0].index('.circ')][0].attr("fill", "rgb(0, 0, " + ((temp[0].index('.circ') * 50) - 400) + ")");
    }
    circles[temp[0].index('.circ')][0].mousemove(function(e) {
        var index = $(this).index('.circ');
        if (circles[index][1]) {
            showDelete();
            var thisTop = parseFloat($(this).parent().css("top"));
            var thisLeft = parseFloat($(this).parent().css("left"));
            for (let i = 0; i < circles[index][2].edges.length; i++) {
                let connectedTop = parseFloat($(".circ").eq(circles[index][2].edges[i][0]).parent().css("top"));
                let connectedLeft = parseFloat($(".circ").eq(circles[index][2].edges[i][0]).parent().css("left"));
                if (thisTop < connectedTop && thisLeft < connectedLeft) {
                    $(".line").eq(circles[index][2].edges[i][1]).parent().css("top", (e.pageY) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).parent().css("left", (e.pageX) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("y2", (connectedTop - thisTop) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("x2", (connectedLeft - thisLeft) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("y1", "0px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("x1", "0px");
                } else if (thisTop < connectedTop && thisLeft >= connectedLeft) {
                    $(".line").eq(circles[index][2].edges[i][1]).parent().css("top", (e.pageY) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("y2", (connectedTop - thisTop) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("x1", (thisLeft - connectedLeft) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("y1", "0px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("x2", "0px");
                } else if (thisTop >= connectedTop && thisLeft < connectedLeft) {
                    $(".line").eq(circles[index][2].edges[i][1]).parent().css("left", (e.pageX) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("y2", (thisTop - connectedTop) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("x1", (connectedLeft - thisLeft) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("y1", "0px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("x2", "0px");
                } else {
                    $(".line").eq(circles[index][2].edges[i][1]).parent().css("top", (connectedTop + radius) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).parent().css("left", (connectedLeft + radius) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("y2", (thisTop - connectedTop) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("x2", (thisLeft - connectedLeft) + "px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("y1", "0px");
                    $(".line").eq(circles[index][2].edges[i][1]).attr("x1", "0px");
                }
                $(".line").eq(circles[index][2].edges[i][1]).parent().attr("height", Math.abs(connectedTop - thisTop) + "px");
                $(".line").eq(circles[index][2].edges[i][1]).parent().attr("width", Math.abs(connectedLeft - thisLeft) + "px");
            }
            $(this).parent().css("top", (e.pageY - radius) + "px");
            $(this).parent().css("left", (e.pageX - radius) + "px");
        }
    });
    circles[temp[0].index('.circ')][0].on('mousedown', function(e) {
        if (e.button == 0) {
            console.log("circle number " + temp[0].index('.circ') + ":");
            console.log(circles[temp[0].index('.circ')]);
            console.log("edges: ");
            for (let i = 0; i < circles[temp[0].index('.circ')][2].edges.length; i++) {
                console.log(circles[temp[0].index('.circ')][2].edges[i]);
            }
            circles[$(this).index('.circ')][1] = true;
        } else if (e.button == 1) {
            console.log(connect);
            if (connect == $(this).index('.circ')) {
                connect = -1;
            } else if (circles[$(this).index('.circ')][2].connects(connect)) {
                $('.lineBox').eq(circles[$(this).index('.circ')][2].edges[circles[$(this).index('.circ')][2].getIndex(connect)][1]).remove();
                circles[$(this).index('.circ')][2].remove(connect);
                circles[connect][2].remove($(this).index('.circ'));
            } else if (connect >= 0) {
                drawLine($(this).index('.circ'));
            } else {
                connect = $(this).index('.circ');
                //Change node colour
            }
        }
    }).on('mouseup', function(e) {
        if (circles[$(this).index('.circ')][1]) {
            $("#header").css("display", "block");
            $("#buttons").css("display", "inline-block");
            $("body").css("background-color", "");
            $("body").css("background-image", "");
            $("#border").css("background-color", "white");
            var topOffset = parseFloat($("#graph").offset().top);
            var leftOffset = parseFloat($("#graph").offset().left);
            var graphWidth = parseFloat($("#graph").css("width"));
            var graphHeight = parseFloat($("#graph").css("height"));
            circles[$(this).index('.circ')][1] = false;
            if (e.pageX < leftOffset || e.pageX > (graphWidth + leftOffset) || e.pageY < topOffset || e.pageY > (topOffset + graphHeight)) {
                circles[$(this).index('.circ')][2].delete();
                for (let i = 0; i < circles.length; i++) {
                    circles[i][2].remove($(this).index('.circ'));
                }
                circles.splice($(this).index('.circ'), 1);
                $(this).parent().remove();
            } else {
                $(this).parent().css("top", (e.pageY - radius) + "px");
                $(this).parent().css("left", (e.pageX - radius) + "px");
            }
        }
    });

}
function drawLine(num) { 
    var numTop = parseFloat($(".circ").eq(num).parent().css("top"));
    var numLeft = parseFloat($(".circ").eq(num).parent().css("left"));
    var connectTop = parseFloat($(".circ").eq(connect).parent().css("top"));
    var connectLeft = parseFloat($(".circ").eq(connect).parent().css("left"));
    var x = Math.min(numLeft, connectLeft) + radius; 
    var y = Math.min(numTop, connectTop) + radius;
    var w = Math.abs(numLeft - connectLeft);
    var h = Math.abs(numTop - connectTop);
    var tempConnect = connect;
    if ((numTop < connectTop && numLeft >= connectLeft) || (numTop >= connectTop && numLeft < connectLeft)) {
        $("body").append('<svg class="lineBox" height="' + h + '" width="' + w + '" style="top: ' + y +'px; left: ' + x +'px;"><line class="line" x2="0" y1="0" x1="' + w + '" y2="' + h + '" style="stroke:rgb(255,0,0);stroke-width:2" /></svg>');
    } else {
        $("body").append('<svg class="lineBox" height="' + h + '" width="' + w + '" style="top: ' + y +'px; left: ' + x +'px;"><line class="line" x1="0" y1="0" x2="' + w + '" y2="' + h + '" style="stroke:rgb(255,0,0);stroke-width:2" /></svg>');
    }
    circles[num][2].add(connect, $(".lineBox:last").index(".lineBox"));
    circles[connect][2].add(num, $(".lineBox:last").index(".lineBox"));  
    $(".lineBox:last").focus(addInputBox);
    connect = -1;
}
function showDelete() {
    $("#header").css("display", "none");
    $("#buttons").css("display", "none");
    $("#border").css("background-color", "red");
    $("body").css("background-color", "red");
    $("body").css("background-image", "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,.7) 5px, rgba(255,255,255,.7   ) 60px)");
}
function circleInfo() {
    console.log("CIRCLE INFO");
    for (let i = 0; i < circles.length; i++) {
        console.log("Circle #: " + i);
        console.log(circles[i]);
        console.log("Edges:");
        for (let j = 0; j < circles[i][2].edges.length; j++) {
            console.log(circles[i][2].edges[j]);
        }
    }
}
function showInfo() {
    $("#info-modal").css("display", "block");
}
function changeInfo(dir) {
    var next = 1;
    if (dir == "back") {
        next = -1;
    }
    $("#t" + infoPage).css("display", "none");
    infoPage += next;
    $("#t" + infoPage).css("display", "block");
    if (infoPage == 0 && next == -1) {
        $(".next").eq(0).css("display", "block");
        $(".next").eq(1).css("display", "none");
    } else if (infoPage == 7 && next == 1) {
        $(".next").eq(2).css("display", "block");
        $(".next").eq(1).css("display", "none");
    } else {
        $(".next").eq(2).css("display", "none");
        $(".next").eq(1).css("display", "block");
        $(".next").eq(0).css("display", "none");
    }
    $("#page").html((infoPage + 1) + "/8");
}
function closeInfo() {
    $("#info-modal").css("display", "none");
    infoPage = 0;
    $("#t0").css("display", "block");
    for (let i = 1; i < 8; i++) {
        $("#t" + i).css("display", "none");
    }
    $(".next").eq(2).css("display", "none");
    $(".next").eq(1).css("display", "none");
    $(".next").eq(0).css("display", "block");
}
function addWeight(num, num2) {
    var weight;
    if ($("#tempInput").val() == "") {
        weight = 1;
    } else {
        weight = parseFloat($("#tempInput").val());
    }
    var lineIndex;
    for (let i = 0; i < circles[num][2].edges.length; i++) {
        if (circles[num][2].edges[i][0] == num2) {
            circles[num][2].edges[i][2] = weight;
            lineIndex = circles[num][2].edges[i][1];
        }
    }
    for (let i = 0; i < circles[num2][2].edges.length; i++) {
        if (circles[num2][2].edges[i][0] == num) {
            circles[num2][2].edges[i][2] = weight;
        }
    }
    $("#tempInput").remove();
    $(".lineBox").eq(lineIndex).blur();
    $(".lineBox").eq(lineIndex).focus(addInputBox);
}
function addInputBox () {
    var nodes = new Array(0);
    var index = $(this).index(".lineBox");
    var prevValue;
    for (let i = 0; i < circles.length; i++) {
        for (let j = 0; j < circles[i][2].edges.length; j++) {
            if (circles[i][2].edges[j][1] == index) {
                nodes[nodes.length] = circles[i][2].edges[j][0];
                prevValue = circles[i][2].edges[j][2];
            }
        }
    }
    var xOffset = parseFloat($(this).offset().left);
    var yOffset = parseFloat($(this).offset().top);
    var high = parseFloat($(this).attr("height"));
    var wid = parseFloat($(this).attr("width"));
    $("body").append('<input min="0" type="number" onkeydown="numVerify(event)" onfocusout="addWeight(' + nodes[0] + ', ' + nodes[1] + ')" id="tempInput" style="position: absolute; left: ' + (xOffset + (wid / 2)) + 'px; top: ' + (yOffset + (high / 2)) + 'px; transform: translate(-50%, -50%); border: solid black 2px; z-index: 1; style: width: 50px;" value="' + prevValue + '">');
    $("#tempInput").focus();
    $(this).off("focus");
}
function numVerify (e) {
    var keynum;
    if (window.event) { // IE                    
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                   
      keynum = e.which;
    }
    if (keynum != 8 && keynum != 0 && keynum < 48 || keynum > 57) {
        e.preventDefault();
    }
}