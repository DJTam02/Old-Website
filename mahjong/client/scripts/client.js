const writeEvent = (text) => {
    const parent = document.querySelector("#header");
    const el = document.createElement("h1");
    el.innerHTML = text;
    parent.appendChild(el);
}

writeEvent("Welcome to my Mahjong game!");

const sock = io();
sock.on('message', writeEvent);