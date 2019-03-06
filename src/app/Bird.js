module.exports = class Bird {
    constructor(ctx) {
        this.xPos = ctx.canvas.width / 2;
        this.yPos = ctx.canvas.height / 2;
        this.ctx = ctx;
        this.radius = 20;
        this.movingUp = false;
        this.speed = 6;
        this.alive = true;
    }

    draw() {
        this.ctx.fillRect(this.xPos - this.radius, this.yPos - this.radius, this.radius * 2, this.radius * 2);
    }

    jump() {
        this.animateUp(100);
    }

    animateUp(distance) {
        this.movingUp = true;
        window.requestAnimationFrame(() => {
            if (distance >= this.speed) {
                this.yPos -= this.speed;
                distance -= this.speed;
                this.animateUp(distance);
            } else if (distance > 0) {
                this.yPos -= distance;
                distance -= distance;
                this.animateUp(distance)
            } else {
                this.movingUp = false;
                this.animateDown();
            }
        });
    }

    animateDown() {
        window.requestAnimationFrame(() => {
            if (!this.movingUp) {
                if (this.yPos + this.radius < this.ctx.canvas.height) {
                    if (this.ctx.canvas.height - (this.yPos + this.radius) < this.speed) {
                        this.yPos += this.ctx.canvas.height - (this.yPos + this.radius);
                    } else {
                        this.yPos += this.speed;
                    }
                    this.animateDown();
                } else {
                    this.alive = false;
                }
            }
        });
    }
};