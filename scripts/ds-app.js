var clicked = false;
var radius = 50;
var circles = new Array();
var colours = ["blue", "yellow", "green", "purple"];
var connect = -1;
class LinkedList {
    edges;
    length;
    constructor() {
        this.edges = new Array(0);
        this.length = 0;
    }
    add(num, index) {
        var temp = [num, index];
        this.edges[this.edges.length] = temp;
        this.length++;
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
    circles[temp[0].index('.circ')][0].attr("fill", colours[$(".circ:last").index('.circ')]);
    circles[temp[0].index('.circ')][0].mousemove(function(e) {
        if (circles[$(this).index('.circ')][1]) {
            for (let i = 0; i < circles[$(this).index('.circ')][2].length; i++) {
                // Implement method of deciding which end of the line
                $(".line").eq(circles[$(this).index('.circ')][2].edges[i][1]).parent().css("top", (e.pageY) + "px");
                $(".line").eq(circles[$(this).index('.circ')][2].edges[i][1]).parent().css("left", (e.pageX) + "px");
            }
            $(this).parent().css("top", (e.pageY - radius) + "px");
            $(this).parent().css("left", (e.pageX - radius) + "px");
        }
    });
    circles[temp[0].index('.circ')][0].on('mousedown', function(e) {
        if (e.button == 0) {
            circles[$(this).index('.circ')][1] = true;
        } else if (e.button == 1) {
            if (connect >= 0) {
                drawLine($(this).index('.circ'));
                connect = -1;
            } else {
                connect = $(this).index('.circ');
                //Change node colour
            }
        }
    }).on('mouseup', function(e) {
        if (circles[$(this).index('.circ')][1]) {
            circles[$(this).index('.circ')][1] = false;
            $(this).parent().css("top", (e.pageY - radius) + "px");
            $(this).parent().css("left", (e.pageX - radius) + "px");
        }
    });
}
function drawLine(num) { 
    var parentTop = parseFloat($(".circ").eq(num).parent().css("top"));
    var parentLeft = parseFloat($(".circ").eq(num).parent().css("left"));
    var parentTop2 = parseFloat($(".circ").eq(connect).parent().css("top"));
    var parentLeft2 = parseFloat($(".circ").eq(connect).parent().css("left"));
    var x = Math.min(parentLeft, parentLeft2) + radius; 
    var y = Math.min(parentTop, parentTop2) + radius;
    var w = Math.abs(parentLeft - parentLeft2);
    var h = Math.abs(parentTop - parentTop2);
    console.log(w);
    $("body").append('<svg class="lineBox" height="' + h + '" width="' + w + '" style="top: ' + y +'px; left: ' + x +'px;"><line class="line" x1="0" y1="0" x2="' + w + '" y2="' + h + '" style="stroke:rgb(255,0,0);stroke-width:2" /></svg>');
    circles[num][2].add(connect, $(".lineBox:last").index(".lineBox"));
    circles[connect][2].add(num, $(".lineBox:last").index(".lineBox"));  
}