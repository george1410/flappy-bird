import Bird from './Bird.js';
import Obstacle from './Obstacle.js';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
document.body.appendChild(canvas);

const bird = new Bird(ctx);
const obs = new Obstacle(ctx, 'TOP', 170);
const obs1 = new Obstacle(ctx, 'BOTTOM', 250);

let obstacles = [];
obstacles.push(obs, obs1);

window.onkeyup = (e) => {
    if (e.key === ' ' && bird.alive) {
        bird.jump();
        if (!obs.moving) {
            obs.startMove();
            obs1.startMove();
        }
    }
};

drawGame();

function drawGame() {
    window.requestAnimationFrame(() => {
        if (bird.alive) {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            bird.draw();
            obstacles.forEach(obstacle => {
                obstacle.draw();
            });
            
            drawGame();
        }
        obstacles.forEach((obs) => {
            if (isTouching(bird, obs)) {
                bird.alive = false;
            }
        });
        obstacles = obstacles.filter(ob => !ob.hasLeftScreen());
        if (obstacles.length === 0) {
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
    obstacles.forEach(obstacle => {
        obstacle.startMove();
    })
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