const Bird = require('../src/app/Bird.js');

let ctx;
let bird;
beforeAll(() => {
    ctx = {
        canvas: {
            width: 500,
            height: 600
        }
    }
});

beforeEach(() => {
    bird = new Bird(ctx);
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
    window.requestAnimationFrame.mockRestore();
});

test('the bird starts in center', () => {
    expect(bird.yPos).toBe(ctx.canvas.height / 2);
    expect(bird.xPos).toBe(ctx.canvas.width / 2);
});

test('the bird dies when it hits the floor', () => {
    bird.yPos = 0;
    bird.animateDown();
    expect(bird.alive).toBeFalsy();
});

test('the bird stops when it hits the floor', () => {
    bird.animateDown();
    expect(bird.yPos).toBe(ctx.canvas.height - bird.radius);
});

test('the bird falls downwards', () => {
    let initialY = bird.yPos;
    bird.animateDown();
    expect(bird.yPos).toBeGreaterThan(initialY);
});

test('the bird jumping moves up', () => {
    const mock = jest.spyOn(bird, 'animateUp').mockImplementation(distance =>  {});
    bird.jump();
    expect(mock).toBeCalled();
});

test('the bird moves up by the right amount', () => {
    jest.spyOn(bird, 'animateDown').mockImplementation(null);
    const distance = 100;
    const initialY = bird.yPos;
    bird.animateUp(distance);
    expect(bird.yPos).toEqual(initialY - distance);
});