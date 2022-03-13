/**
 * Problem: Let's sort the elements in the matrix in
 * ascending vortex black hole
 *
 *
 * Understanding the problem
 * - matrix
 * -- 0 1 2 3
 * 0| 4 1 3 5
 * 1| 2 6 7 8
 * 2| 9 1 4 5
 *
 * - array elements = [4,1,3,5,2,6,7,8,9,1,4,5]
 * - sorted array elements in ascending order =  [1,1,2,3,4,4,5,5,6,7,8,9]
 *
 * - vortex black hole
 * -- 0 1 2 3
 * 0| ->->->↓
 * 1| ↑ ->->↓
 * 2| <-<-<-<-
 *
 * - matrix ret sorted in ascending vortex black hole
 * -- 0 1 2 3
 * 0| 1 1 2 3
 * 1| 7 8 9 4
 * 2| 6 5 5 4
 *
 * + step 1: get array matrix element
 * + step 2: sort step 1
 * + step 3: traverse vortex black hole
 * + step 4: fill
 *
 *
 *
 */

/**
 *
 * @param {Array<Array>} m
 *
 */
function fx(m) {
  let matrixElements = [];

  for (let i = m.length - 1; i >= 0; --i) {
    for (let j = m[i].length - 1; j >= 0; --j) {
      matrixElements = push(matrixElements, m[i][j]);
    }
  }

  matrixElements =
    bringIncreasinglyElementToTheIncreasinglyIndexAscendingOrderSort(
      matrixElements
    );
  console.log(matrixElements);
  // use matrix black hole traverse tech
  // fill
  let breakTime = getTheNumberOfBreakTimeLevelDownMatrix(m);
  let zeroNumber = 0;
  for (let i = zeroNumber; i < m.length; ++i) {
    if (i === zeroNumber) {
      for (let j = zeroNumber; j <= m[zeroNumber].length - 1; ++j) {
        m[i][j] = matrixElements[zeroNumber];
        matrixElements = shift(matrixElements);
      }
    }
    if (i > zeroNumber && i < m.length - 1) {
      m[i][m[i].length - 1] = matrixElements[zeroNumber];
      matrixElements = shift(matrixElements);
    }
    if (i === m.length - 1 && i !== zeroNumber) {
      if (m[i].length - 1 !== zeroNumber) {
        for (let j = m[i].length - 1; j >= zeroNumber; --j) {
          m[i][j] = matrixElements[zeroNumber];
          matrixElements = shift(matrixElements);
        }
        for (let k = m.length - 1; k > zeroNumber; --k) {
          m[k][zeroNumber] = matrixElements[zeroNumber];
          matrixElements = shift(matrixElements);
        }
      }
      if (m[i].length - 1 === zeroNumber) {
        m[i][zeroNumber] = matrixElements[zeroNumber];
        matrixElements = shift(matrixElements);
      }
    }
  }

  while (breakTime > 0) {
    const matrixTemporary = matrixLevelDown(m);
  }
  console.log("matrix after the row were sorted");

  return m;
}

/**
 *
 * @param {Array<Array>} m
 */
function getTheNumberOfBreakTimeLevelDownMatrix(m) {
  let breakTime = 0;

  while (m !== -1) {
    m = matrixLevelDown(m);
    breakTime++;
  }

  breakTime--;

  return breakTime;
}

/**
 *
 * @param {Array<Array>} m
 */
function matrixLevelDown(m) {
  if (m.length <= 2 || m[0].length <= 2) {
    return -1;
  }
  const startColumnIndex = 1;
  const endColumnIndex = m[0].length - 1 - 1;
  const startRowIndex = 1;
  const endRowIndex = m.length - 1 - 1;

  let matrixRet = [];

  for (let i = startRowIndex; i <= endRowIndex; ++i) {
    let rowI = [];
    for (let j = startColumnIndex; j <= endColumnIndex; ++j) {
      rowI = push(rowI, m[i][j]);
    }
    matrixRet = push(matrixRet, rowI);
  }

  return matrixRet;
}

