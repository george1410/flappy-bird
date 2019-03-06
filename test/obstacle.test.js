const Obstacle = require('../src/app/Obstacle.js');

let ctx;
beforeAll(() => {
    ctx = {
        canvas: {
            width: 500,
            height: 600
        }
    }
});

test('obstacles are created in the correct position', () => {
    const obs = new Obstacle(ctx, 'TOP', 200);
    expect(obs.yPos).toBe(0);

    const obs1 = new Obstacle(ctx, 'BOTTOM', 300);
    expect(obs1.yPos).toBe(ctx.canvas.height - 300);
});