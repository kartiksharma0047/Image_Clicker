let page1 = document.querySelector(".start");
let start = document.querySelector(".start i");
let page2 = document.querySelector(".character");
let imglinks = document.querySelectorAll("#image a");
let page3 = document.querySelector(".screen");
let display = document.querySelector(".main");
let time = document.querySelector("#clock");
let tick = document.querySelector("#tick");
let timer = document.querySelector("#value");
let para = document.querySelector("#scoreValue");
let scoreContainer = document.querySelector("#score");
let popup = document.querySelector(".container");
let board = document.querySelector(".container .popup button");
let display_score = document.querySelector(".border p");
let player_name = document.querySelector(".character input");
let nameWarning = document.getElementById("nameWarning");
let playerNameInput = document.getElementById("playerName");
let add_board = document.querySelector(".board");
let player_store = document.querySelector(".entries");
let playerName = "";
let timerInterval;
let pop_img;
let dots = [];
let scoring = 0;
let isTimerRunning = false;
let add_score = [];

for (let i = 0; i < 15; i++) {
    let dot = document.createElement("span");
    dots.push(dot);
    scoreContainer.appendChild(dot);
}

start.onclick = () => {
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
};


for (let a = 0; a < imglinks.length; a++) {
    imglinks[a].onclick = (e) => {
        e.preventDefault();
        playerName = playerNameInput.value.trim();
        if (playerName !== "") {
            let storedData = JSON.parse(localStorage.getItem('User')) || [];

            const existingPlayer = storedData.find(player => player.name === playerName);

            if (existingPlayer) {
                alert("Player name already exists. Please enter a unique name.");
                return;
            }

            nameWarning.classList.add("hidden");
            page2.classList.add("hidden");
            page3.classList.remove("hidden");
            let link = imglinks[a].firstChild.src;
            displaychar(link);
            timed();
        } else {
            nameWarning.classList.remove("hidden");
        }
    };
}

playerNameInput.addEventListener("input", () => {
    nameWarning.classList.add("hidden");
});

function timed() {
    let x1 = 0;
    value.innerHTML = x1;
    timerInterval = setInterval(() => {
        value.innerHTML = x1;
        x1++;
        if (x1 <= 60) {
            displayClockAnimation(x1);
        } else {
            clearInterval(timerInterval);
            clearInterval(pop_img);
            clearClockAnimation();
            LeaderBorad();
        }
    }, 1000);
}

function displayClockAnimation(x1) {
    isTimerRunning = true;
    value.innerHTML = x1;
    if (isTimerRunning) {
        time.classList.add("clock-animation");
    }
}

function clearClockAnimation() {
    isTimerRunning = false;
    setTimeout(() => {
        time.classList.remove("clock-animation");
        hideClockBefore();
        hideAllImages();
    }, 500);
}

function hideAllImages() {
    let images = display.querySelectorAll("img");
    images.forEach((image) => {
        image.classList.add("hidden");
    });
    setTimeout(() => { LeaderBorad(); }, 2000);
}

function LeaderBorad() {
    display_score.innerHTML = para.textContent;
    scored = para.textContent;
    popup.classList.remove("hidden");
    setTimeout(() => {
        popup.classList.add("open-popup");
    }, 1000)
    board.onclick = () => {
        popup.classList.remove("open-popup");
        setTimeout(() => {
            popup.classList.add("hidden");
            AddLeaderBoard();
        }, 300)
    }
}

function AddLeaderBoard() {
    let storedData = JSON.parse(localStorage.getItem('User')) || [];

    let obj = {
        name: playerName,
        score: scoring
    };
    storedData.push(obj);
    localStorage.setItem('User', JSON.stringify(storedData));
    page3.classList.add("hidden");
    add_board.classList.remove("hidden");
    setTimeout(() => {
        showLeaderBoard();
    }, 2000);
}

function showLeaderBoard() {
    board.classList.remove("hidden");
    let show = JSON.parse(localStorage.getItem('User'));
    show.sort((a, b) => b.score - a.score);
    for (let i in show) {
        let div = document.createElement("div");
        let divh1 = document.createElement("h1");
        let divh2 = document.createElement("h2");
        divh1.innerHTML = show[i].name;
        divh2.innerHTML = show[i].score;
        div.append(divh1);
        div.append(divh2);
        player_store.append(div);
    }
}

function hideClockBefore() {
    tick.classList.add("hidden");
    time.style.backgroundColor = "red";
}

function displaychar(img) {
    let x = display.clientHeight;
    let y = display.clientWidth;
    pop_img = setInterval(() => {
        let randx = Math.random() * (x - 80);
        let randy = Math.random() * (y - 70);
        let image = document.createElement("img");
        image.setAttribute("src", img);
        image.style.top = randx + "px";
        image.style.left = randy + "px";
        display.append(image);
        image.onclick = () => {
            image.classList.add("bubble");
            setTimeout(() => {
                image.classList.add("hidden");
                scoring++;
                animateDots(scoring);
            }, 500)
        };
    }, 1000);
}

function animateDots(points) {
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.add("animate_dots");
    }
    para.innerHTML = points;
    setTimeout(() => {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("animate_dots");
        }
    }, 500);
}











