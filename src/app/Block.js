module.exports = class Block {
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
        this.speed = 2;
    }

    draw() {
        this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }

    startMove() {
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

    isTouching(bird) {
        let birdRightEdge = bird.xPos + bird.radius;
        let birdTopEdge = bird.yPos - bird.radius;
        let birdLeftEdge = bird.xPos - bird.radius;
        let birdBottomEdge = bird.yPos + bird.radius;

        let obsLeftEdge = this.xPos;
        let obsBottomEdge = this.yPos + this.height;
        let obsRightEdge = this.xPos + this.width;
        let obsTopEdge = this.yPos;

        if (this.position === 'TOP' && birdRightEdge >= obsLeftEdge && birdTopEdge <= obsBottomEdge && birdLeftEdge <= obsRightEdge ) {
            return true;
        } else if (this.position === 'BOTTOM' && birdRightEdge >= obsLeftEdge && birdBottomEdge >= obsTopEdge && birdLeftEdge <= obsRightEdge) {
            return true;
        } else {
            return false;
        }
    }
};