/**
 *
 * @param {Array} a
 */
function ascendingBubbleSort(a) {
  for (let i = a.length - 1; i >= 0; --i) {
    for (let j = i - 1; j >= 0; --j) {
      if (a[j] > a[i]) {
        const temporary = a[i];
        a[i] = a[j];
        a[j] = temporary;
      }
    }
  }
  return a;
}

/**
 *
 * @param {Array} a
 */
function bringIncreasinglyElementToTheIncreasinglyIndexAscendingOrderSort(a) {
  /**
   * -------0 1 2 3 4
   * - a = [1,2,3,4,5]
   * + step 1: get minimum value of array - done
   * + step 2: write a function to find the closest greater than the number n - done
   * + step 3: move those element to the start index 0,1,2,..
   *
   * -------0 1 2 3 4
   * - a = [1,2,5,4,3]
   * + i = 4
   *   + a[i] = 3
   *   + greaterNear = 4 = a[3]
   *   + swap
   *   + a = [1,2,5,3,4]
   *
   *
   *
   */
  /**
   *
   * @param {Array} a
   */
  function getArrayMinimumNumber(a) {
    let minimumNumber = Number.POSITIVE_INFINITY;

    for (let i = a.length - 1; i >= 0; --i) {
      if (a[i] < minimumNumber) {
        minimumNumber = a[i];
      }
    }

    return minimumNumber;
  }
  /**
   *
   * @param {Array} a
   * @param {Number} n
   */
  function getClosestGreaterNumberNInArray(a, n) {
    /**
     * -------0 1 2 3 4
     * - a = [1,2,3,4,5]
     * - n = 2
     * - ret = 3
     *
     * + i = 0
     *   + a[i] = a[0] = 1 > 2 ? -> false
     * + i = 1
     *   + a[i] = a[1] = 2 > 2 ? -> false
     * + i = 2
     *   + a[i] = a[2] = 3 > 2 ? -> true
     *   + saveNumber = 3
     * + i = 3
     *   + a[i] = a[3] = 4 > 2 ? -> true
     *     + a[i] <= saveNumber ? saveNumber = a[i] : i++
     *
     *
     * - a = [1,3,5,2,4]
     * - n = 2
     * - ret = 3
     *
     * + step 1: get |n-a[i]| array
     * + step 2: get min && min > 0 step 1
     * + step 3: get a[min index]
     *
     *
     */
    let arrayOfTheAbsoluteSubtractionOfNAndAllArrayElement = [];

    for (let i = a.length - 1; i >= 0; --i) {
      arrayOfTheAbsoluteSubtractionOfNAndAllArrayElement = reversePush(
        arrayOfTheAbsoluteSubtractionOfNAndAllArrayElement,
        Math.abs(n - a[i])
      );
    }

    let minimumButNotZero = Number.POSITIVE_INFINITY;
    for (
      let i = arrayOfTheAbsoluteSubtractionOfNAndAllArrayElement.length - 1;
      i >= 0;
      --i
    ) {
      if (
        arrayOfTheAbsoluteSubtractionOfNAndAllArrayElement[i] !== 0 &&
        arrayOfTheAbsoluteSubtractionOfNAndAllArrayElement[i] <
          minimumButNotZero
      ) {
        minimumButNotZero =
          arrayOfTheAbsoluteSubtractionOfNAndAllArrayElement[i];
      }
    }

    let ret = null;

    for (let i = a.length - 1; i >= 0; --i) {
      if (
        Math.abs(n - a[i]) !== 0 &&
        Math.abs(n - a[i]) === minimumButNotZero &&
        a[i] > n
      ) {
        ret = a[i];
      }
    }

    return ret;
  }

  let minimumNumberIncreasinger = getArrayMinimumNumber(a);

  let startIndexIncreasinger = 0;

  let ret = new Array(a.length);

  for (let i = a.length - 1; i >= 0; --i) {
    ret[startIndexIncreasinger] = minimumNumberIncreasinger;
    minimumNumberIncreasinger = getClosestGreaterNumberNInArray(
      a,
      minimumNumberIncreasinger
    );
    startIndexIncreasinger++;
  }

  return ret;
}

