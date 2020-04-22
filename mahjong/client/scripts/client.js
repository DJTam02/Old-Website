//Game Setup
const updatePlayerNum = (num) => {
    const text = document.querySelector('#player-num');
    text.innerHTML = num;
}
const connection = (connectNum) => {
    sock.emit('updatePlayerNum', connectNum);
}
const disconnection = (connectNum) => {
    sock.emit('updatePlayerNum', connectNum);
}
const confirm = (info) => {
    if (info[2] == true) {
        document.getElementById(info[0] + "name-filled").innerHTML = info[1] + " (CPU)";
    } else {
        document.getElementById(info[0] + "name-filled").innerHTML = info[1];
    }
    document.getElementById(info[0] + "computer").removeAttribute("checked");
    document.getElementById(info[0] + "name").value = "";
    document.getElementById(info[0]).style.display = "none";
    document.getElementById(info[0] + "Cancel").style.display = "inline";
}
const cancel = (player) => {
    document.getElementById(player).style.display = "inline";
    document.getElementById(player + "Cancel").style.display = "none";
    document.getElementById("p1name").removeAttribute("disabled");
    document.getElementById("p2name").removeAttribute("disabled");
    document.getElementById("p3name").removeAttribute("disabled");
    document.getElementById("p4name").removeAttribute("disabled");
    document.getElementById("p1Confirm").removeAttribute("disabled");
    document.getElementById("p2Confirm").removeAttribute("disabled");
    document.getElementById("p3Confirm").removeAttribute("disabled");
    document.getElementById("p4Confirm").removeAttribute("disabled");
    document.getElementById("p4computer").removeAttribute("disabled");
    document.getElementById("p2computer").removeAttribute("disabled");
    document.getElementById("p3computer").removeAttribute("disabled");
    document.getElementById("p1computer").removeAttribute("disabled");
    document.getElementById(player + "cancel-button").setAttribute("disabled", true);
}
//Game










//Game Setup
const sock = io();
sock.on('connection', connection);
sock.on('updatePlayerNum', updatePlayerNum);

