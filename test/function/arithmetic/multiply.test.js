// test multiply
var assert = require('assert'),
    math = require('../../../index')(),
    approx = require('../../../tools/approx'),
    multiply = math.multiply,
    divide = math.divide,
    matrix = math.matrix,
    complex = math.complex,
    range = math.range,
    i = math.i,
    unit = math.unit;

describe('multiply', function() {

  it('should multiply two numbers correctly', function() {
    approx.equal(multiply(2, 3), 6);
    approx.equal(multiply(-2, 3), -6);
    approx.equal(multiply(-2, -3), 6);
    approx.equal(multiply(5, 0), 0);
    approx.equal(multiply(0, 5), 0);
    approx.deepEqual(multiply(0, Infinity), NaN);
    approx.deepEqual(multiply(2, Infinity), Infinity);
    approx.deepEqual(multiply(-2, Infinity), -Infinity);
  });

  it('should multiply booleans', function() {
    assert.equal(multiply(true, true), 1);
    assert.equal(multiply(true, false), 0);
    assert.equal(multiply(false, true), 0);
    assert.equal(multiply(false, false), 0);
  });

  it('should multiply mixed numbers and booleans', function() {
    assert.equal(multiply(2, true), 2);
    assert.equal(multiply(2, false), 0);
    assert.equal(multiply(true, 2), 2);
    assert.equal(multiply(false, 2), 0);
  });

  it('should multiply two complex numbers correctly', function() {
    approx.deepEqual(multiply(complex(2, 3), 2), complex(4, 6));
    approx.deepEqual(multiply(complex(2, -3), -2), complex(-4, 6));
    approx.deepEqual(multiply(complex(2, -3), 2), complex(4, -6));
    approx.deepEqual(multiply(complex(-2, 3), 2), complex(-4, 6));
    approx.deepEqual(multiply(complex(-2, -3), 2), complex(-4, -6));
    approx.deepEqual(multiply(2, complex(2, 3)), complex(4, 6));
    approx.deepEqual(multiply(i, complex(2, 3)), complex(-3, 2));
    approx.deepEqual(multiply(complex(0, 1), complex(2, 3)), complex(-3, 2));
    approx.deepEqual(multiply(complex(1, 1), complex(2, 3)), complex(-1, 5));
    approx.deepEqual(multiply(complex(2, 3), complex(1, 1)), complex(-1, 5));
    approx.deepEqual(multiply(complex(2, 3), complex(2, 3)), complex(-5, 12));
    approx.deepEqual(divide(complex(-5, 12), complex(2, 3)), complex(2, 3));
    approx.deepEqual(multiply(complex(2, 3), 0), complex(0, 0));
    approx.deepEqual(multiply(complex(0, 3), complex(0, -4)), complex(12, 0));
    approx.deepEqual(multiply(multiply(3, i), multiply(-4, i)), complex(12, 0));
    approx.deepEqual(multiply(math.i, Infinity), complex(0, Infinity));
    approx.deepEqual(multiply(Infinity, math.i), complex(0, Infinity));

    approx.deepEqual(multiply(complex(2,0), complex(0,2)), complex(0, 4));
    approx.deepEqual(multiply(complex(0,2), complex(0,2)), -4);
    approx.deepEqual(multiply(complex(2,2), complex(0,2)), complex(-4, 4));
    approx.deepEqual(multiply(complex(2,0), complex(2,2)), complex(4, 4));
    approx.deepEqual(multiply(complex(0,2), complex(2,2)), complex(-4, 4));
    approx.deepEqual(multiply(complex(2,2), complex(2,2)), complex(0, 8));
    approx.deepEqual(multiply(complex(2,0), complex(2,0)), 4);
    approx.deepEqual(multiply(complex(0,2), complex(2,0)), complex(0, 4));
    approx.deepEqual(multiply(complex(2,2), complex(2,0)), complex(4, 4));

    approx.deepEqual(multiply(complex(2, 3), complex(4, 5)), complex(-7, 22));
    approx.deepEqual(multiply(complex(2, 3), complex(4, -5)), complex(23, 2));
    approx.deepEqual(multiply(complex(2, 3), complex(-4, 5)), complex(-23, -2));
    approx.deepEqual(multiply(complex(2, 3), complex(-4, -5)), complex(7, -22));
    approx.deepEqual(multiply(complex(2, -3), complex(4, 5)), complex(23, -2));
    approx.deepEqual(multiply(complex(2, -3), complex(4, -5)), complex(-7, -22));
    approx.deepEqual(multiply(complex(2, -3), complex(-4, 5)), complex(7, 22));
    approx.deepEqual(multiply(complex(2, -3), complex(-4, -5)), complex(-23, 2));
    approx.deepEqual(multiply(complex(-2, 3), complex(4, 5)), complex(-23, 2));
    approx.deepEqual(multiply(complex(-2, 3), complex(4, -5)), complex(7, 22));
    approx.deepEqual(multiply(complex(-2, 3), complex(-4, 5)), complex(-7, -22));
    approx.deepEqual(multiply(complex(-2, 3), complex(-4, -5)), complex(23, -2));
    approx.deepEqual(multiply(complex(-2, -3), complex(4, 5)), complex(7, -22));
    approx.deepEqual(multiply(complex(-2, -3), complex(4, -5)), complex(-23, -2));
    approx.deepEqual(multiply(complex(-2, -3), complex(-4, 5)), complex(23, 2));
    approx.deepEqual(multiply(complex(-2, -3), complex(-4, -5)), complex(-7, 22));
  });

  it('should multiply a number and a unit correctly', function() {
    assert.equal(multiply(2, unit('5 mm')).toString(), '10 mm');
    assert.equal(multiply(2, unit('5 mm')).toString(), '10 mm');
    assert.equal(multiply(unit('5 mm'), 2).toString(), '10 mm');
    assert.equal(multiply(unit('5 mm'), 0).toString(), '0 m');
  });

  it('should throw an error if used with strings', function() {
    assert.throws(function () {multiply("hello", "world")});
    assert.throws(function () {multiply("hello", 2)});
  });

  var a = matrix([[1,2],[3,4]]);
  var b = matrix([[5,6],[7,8]]);
  var c = matrix([[5],[6]]);
  var d = matrix([[5,6]]);

  it('should perform element-wise multiplication if multiplying a matrix and a number', function() {
    approx.deepEqual(multiply(a, 3), matrix([[3,6],[9,12]]));
    approx.deepEqual(multiply(3, a), matrix([[3,6],[9,12]]));
  });

  it('should perform matrix multiplication', function () {
    approx.deepEqual(multiply(a, b), matrix([[19,22],[43,50]]));
    approx.deepEqual(multiply(a, c), matrix([[17],[39]]));
    approx.deepEqual(multiply(d, a), matrix([[23,34]]));
    approx.deepEqual(multiply(d, b), matrix([[67,78]]));
    approx.deepEqual(multiply(d, c), matrix([[61]]));
    approx.deepEqual(multiply([[1,2],[3,4]], [[5,6],[7,8]]), [[19,22],[43,50]]);
    approx.deepEqual(multiply([1,2,3,4], 2), [2, 4, 6, 8]);
    approx.deepEqual(multiply(matrix([1,2,3,4]), 2), matrix([2, 4, 6, 8]));
  });

  it('should multiply a vector with a matrix correctly', function () {
    var a = [1, 2, 3];
    var b = [
      [8, 1, 6],
      [3, 5, 7],
      [4, 9, 2]
    ];

    approx.deepEqual(multiply(a, b), [26, 38, 26]);
    approx.deepEqual(multiply(b, a), [28, 34, 28]);
  });

  it('should multiply vectors correctly (dot product)', function () {
    var a = [1, 2, 3];
    var b = [4, 5, 6];

    approx.deepEqual(multiply(a, b), 32);
  });

  it('should throw an error if multiplying matrices with incompatible sizes', function() {
    assert.throws(function () {multiply(c, b)});

    // TODO: test vector*vector with wrong size
    // TODO: test vector*matrix with wrong size
    // TODO: test matrix*vector with wrong size
  });

});
