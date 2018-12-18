//track the order of the gaem
let order = [];
//track the player
let player = [];
let flash;
let turn;
let correct;
let cpu;
let intervalId;
let diff = false;
let noise = true;
let on = false;
let win;

const counter = document.querySelector("#turn");
const topL = document.querySelector("#topleft");
const topR = document.querySelector("#topright");
const bottomL = document.querySelector("#bottomleft");
const bottomR = document.querySelector("#bottomright");
const difficultButton = document.querySelector("#diff");
const power = document.querySelector("#on");
const startGame = document.querySelector("#start");

difficultButton.addEventListener("click", (event) => {
    console.log("checked") // check if it is listening =)
    if (difficultButton.checked == true) {
        diff = true;
    } else {
        diff = false;
    }
    
});

power.addEventListener("click", (event) => {
    console.log("checked") // check if it is listening =)
    if (power.checked == true) {
        on = true;
        counter.innerHTML = "-";
    } else {
        on = false;
        counter.innerHTML = "-";
        clearColor();
        clearInterval(intervalId);
    }
});

startGame.addEventListener("click", (event) => {
    if( on || win ) {
        play();
    }
});

