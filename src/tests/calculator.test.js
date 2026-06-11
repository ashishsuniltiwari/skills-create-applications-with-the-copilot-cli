const { add, sub, mul, div } = require('../calculator');

describe('calculator basic operations', () => {
  test('addition: add two numbers', () => {
    expect(add([2, 3])).toBe(5);
  });

  test('addition: add multiple numbers', () => {
    expect(add([1, 2, 3, 4])).toBe(10);
  });

  test('subtraction: left-associative', () => {
    expect(sub([10, 4])).toBe(6);
  });

  test('subtraction: multiple operands', () => {
    expect(sub([20, 5, 3])).toBe(12); // 20 - 5 - 3 = 12
  });

  test('multiplication: two numbers', () => {
    expect(mul([45, 2])).toBe(90);
  });

  test('multiplication: multiple numbers', () => {
    expect(mul([2, 3, 4])).toBe(24);
  });

  test('division: simple', () => {
    expect(div([20, 5])).toBe(4);
  });

  test('division: left-associative', () => {
    expect(div([100, 2, 5])).toBe(10); // 100 / 2 / 5 = 10
  });

  test('division by zero throws', () => {
    expect(() => div([8, 0])).toThrow('Division by zero');
  });

  test('division by zero in later operand throws', () => {
    expect(() => div([20, 2, 0, 1])).toThrow('Division by zero');
  });
});
