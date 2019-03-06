const Block = require('../src/app/Block.js');
const Bird = require('../src/app/Bird.js');

let ctx;
beforeAll(() => {
    ctx = {
        canvas: {
            width: 500,
            height: 600
        }
    }
});

beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementationOnce(cb => cb());
});

afterEach(() => {
    window.requestAnimationFrame.mockRestore();
});

test('top blocks are created in the correct position', () => {
    const block = new Block(ctx, 'TOP', 200);
    expect(block.yPos).toBe(0);
});

test('bottom blocks are created in the correct position', () => {
    const block = new Block(ctx, 'BOTTOM', 300);
    expect(block.yPos).toBe(ctx.canvas.height - 300);
});

test('knows when top block is touching a bird', () => {
    const block = new Block(ctx, 'TOP', 300);
    const bird = new Bird(ctx);
    block.xPos = bird.xPos + bird.radius;
    bird.yPos = 100;

    expect(block.isTouching(bird)).toBeTruthy();
});

test('knows when top block is not touching a bird', () => {
    const block = new Block(ctx, 'TOP', 300);
    const bird = new Bird(ctx);
    block.xPos = bird.xPos + bird.radius + 1;
    bird.yPos = 100;

    expect(block.isTouching(bird)).toBeFalsy();
});

test('knows when bottom block is touching a bird', () => {
    const block = new Block(ctx, 'BOTTOM', 300);
    const bird = new Bird(ctx);
    block.xPos = bird.xPos + bird.radius;
    bird.yPos = block.yPos + 100;

    expect(block.isTouching(bird)).toBeTruthy();
});

test('knows when bottom block is not touching a bird', () => {
    const block = new Block(ctx, 'BOTTOM', 300);
    const bird = new Bird(ctx);
    block.xPos = bird.xPos + bird.radius + 1;
    bird.yPos = block.yPos + 100;

    expect(block.isTouching(bird)).toBeFalsy();
});

test('blocks move to the left', () => {
    const block = new Block(ctx, 'TOP', 300);
    const initialX = block.xPos;
    block.startMove();
    expect(block.xPos).toBeLessThan(initialX);
    console.log(block.xPos);
});