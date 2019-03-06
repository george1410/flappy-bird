const Block = require('./Block.js');

module.exports = class Obstacle {
    constructor(ctx) {
        this.ctx = ctx;
        this.gap = 180;
        this.minBlockHeight = 100;
        this.maxBlockHeight = ctx.canvas.height - this.gap - this.minBlockHeight;

        this.topBlockHeight = this.generateTopBlockHeight();
        this.topBlock = new Block(ctx, 'TOP', this.topBlockHeight);

        this.bottomBlockHeight = this.generateBottomBlockHeight();
        this.bottomBlock = new Block(ctx, 'BOTTOM', this.bottomBlockHeight);
    }

    generateTopBlockHeight() {
        return Math.floor((Math.random() * (this.maxBlockHeight - this.minBlockHeight + 1))) + this.minBlockHeight;
    }

    generateBottomBlockHeight() {
        return this.ctx.canvas.height - this.topBlockHeight - this.gap;
    }

    draw() {
        this.topBlock.draw();
        this.bottomBlock.draw();
    }

    startMove() {
        this.topBlock.startMove();
        this.bottomBlock.startMove();
    }

    hasLeftScreen() {
        return this.topBlock.hasLeftScreen() && this.bottomBlock.hasLeftScreen();
    }

    isTouching(bird) {
        return this.topBlock.isTouching(bird) || this.bottomBlock.isTouching(bird);
    }
};