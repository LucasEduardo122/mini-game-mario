const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.clouds');
const gameover = document.querySelector('.gameover');
const containerstartgame = document.querySelector('.start-game');

let resetGame = false;
let loop;

document.addEventListener("keydown", jumpEvent);

function jumpEvent(event) {
    if (event.code === "Space") {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

function startLoop() {
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 80) {
            stopAnimations();
            setGameOverState();

            gameover.style.display = "block";
            containerstartgame.style.display = "block";

            clearInterval(loop);

            resetGame = true;
        }
    }, 10);
}

startLoop();

function resetGameState() {
    gameover.style.display = "none";
    pipe.style.left = '';
    pipe.style.right = "-82px";
    mario.style.bottom = '0px';
    mario.style.width = '80px';
    mario.style.marginLeft = "0px";
    mario.style.transition = "none";
    mario.style.transform = "none";
    mario.src = "./assets/img/mario.gif";
    cloud.style.right = "-549px";

    if (loop) {
        clearInterval(loop);
    }

    startLoop();
}

function startGame() {
    if (resetGame) {
        resetGameState();
    }

    containerstartgame.style.display = "none";

    startAnimations();
}

containerstartgame.addEventListener("click", startGame);

function stopAnimations() {
    pipe.style.animation = 'none';
    mario.classList.remove('jump');
    cloud.style.animation = 'none';
}

function setGameOverState() {
    pipe.style.left = `${pipe.offsetLeft}px`;
    mario.style.bottom = `${mario.style.bottom}px`;
    mario.src = "./assets/img/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "15px";
    cloud.style.right = "0px";
}

function startAnimations() {
    pipe.style.animation = "pipeMove 1.5s infinite linear";
    cloud.style.animation = "cloudMove 5s infinite linear";
}
