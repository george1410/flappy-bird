const Bird = require('./Bird.js');
const Obstacle = require('./Obstacle.js');
const Score = require('./Score.js');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
document.body.appendChild(canvas);

const bird = new Bird(ctx);
const score = new Score(ctx);
let bgImg = new Image();
bgImg.src = './background.png';

let birdImg = new Image();
birdImg.src = './bird.png';

let running = false;

let obstacles = [];

window.onkeyup = (e) => {
    if (e.key === ' ' && bird.alive) {
        bird.jump();
    }
    running = true;
};

drawGame();

function drawGame() {
    window.requestAnimationFrame(() => {
        if (bird.alive) {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(bgImg, 0, 0);
            bird.draw();
            obstacles.forEach(obstacle => {
                obstacle.draw();
            });
            score.draw();
            drawGame();
        }
        obstacles.forEach((obs) => {
            if (obs.isTouching(bird)) {
                bird.alive = false;
            }
        });
        obstacles = obstacles.filter(ob => !ob.hasLeftScreen());
        if (obstacles.length === 0 && running) {
            newObstacles();
        }
    });
}

function newObstacles() {
    obstacles.push(new Obstacle(ctx));
    if (running) {
        obstacles.forEach(obstacle => {
            obstacle.startMove();
        });
    }
}