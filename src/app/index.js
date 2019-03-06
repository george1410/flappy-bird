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
            if (isTouching(bird, obs)) {
                bird.alive = false;
                console.log(score);
            }
            if (running && !obs.counted && (obs.xPos + obs.width < ctx.canvas.width / 2 - bird.radius) && obs.position === 'TOP') {
                score.currentScore++;
                obs.counted = true;
            }
        });
        obstacles = obstacles.filter(ob => !ob.hasLeftScreen());
        if (obstacles.length === 0 && running) {
            newObstacles();
        }
    });
}

function newObstacles() {
    let maxHeight = 400;
    let minHeight = 100;
    let topHeight = Math.floor((Math.random() * (maxHeight - minHeight + 1))) + minHeight;
    let gap = 180;
    let bottomHeight = canvas.height - topHeight - gap;
    console.log(topHeight, bottomHeight);
    obstacles.push(new Obstacle(ctx, 'TOP', topHeight), new Obstacle(ctx, 'BOTTOM', bottomHeight));
    if (running) {
        obstacles.forEach(obstacle => {
            obstacle.startMove();
        });
    }
}

function isTouching(bird, obs) {
    let birdRightEdge = bird.xPos + bird.radius;
    let birdTopEdge = bird.yPos - bird.radius;
    let birdLeftEdge = bird.xPos - bird.radius;
    let birdBottomEdge = bird.yPos + bird.radius;

     let obsLeftEdge = obs.xPos;
     let obsBottomEdge = obs.yPos + obs.height;
     let obsRightEdge = obs.xPos + obs.width;
     let obsTopEdge = obs.yPos;

    if (obs.position === 'TOP' && birdRightEdge >= obsLeftEdge && birdTopEdge <= obsBottomEdge && birdLeftEdge <= obsRightEdge ) {
        return true;
    } else if (obs.position === 'BOTTOM' && birdRightEdge >= obsLeftEdge && birdBottomEdge >= obsTopEdge && birdLeftEdge <= obsRightEdge) {
        return true;
    } else {
        return false;
    }

}