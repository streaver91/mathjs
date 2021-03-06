var assert = require('assert'),
    math = require('../../../index')(),
    bool = math.boolean;

describe('boolean', function() {

  it('should be the identity with a boolean', function() {
    assert.equal(bool(true), true);
    assert.equal(bool(false), false);
  });

  it('should return false for 0, true for any other number', function() {
    assert.equal(bool(-2), true);
    assert.equal(bool(-1), true);
    assert.equal(bool(0), false);
    assert.equal(bool(1), true);
    assert.equal(bool(2), true);
  });

  it('should convert the elements of a matrix or array to booleans', function() {
    assert.deepEqual(bool(math.matrix([1,0,1,1])), new math.type.Matrix([true, false, true, true]));
    assert.deepEqual(bool([1,0,1,1]), [true, false, true, true]);
  });

  it('should return false for \'0\', true for any other valid number string', function() {
    assert.equal(bool('2'), true);
    assert.equal(bool(' 4e2 '), true);
    assert.equal(bool(' -4e2 '), true);
    assert.equal(bool('0'), false);
    assert.equal(bool(' 0 '), false);
  });

  it('should throw an error if the string is not a valid number', function() {
    assert.throws(function () {bool('')}, SyntaxError);
    assert.throws(function () {bool('23a')}, SyntaxError);
  });

  it('should throw an error if there\'s a wrong number of arguments', function() {
    assert.throws(function () {bool(1,2)}, SyntaxError);
    assert.throws(function () {bool(1,2,3)}, SyntaxError);
  });

  it('should throw an error if used with a complex', function() {
    assert.throws(function () {bool(math.complex(2,3))}, SyntaxError);
  });

  it('should throw an error if used with a unit', function() {  
    assert.throws(function () {bool(math.unit('5cm'))}, SyntaxError);
  });

});