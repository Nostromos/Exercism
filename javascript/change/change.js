export class Change {
  calculate(coinArray, target) {
    /**
     * Test Inputs
     */
    if (target === 0) return []; 
    if (target < 0) throw new Error("Negative totals are not allowed.");
    if (coinArray[0] > target) throw new Error(`The total ${target} cannot be represented in the given currency.`);
    
    
    /**
     *  Make the table
     */
    let solutions = new Array(coinArray.length)
      .fill(null)
      .map(() => new Array(target + 1).fill(Infinity));
    
    for (let r = 0; r < coinArray.length;  r++) {
      for (let c = 0; c < target + 1; c++) {
        if (c === 0) {
          solutions[r][c] = 0;
        } else {
          if (coinArray[r] === c) {
            solutions[r][c] = 1;
          } else if (coinArray[r] > c) {
            solutions[r][c] = r > 0 ? solutions[r - 1][c] : Infinity;
          } else {
            if (r === 0) {
              solutions[r][c] = 1 + solutions[r][c - coinArray[r]];
            } else {
              solutions[r][c] = Math.min(solutions[r - 1][c], 1 + solutions[r][c - coinArray[r]]);
            }
          }
        }
      }
    }

    let possible = [];
    solutions.forEach(row => possible.push(row[target]));
    if (possible.every(value => value === Infinity)) throw new Error(`The total ${target} cannot be represented in the given currency.`);

    // for (let r = 0, c = 0, count = (coinArray.length) * (target + 1); count > 0; count--) {
    //   let dr = coinArray[r];
    //   if (dr === 0 || c === 0) {
    //     solutions[r][c] = 0;
    //   } else {
    //     if (dr === c) {
    //       solutions[r][c] = 1;
    //     } else if (dr > c) {
    //       solutions[r][c] = solutions[r - 1][c];
    //     } else {
    //       let a;
    //       if (r - 1 >= 0) {
    //         a = solutions[r - 1][c];
    //       } else {
    //         a = 100;
    //       }
    //       let b = solutions[r][c - coinArray[r]] + 1; // T[r][c - D[r]] + 1
    //       if (a <= 0 || typeof a === "undefined") {
    //         solutions[r][c] = b;
    //       } else {
    //         solutions[r][c] = Math.min(a, b);
    //       }
    //     }
    //   }
    //   if (r === coinArray.length - 1) {
    //     // hit end of row
    //     r = 0;
    //     c++;
    //   } else {
    //     r++;
    //   }
    // }

    function collect() {
      sum += coinArray[row];
      collected.unshift[coinArray[row]];
      column -= coinArray[row];
    }
    
    /**
     * Now walk through the table
     */
    let sum = 0;
    let collected = [];
    let row = coinArray.length - 1;
    let column = target;
    
    while (sum !== target) {
      // 1. If T[r][c] === T[r - 1][c] then recurse on T[r - 1][c]. If its the top of the column see #2
      // 2. Else, we used a coin from this denomination to get to T[r][c], so collect and recurse on T[r][c - D[r]];
      // 3. Return full solution when T[r][c] === 0 OR if no solution is possible, throw an error or return empty array.
      let current = solutions[row][column];

      // if (row === 0 && column > 0 && current > 0) {
      //   collect();
      // } else if (column === 0) {
      //   throw new Error(`The total ${target} cannot be represented in the given currency.`)
      // } else {
      //   let above = solutions[row - 1][column];
      //   if (current === above) {
      //     row--;
      //   } else {
      //     row = coinArray.length - 1;
      //     column--;
      //   }
      // }


      // console.log(row, column);
      let above = row < 0 ? solutions[coinArray.length - 1][column - 1] : solutions[row - 1][column];

      if (current === above) {
        if (row > 0) {
          row--;
        } else {
          row = coinArray.length - 1;
          column--;
        }
      } else if (row === 0 && solutions[row][column] > 0) {
        sum += coinArray[row];
        collected.unshift(coinArray[row])
        column -= coinArray[row]
      } else if (above !== 0) {
        sum += coinArray[row];
        collected.unshift(coinArray[row]);
        column -= coinArray[row];
      } else if (column === 0) {
        throw new Error(`The total ${target} cannot be represented in the given currency.`)
      } else {
        sum += coinArray[row];
        collected.unshift(coinArray[row]);
        break;
      }
    }
    return collected;
  }
}