/**
 *
 * @param {Array} a
 */
function shift(a) {
  /**
   * -------0 1 2
   * - a = [1,2,3]
   * ---------0 1
   * - ret = [2,3]
   */
  const ret = new Array(a.length - 1);

  for (let i = ret.length - 1; i >= 0; --i) {
    ret[i] = a[i + 1];
  }

  return ret;
}

/**
 *
 * @param {Array} a
 * @param {any} e
 *
 */
function reversePush(a, e) {
  /**
   * -------0 1 2
   * - a = [1,2,3]
   * - e = 4
   * ---------0 1 2 3
   * - ret = [4,1,2,3]
   */
  const ret = new Array(a.length + 1);

  ret[0] = e;

  for (let i = ret.length - 1; i >= 1; --i) {
    ret[i] = a[i - 1];
  }

  return ret;
}

/**
 *
 * @param {Array} a
 */
function pop(a) {
  const ret = new Array(a.length - 1);

  for (let i = ret.length - 1; i >= 0; --i) {
    ret[i] = a[i];
  }

  return ret;
}

/**
 *
 * @param {Array} a
 * @param {string} key
 *
 */
function join(a, key) {
  let ret = "";

  for (let i = 0; i <= a.length - 1; ++i) {
    ret += a[i] + key;
  }

  return ret;
}

/**
 *
 * @param {Array} a
 * @param {any} e
 *
 */
function push(a, e) {
  let ret = new Array(a.length + 1);
  ret[ret.length - 1] = e;
  for (let i = a.length - 2; i >= 0; --i) {
    ret[i] = a[i];
  }
  return ret;
}

/**
 *
 *
 * @param {Array<Array>} m
 */
function advanceLogMatrix(m) {
  /**
   *
   * @param {Number} number
   */
  function generateSpace(number) {
    /**
     * - n = 1
     * - ret = " "
     *
     * - n = 3
     * - ret = "   "
     */
    let ret = "";
    for (let i = number; i >= 1; --i) {
      ret += " ";
    }
    return ret;
  }
  /**
   *
   * @param {string} s
   */
  function stringRightTrim(s) {
    let arrayCharacters = new Array(s.length);

    for (let i = s.length - 1; i >= 0; --i) {
      arrayCharacters[i] = s[i];
    }

    while (arrayCharacters[arrayCharacters.length - 1] === " ") {
      arrayCharacters = pop(arrayCharacters);
    }

    return {
      arrayCharacters: arrayCharacters,
      string: join(arrayCharacters, ""),
    };
  }

  /**
   *
   * @param {Array} a
   * @param {string} key
   *
   */
  function join(a, key) {
    let ret = "";

    for (let i = 0; i <= a.length - 1; ++i) {
      ret += a[i] + key;
    }

    return ret;
  }

  /**
   *
   * @param {Array} a
   */
  function pop(a) {
    /**
     * -------0 1 2 3
     * - a = [1,2,3,4]
     * ---------0 1 2
     * - ret = [1,2,3]
     */
    const ret = new Array(a.length - 1);
    for (let i = ret.length - 1; i >= 0; --i) {
      ret[i] = a[i];
    }
    return ret;
  }

  const topBoundary = "-----Matrix-----";
  console.log(topBoundary); // len = 16
  /**
   *
   * @param {Number} n
   */
  function getNumberDigits(n) {
    if (n === 0) return 1;

    let ret = 0;
    if (n < 0) {
      ret++;
      n = Math.abs(n);

      while (n !== 0) {
        n = Math.floor(n / 10);
        ret++;
      }

      return ret;
    }

    while (n !== 0) {
      n = Math.floor(n / 10);
      ret++;
    }

    return ret;
  }

  let columnIndex = "--";
  for (let i = 0; i <= m[0].length - 1; ++i) {
    let space = "";
    let numberDigits = getNumberDigits(m[0][i]);
    for (let j = numberDigits - 1; j >= 0; --j) {
      space += " ";
    }
    columnIndex += i + space;
  }
  columnIndex = stringRightTrim(columnIndex).string;
  let spaceBetweenLastColumnIndexToRightBoundary =
    topBoundary.length - columnIndex.length;
  const spaceForColumnIndexToRightBoundary = generateSpace(
    spaceBetweenLastColumnIndexToRightBoundary - 1 + 5
  );
  columnIndex += spaceForColumnIndexToRightBoundary + "|";
  console.log(columnIndex);

  for (let i = 0; i <= m.length - 1; ++i) {
    let row = i + "|";
    for (let j = 0; j <= m[i].length - 1; ++j) {
      row += m[i][j] + " ";
    }
    row = stringRightTrim(row).string;
    const spaceBetweenRowIToRightBoundary = generateSpace(
      topBoundary.length - 1 - row.length + 5
    );
    row += spaceBetweenRowIToRightBoundary + "|";
    console.log(row);
  }
  const bottomBoundary = "---------------";
  console.log(bottomBoundary);
}

