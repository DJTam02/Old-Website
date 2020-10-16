var clicked = false;
var radius = 50;
var circles = new Array();
var connect = -1;
var hovered = false;
class LinkedList {
    edges;
    constructor() {
        this.edges = new Array(0);
    }
    add(num, index) {   
        var temp = [num, index];
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
}
$("#original").on('mousedown', function(e) {
    clicked = true;
    newNode();
});
function newNode() {
    $("body").append('<svg class="box" height="100" width="100" style="top: 0; left: 0;"><circle class="circ" cx="' + radius + '" cy="' + radius + '" r="' + radius + '" fill="red" /></svg>');
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
            if (connect == $(this).index('.circ')) {
                connect = -1;
            } else if (connect >= 0) {
                drawLine($(this).index('.circ'));
                connect = -1;
            } else {
                connect = $(this).index('.circ');
                //Change node colour
            }
        }
    }).on('mouseup', function(e) {
        if (circles[$(this).index('.circ')][1]) {
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
    if ((numTop < connectTop && numLeft >= connectLeft) || (numTop >= connectTop && numLeft < connectLeft)) {
        $("body").append('<svg class="lineBox" height="' + h + '" width="' + w + '" style="top: ' + y +'px; left: ' + x +'px;"><line class="line" x2="0" y1="0" x1="' + w + '" y2="' + h + '" style="stroke:rgb(255,0,0);stroke-width:2" /></svg>');
    } else {
        $("body").append('<svg class="lineBox" height="' + h + '" width="' + w + '" style="top: ' + y +'px; left: ' + x +'px;"><line class="line" x1="0" y1="0" x2="' + w + '" y2="' + h + '" style="stroke:rgb(255,0,0);stroke-width:2" /></svg>');
    }
    circles[num][2].add(connect, $(".lineBox:last").index(".lineBox"));
    circles[connect][2].add(num, $(".lineBox:last").index(".lineBox"));  
}
function showDelete() {
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