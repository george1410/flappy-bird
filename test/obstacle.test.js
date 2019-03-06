const Obstacle = require('../src/app/Obstacle.js');

let ctx;

let originalMath = Object.create(global.Math);
afterEach(() => {
    global.Math = originalMath;
});

beforeAll(() => {
    ctx = {
        canvas: {
            width: 500,
            height: 600
        }
    }
});

test('obstacle has gap of size 180', () => {
    const obs = new Obstacle(ctx);
    expect(ctx.canvas.height - obs.bottomBlock.height - obs.topBlock.height).toBe(180);
});

test('top block height should never be below 100', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;

    const obs = new Obstacle(ctx);
    expect(obs.topBlock.height).toBe(100);
});

test('top block height should never be too large', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.9999999999999;
    global.Math = mockMath;

    const obs = new Obstacle(ctx);
    expect(obs.topBlock.height).toBe(ctx.canvas.height - obs.gap - obs.bottomBlock.height);
});

test('bottom block height should never be below 100', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.9999999999999;
    global.Math = mockMath;

    const obs = new Obstacle(ctx);
    expect(obs.bottomBlock.height).toBe(100);
});

test('bottom block height should never be too large', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;

    const obs = new Obstacle(ctx);
    expect(obs.bottomBlock.height).toBe(ctx.canvas.height - obs.gap - obs.topBlock.height);
});

test('obstacle should draw top and bottom blocks', () => {
    const obs = new Obstacle(ctx);
    const mockTopDraw = jest.spyOn(obs.topBlock, 'draw').mockImplementation(null);
    const mockBottomDraw = jest.spyOn(obs.bottomBlock, 'draw').mockImplementation(null);
    obs.draw();
    expect(mockTopDraw).toBeCalled();
    expect(mockBottomDraw).toBeCalled();
});

test('obstacle should move top and bottom blocks', () => {
    const obs = new Obstacle(ctx);
    const mockTopMove = jest.spyOn(obs.topBlock, 'startMove').mockImplementation(null);
    const mockBottomMove = jest.spyOn(obs.bottomBlock, 'startMove').mockImplementation(null);
    obs.startMove();
    expect(mockTopMove).toBeCalled();
    expect(mockBottomMove).toBeCalled();
});