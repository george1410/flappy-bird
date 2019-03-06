export default class Bird {
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
            distance -= this.speed;
            this.yPos -= this.speed;
            if (distance > 0) {
                this.animateUp(distance);
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
                    this.yPos += this.speed;
                    this.animateDown();
                } else {
                    this.alive = false;
                }
            }
        });
    }
}