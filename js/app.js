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
    }
    else {
        diff = false;
    }

});

power.addEventListener("click", (event) => {
    console.log("checked") // check if it is listening =)
    if (power.checked == true) {
        on = true;
        counter.innerHTML = "-";
    }
    else {
        on = false;
        counter.innerHTML = "-";
        clearColor();
        clearInterval(intervalId);
    }
});

startGame.addEventListener("click", (event) => {
    if (on || win) {
        play();
    }
});

function play() {
    win = false;
    order = [];
    player = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    counter.innerHTML = 1;
    correct = true;

    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    console.log(order); // for loop array for the game
    cpu = true;

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == turn) {
        clearInterval(intervalId);
        cpu = false;
        clearColor();
        on = true;
    }
    if (cpu) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById("audio1");
        audio.play();
    }
    noise = true;
    topL.style.backgroundColor = "green";
}

function two() {
    if (noise) {
        let audio = document.getElementById("audio2");
        audio.play();
    }
    noise = true;
    topR.style.backgroundColor = "red";
}

function three() {
    if (noise) {
        let audio = document.getElementById("audio3");
        audio.play();
    }
    noise = true;
    bottomR.style.backgroundColor = "blue";
}

function four() {
    if (noise) {
        let audio = document.getElementById("audio4");
        audio.play();
    }
    noise = true;
    bottomL.style.backgroundColor = "yellow";
}

topL.addEventListener("click", (event) => {
    if (on) {
        player.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

topR.addEventListener("click", (event) => {
    if (on) {
        player.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomR.addEventListener("click", (event) => {
    if (on) {
        player.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomL.addEventListener("click", (event) => {
    if (on) {
        player.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

function check() {
    if(player[player.length - 1] !== order[player.length - 1]) 
        correct = false;
        
    if(player.length == 20 && correct) {
        winGame();
    }
    
    if (correct == false) {
        flashColor();
        turn.innerHTML = "NO!"
        setTimeout(() => {
            turn.innerHTML = turn;
            clearColor();
            
            if (diff) {
                play();
            }else {
                cpu = true;
                flash = 0;
                player = [];
                correct = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        
        noise = false;
    }
    
    if ( turn == player.length && correct && !win) {
        turn++;
        player= [];
        cpu = true;
        flash = 0;
        counter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800)
    }
}

function clearColor() {
    topL.style.backgroundColor = "darkgreen"
    topR.style.backgroundColor = "darkred";
    bottomR.style.backgroundColor = "darkblue";
    bottomL.style.backgroundColor = "goldenrod";
}

function flashColor() {
    topL.style.backgroundColor = "green"
    topR.style.backgroundColor = "red";
    bottomR.style.backgroundColor = "blue";
    bottomL.style.backgroundColor = "yellow";
}

function winGame() {
    flashColor();
    counter.innerHTML = "Winner!";
    on = false;
    win = true;
}