/**
 *
 * @param {Array} a
 * @param {any} e
 */
function push(a, e) {
  let ret = new Array(a.length + 1);
  ret[ret.length - 1] = e;
  for (let i = ret.length - 2; i >= 0; --i) {
    ret[i] = a[i];
  }
  return ret;
}

/**
 *
 * @param {Number} rows
 * @param {Number} columns
 *
 */
function generateMatrix(rows, columns) {
  let ret = [];
  for (let i = rows - 1; i >= 0; --i) {
    let row = [];
    for (let j = columns - 1; j >= 0; --j) {
      row = push(row, generateRandomNumber(-100, 100));
    }
    ret = push(ret, row);
  }
  return ret;
}

/**
 *
 * @param {Number} from
 * @param {Number} to
 *
 */
function generateRandomNumber(from, to) {
  return Math.round(Math.random() * (to - from) + from);
}

const numberOfRow = generateRandomNumber(1, 9);
const numberOfColumn = generateRandomNumber(1, 9);

const m1 = generateMatrix(1, 1);
const m2 = generateMatrix(5, 1);
const m3 = generateMatrix(5, 2);
const m4 = generateMatrix(5, 6);

const m5 = generateMatrix(1, 6);
const m6 = generateMatrix(2, 6);
const m7 = generateMatrix(5, 6);

const m8 = generateMatrix(numberOfRow, numberOfColumn);

function test1() {
  console.log("\nMatrix input 1");
  advanceLogMatrix(m1);
  matrixBlackHoleTraverse(m1);
}

function test2() {
  console.log("\nMatrix input 2");
  advanceLogMatrix(m2);
  matrixBlackHoleTraverse(m2);
}

function test3() {
  console.log("\nMatrix input 3");
  advanceLogMatrix(m3);
  matrixBlackHoleTraverse(m3);
}

function test4() {
  console.log("\nMatrix input 4");
  advanceLogMatrix(m4);
  matrixBlackHoleTraverse(m4);
}

function test5() {
  console.log("\nMatrix input 5");
  advanceLogMatrix(m5);
  matrixBlackHoleTraverse(m5);
}

function test6() {
  console.log("\nMatrix input 6");
  advanceLogMatrix(m6);
  matrixBlackHoleTraverse(m6);
}

function test7() {
  console.log("\nMatrix input 7");
  advanceLogMatrix(m7);
  matrixBlackHoleTraverse(m7);
}

function test8() {
  console.log("\nMatrix input 8");
  advanceLogMatrix(m8);
  matrixBlackHoleTraverse(m8);
}

{
  // test();
  console.log(
    bringIncreasinglyElementToTheIncreasinglyIndexAscendingOrderSort([
      1, 3, 5, 2, 4, 9, 8, 7, 6,
    ])
  );
}
