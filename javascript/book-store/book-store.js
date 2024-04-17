/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  For more of my solutions, check out my profile: https://exercism.org/profiles/Nostromos
 */

const DISCOUNTS = {
  1: {
    rate: 0,
    total: 800,
    discount: 0,
    final: 800
  },
  2: {
    rate: 0.05,
    total: 1600,
    discount: 80,
    final: 1520,
  },
  3: {
    rate: 0.1,
    total: 2400,
    discount: 240,
    final: 2160,
  },
  4: {
    rate: 0.2,
    total: 3200,
    discount: 640,
    final: 2560,
  },
  5: {
    rate: 0.25,
    total: 4000,
    discount: 1000,
    final: 3000,
  }
};

function parseBasket(basket) {
  let frequency = [0, 0, 0, 0, 0];

  for (let book of basket) {
    frequency[book - 1]++;
  }

  return frequency;
}

const cost = (basket) => {
  let nonDiscountTotal = basket.length * DISCOUNTS[1].total;

  if (basket.length === 0) {
    return nonDiscountTotal;
  } else if (basket.length === 1) {
    nonDiscountTotal += 800;
    return nonDiscountTotal;
  }

  const freq = parseBasket(basket);

  /**
   * We use the length of the frequency array as the starting point. If its 5, we go through and subtract one from each index.
   * If the index is zero, we remove that index. Then we push the discount number to a discount total. Once we've emptied the array, we know thats a solution and we push that solution to the solutions array.
   */


  //[ 3, 3, 3, 2, 2 ]
  // for (let i = freq.length; i > 1; i--) {
  //   let currentDiscountTotal = 0;
  //   let iterationArray = [...freq]; // copying the freq array

  //   console.log(`Current length is ${iterationArray.length} and total is ${DISCOUNTS[iterationArray.length].total}`);
  //   currentDiscountTotal += DISCOUNTS[iterationArray.length].total;
    
  //   for (let index = 0; index <= iterationArray.length; index++) {
  //     if (iterationArray[index] !== 0) {
  //       iterationArray[index]--; // If its not zero, we decrement it
  //     } else {
  //       iterationArray.splice(index, 1); // If it is 0, we splice it
  //     }
  //   }
    
  //   possibleSolutions.push(currentDiscountTotal);
  // }

  // let iterationArray = [...freq];
  // let currentDiscount = 0;
  // for (let i = freq.length; i > 1; i--) {
  //   /**
  //    * Add the discount
  //    */
  //   currentDiscount += DISCOUNTS[i].total;
    
  //   /**
  //    * Decrement the index
  //    */
  //   if (i === freq.length) { // if i = length, subtract 1 from all
  //     iterationArray.forEach((item) => item--);
  //   } else {
  //     for (let decrementIndex = 0; decrementIndex <= i; decrementIndex++){
  //       iterationArray[decrementIndex]--;
  //     }
  //     iterationArray = iterationArray.filter((item) => item > 0);
  //   }
  // }

  const possibleSolutions = [];
  for (let i = freq.length; i >= 2; i--) {
    console.log(`\n\nLooking for discounts for ${i} books...\n\n`)
    let iterationArray = [...freq];
    console.log('Our freq array: ', iterationArray)
    let currentDiscount = 0;

    for (let startingDiscount = i; startingDiscount > 0; startingDiscount--) {
      if (startingDiscount <= iterationArray.length) {
        console.log(`Found a discount for ${startingDiscount} books - ${DISCOUNTS[startingDiscount].total}`)
        currentDiscount += DISCOUNTS[startingDiscount].total;
        console.log(`Added to current total: ${currentDiscount}`)

        console.log(`Cleaning up array...`)
        console.log(iterationArray)
        for (let numberToDecrement = startingDiscount, decrementIndex = 0; decrementIndex < numberToDecrement; decrementIndex++) {
          iterationArray[decrementIndex]--
        }

        const filteredArray = iterationArray.filter((n) => n > 0);
        iterationArray = filteredArray;
        console.log(`Array cleaned.`)
        console.log(iterationArray)
      }
    }
    possibleSolutions.push(currentDiscount);
  }
  

  /**
   * After we've figured out how to get all possible solutions, we parse the solutions array for the cheapest one, then we return that.
   */
  console.log(possibleSolutions)
  possibleSolutions.sort((a, b) => a - b);
  console.log(possibleSolutions)

  return possibleSolutions[0];
};

const basket = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3];
//[ 3, 3, 3, 2, 2 ]
cost(basket);