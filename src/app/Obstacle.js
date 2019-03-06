module.exports = class Obstacle {
    constructor (ctx, position, height) {
        this.width = 60;
        this.height = height;
        this.position = position;
        this.ctx = ctx;
        this.xPos = this.ctx.canvas.width;
        if (this.position === 'TOP') {
            this.yPos = 0;
        } else {
            this.yPos = this.ctx.canvas.height - this.height;
        }
        this.moving = false;
        this.speed = 2;
    }

    draw() {
        this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }

    startMove() {
        this.moving = true;
        this.animateLeft();
    }

    animateLeft() {
        window.requestAnimationFrame(() => {
            this.xPos -= this.speed;
            this.animateLeft();
        });
    }

    hasLeftScreen() {
        return this.xPos + this.width < 0;
    }
};