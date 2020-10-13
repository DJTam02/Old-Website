var clicked = false;
var w = 50;
var circles = new Array();
var colours = ["blue", "yellow", "green", "purple"];

$("#original").on('mousedown', function(e) {
    clicked = true;
    newNode();
});
function newNode() {
    $("body").append('<svg class="box" height="100" width="100" style="position: absolute; top: 0; left: 0;"><circle class="circ" cx="50" cy="50" r="50" fill="red" /></svg>');
    var temp = new Array(3);
    temp[0] = $(".box:last");
    temp[1] = $(".circ:last");
    temp[2] = true;
    circles[$(".circ:last").index('.circ')] = temp;
    circles[$(".circ:last").index('.circ')][1].attr("fill", colours[$(".circ:last").index('.circ')]);
    circles[$(".circ:last").index('.circ')][1].mousemove(function(e) {
        if (circles[$(this).index('.circ')][2]) {
            $(this).parent().css("top", (e.pageY - w) + "px");
            $(this).parent().css("left", (e.pageX - w) + "px");
        }
    });
    circles[$(".circ:last").index('.circ')][1].on('mousedown', function(e) {
        circles[$(this).index('.circ')][2] = true
    }).on('mouseup', function(e) {
        if (circles[$(this).index('.circ')][2]) {
            circles[$(this).index('.circ')][2] = false
            $(this).parent().css("top", (e.pageY - w) + "px");
            $(this).parent().css("left", (e.pageX - w) + "px");
        }
    });
}