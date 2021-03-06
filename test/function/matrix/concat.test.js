var assert = require('assert'),
    math = require('../../../index')();

describe('concat', function() {

  var a = [[1,2],[3,4]];
  var b = [[5,6],[7,8]];
  var c = [[9,10],[11,12]];
  var d = [
    [ [1,2],  [3,4] ],
    [ [5,6],  [7,8] ]
  ];
  var e = [
    [ [9,10], [11,12] ],
    [ [13,14], [15,16] ]
  ];

  it('should concatenate compatible matrices on the last dimension by default', function() {
    assert.deepEqual(math.concat([1,2,3], [4]), [1,2,3,4]);
    assert.deepEqual(math.concat([[1],[2],[3]], [[4]], 0), [[1],[2],[3],[4]]);
    assert.deepEqual(math.concat([[],[]], [[1,2],[3,4]]), [[1,2],[3,4]]);

    assert.deepEqual(math.concat(math.matrix(a), math.matrix(b)), math.matrix([
      [1,2,5,6],
      [3,4,7,8]
    ]));

    assert.deepEqual(math.concat(a, b, c), [
      [1,2,5,6,9,10],
      [3,4,7,8,11,12]
    ]);

    assert.deepEqual(math.concat(d,e), [
      [ [1,2,9,10],  [3,4,11,12] ],
      [ [5,6,13,14],  [7,8,15,16] ]
    ]);

  });

  it('should concatenate compatible matrices on the given dimension', function() {
    assert.deepEqual(math.concat([[1]], [[2]], 1), [[1,2]]);
    assert.deepEqual(math.concat([[1]], [[2]], 0), [[1],[2]]);
    assert.deepEqual(math.concat([[1]], [[2]], 0), [[1],[2]]);

    assert.deepEqual(math.concat(a, b, 0), [
      [1,2],
      [3,4],
      [5,6],
      [7,8]
    ]);

    assert.deepEqual(math.concat(a, b, c, 0), [
      [1,2],
      [3,4],
      [5,6],
      [7,8],
      [9,10],
      [11,12]
    ]);

    assert.deepEqual(math.concat(d,e,0), [
      [ [1,2],  [3,4] ],
      [ [5,6],  [7,8] ],
      [ [9,10], [11,12] ],
      [ [13,14], [15,16] ]
    ]);

    assert.deepEqual(math.concat(d,e,1), [
      [ [1,2],  [3,4], [9,10], [11,12] ],
      [ [5,6],  [7,8], [13,14], [15,16] ]
    ]);
    
  });
});