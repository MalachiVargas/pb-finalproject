// unit testing generate color function

const generateColor = require('./generateColor');

test('generate color', () => {
    expect(/^#([A-Fa-f0-9]{6})$/.test(generateColor())).toBe(true);
});
