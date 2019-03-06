module.exports = class Score {
    constructor(ctx) {
        this.ctx = ctx;
        this.currentScore = 0;
    }

    draw () {
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#0000FF';
        this.ctx.fillText(this.currentScore, this.ctx.canvas.width/2, 50);
        this.ctx.fillStyle = '#000000';
    }
};