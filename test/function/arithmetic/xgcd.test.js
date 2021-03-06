// test xgcd
var assert = require('assert'),
    math = require('../../../index')(),
    gcd = math.gcd,
    xgcd = math.xgcd;

describe('xgcd', function() {

  it('should return extended greatest common divisor of two numbers', function() {
    // xgcd(36163, 21199) = 1247 => -7(36163) + 12(21199) = 1247
    assert.deepEqual([1247, -7, 12], xgcd(36163, 21199));
    // xgcd(120, 23) = 1 => -9(120) + 47(23) = 1
    assert.deepEqual([1, -9, 47], xgcd(120, 23));
    // some unit tests from: https://github.com/sjkaliski/numbers.js/blob/master/test/basic.test.js
    assert.deepEqual([5, -3, 5], xgcd(65, 40));
    assert.deepEqual([5, 5, -3], xgcd(40, 65));
    assert.deepEqual([21, -16, 27], xgcd(1239, 735));
    assert.deepEqual([21, 5, -2], xgcd(105, 252));
    assert.deepEqual([21, -2, 5], xgcd(252, 105));
  });

  it ('should calculate xgcd for edge cases around zero', function () {
    assert.deepEqual([3, 1, 0], xgcd(3, 0));
    assert.deepEqual([3, -1, 0], xgcd(-3, 0));
    assert.deepEqual([3, 0, 1], xgcd(0, 3));
    assert.deepEqual([3, 0, -1], xgcd(0, -3));

    assert.deepEqual([1, 0, 1], xgcd(1, 1));
    assert.deepEqual([1, 1, 0], xgcd(1, 0));
    assert.deepEqual([1, 0, -1], xgcd(1, -1));
    assert.deepEqual([1, 0, 1], xgcd(-1, 1));
    assert.deepEqual([1, -1, 0], xgcd(-1, 0));
    assert.deepEqual([1, 0, -1], xgcd(-1, -1));
    assert.deepEqual([1, 0, 1], xgcd(0, 1));
    assert.deepEqual([1, 0, -1], xgcd(0, -1));
    assert.deepEqual([0, 0, 0], xgcd(0, 0));
  });

  it.skip ('should calculate xgcd for edge cases with negative values', function () {
    assert.deepEqual([1, -2, 1], xgcd(2, 5));
    assert.deepEqual([1, -2, -1], xgcd(2, -5));
    assert.deepEqual([1, 2, 1], xgcd(-2, 5));
    assert.deepEqual([1, 2, -1], xgcd(-2, -5));

    assert.deepEqual([2, 1, 0], xgcd(2, 6));
    assert.deepEqual([2, 1, 0], xgcd(2, -6));
    assert.deepEqual([2, -1, 0], xgcd(-2, 6));
    assert.deepEqual([2, -1, 0], xgcd(-2, -6));
  });

  it('should find the greatest common divisor of booleans', function() {
    assert.deepEqual([1, 0, 1], xgcd(true, true));
    assert.deepEqual([1, 1, 0], xgcd(true, false));
    assert.deepEqual([1, 0, 1], xgcd(false, true));
    assert.deepEqual([0, 0, 0], xgcd(false, false));
  });

  it('should give same results as gcd', function() {
    assert.equal(gcd(1239, 735), xgcd(1239, 735)[0]);
    assert.equal(gcd(105, 252),  xgcd(105, 252)[0]);
    assert.equal(gcd(7, 13),     xgcd(7, 13)[0]);
  });

  it('should throw an error if used with wrong number of arguments', function() {
    assert.throws(function () {xgcd(1)});
    assert.throws(function () {xgcd(1, 2, 3)});
  });

  it('should throw an error when used with a complex number', function() {
    assert.throws(function () {xgcd(math.complex(1,3),2); }, TypeError, 'Function xgcd(complex, number) not supported');
  });

  it('should throw an error when used with a string', function() {
    assert.throws(function () {xgcd('a', 2); }, TypeError, 'Function xgcd(string, number) not supported');
    assert.throws(function () {xgcd(2, 'a'); }, TypeError, 'Function xgcd(number, string) not supported');
  });

  it('should throw an error when used with a unit', function() {
    assert.throws(function () { xgcd(math.unit('5cm'), 2); }, TypeError, 'Function xgcd(unit, number) not supported');
  });

  it('should throw an error when used with a matrix', function() {
    assert.throws(function () { xgcd([5,2,3], [25,3,6]); }, TypeError, 'Function xgcd(array, array) not supported');
  });


});