document.getElementById("p1Confirm").addEventListener('click', function(e) {
    if (document.getElementById("p1name").value.trim() == "") { 
        alert("Please enter a valid name!");
    } else {
        let info = new Array(3);
        info[0] = "p1";
        info[1] = document.getElementById("p1name").value;
        info[2] = document.getElementById("p1computer").checked;
        sock.emit('confirm', info);
        document.getElementById("p2name").setAttribute("disabled", true);
        document.getElementById("p3name").setAttribute("disabled", true);
        document.getElementById("p4name").setAttribute("disabled", true);
        document.getElementById("p2Confirm").setAttribute("disabled", true);
        document.getElementById("p3Confirm").setAttribute("disabled", true);
        document.getElementById("p4Confirm").setAttribute("disabled", true);
        document.getElementById("p4computer").setAttribute("disabled", true);
        document.getElementById("p2computer").setAttribute("disabled", true);
        document.getElementById("p3computer").setAttribute("disabled", true);
        document.getElementById("p1cancel-button").removeAttribute("disabled");
    }
    e.preventDefault();
});
document.getElementById("p2Confirm").addEventListener('click', function(e) {
    if (document.getElementById("p2name").value.trim() == "") { 
        alert("Please enter a valid name!");
    } else {
        let info = new Array(3);
        info[0] = "p2";
        info[1] = document.getElementById("p2name").value;
        info[2] = document.getElementById("p2computer").checked;
        sock.emit('confirm', info);
        document.getElementById("p1name").setAttribute("disabled", true);
        document.getElementById("p3name").setAttribute("disabled", true);
        document.getElementById("p4name").setAttribute("disabled", true);
        document.getElementById("p1Confirm").setAttribute("disabled", true);
        document.getElementById("p3Confirm").setAttribute("disabled", true);
        document.getElementById("p4Confirm").setAttribute("disabled", true);
        document.getElementById("p1computer").setAttribute("disabled", true);
        document.getElementById("p4computer").setAttribute("disabled", true);
        document.getElementById("p3computer").setAttribute("disabled", true);
        document.getElementById("p2cancel-button").removeAttribute("disabled");
    }
    e.preventDefault();
});
document.getElementById("p3Confirm").addEventListener('click', function(e) {
    if (document.getElementById("p3name").value.trim() == "") { 
        alert("Please enter a valid name!");
    } else {
        let info = new Array(3);
        info[0] = "p3";
        info[1] = document.getElementById("p3name").value;
        info[2] = document.getElementById("p3computer").checked;
        sock.emit('confirm', info);
        document.getElementById("p2name").setAttribute("disabled", true);
        document.getElementById("p1name").setAttribute("disabled", true);
        document.getElementById("p4name").setAttribute("disabled", true);
        document.getElementById("p2Confirm").setAttribute("disabled", true);
        document.getElementById("p1Confirm").setAttribute("disabled", true);
        document.getElementById("p4Confirm").setAttribute("disabled", true);
        document.getElementById("p1computer").setAttribute("disabled", true);
        document.getElementById("p2computer").setAttribute("disabled", true);
        document.getElementById("p4computer").setAttribute("disabled", true);
        document.getElementById("p3cancel-button").removeAttribute("disabled");
    }
    e.preventDefault();
});
document.getElementById("p4Confirm").addEventListener('click', function(e) {
    if (document.getElementById("p4name").value.trim() == "") { 
        alert("Please enter a valid name!");
    } else {
        let info = new Array(3);
        info[0] = "p4";
        info[1] = document.getElementById("p4name").value;
        info[2] = document.getElementById("p4computer").checked;
        sock.emit('confirm', info);
        document.getElementById("p2name").setAttribute("disabled", true);
        document.getElementById("p3name").setAttribute("disabled", true);
        document.getElementById("p1name").setAttribute("disabled", true);
        document.getElementById("p2Confirm").setAttribute("disabled", true);
        document.getElementById("p3Confirm").setAttribute("disabled", true);
        document.getElementById("p1Confirm").setAttribute("disabled", true);
        document.getElementById("p1computer").setAttribute("disabled", true);
        document.getElementById("p2computer").setAttribute("disabled", true);
        document.getElementById("p3computer").setAttribute("disabled", true);
        document.getElementById("p4cancel-button").removeAttribute("disabled");
        
    }
    e.preventDefault();
});
sock.on('confirm', confirm);

function cancelConfirm(player) {
    sock.emit('cancel', player);
    document.getElementById(player + "cancel-button").removeAttribute("disabled");
}
sock.on('cancel', cancel);
function update() {
    sock.emit('getp1Name');
    sock.on('getp1Name', (name) => {
        if (name != "") {
            document.getElementById("p1name-filled").innerHTML = name;
            document.getElementById("p1name").value = "";
            document.getElementById("p1").style.display = "none";
            document.getElementById("p1Cancel").style.display = "inline";
        }
    });
    sock.emit('getp2Name');
    sock.on('getp2Name', (name) => {
        if (name != "") {
                document.getElementById("p2name-filled").innerHTML = name;
                document.getElementById("p2name").value = "";
                document.getElementById("p2").style.display = "none";
                document.getElementById("p2Cancel").style.display = "inline";
        }
    });
    sock.emit('getp3Name');
    sock.on('getp3Name', (name) => {
        if (name != "") {
            document.getElementById("p3name-filled").innerHTML = name;
            document.getElementById("p3name").value = "";
            document.getElementById("p3").style.display = "none";
            document.getElementById("p3Cancel").style.display = "inline";
        }
    });
    sock.emit('getp4Name');
    sock.on('getp4Name', (name) => {
        if (name != "") {
            document.getElementById("p4name-filled").innerHTML = name;
            document.getElementById("p4name").value = "";
            document.getElementById("p4").style.display = "none";
            document.getElementById("p4Cancel").style.display = "inline";
        }
    });
}
function checkPlayers() {
    sock.emit('checkPlayers');
}
sock.on('gameReady', () => {
    window.location.href = '/game.html';
});
sock.on('gameNotReady', () => {
    alert("Please enter all players!");

});












//Game
