/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  Check out my solutions: https://exercism.org/profiles/Nostromos
 */

let LETTERS = [...'abcdefghijklmnopqrstuvwxyz'];

export class Cipher {
  constructor(input = undefined) {
    this.key = input;
    this.shift;
    this.generateKey();
  }

  generateKey() {
    if (!this.key) {
      const shift = Math.floor(Math.random() * (25 - 0 + 1) + 0);
      const key = LETTERS[shift].repeat(10);
      let shiftArray = [];
      for (let x = 10; x > 0; x--) {
        shiftArray.push(shift);
      }
      this.shift = shiftArray;
      this.key = key;
    } else {
      let subShift = [];
      let keyArray = this.key.split('');

      for (let i = 0; i < keyArray.length; i++) {
        subShift.push(LETTERS.indexOf(keyArray[i]));
      }

      this.shift = subShift;
    }
  }

  // encode(text) {
  //   const plainTextArray = text.toLowerCase().split('');
  //   let result = '';

  //   for (let indexOfPlainText = 0, encodeShiftIndex = 0;
  //     indexOfPlainText < plainTextArray.length;
  //     indexOfPlainText++, encodeShiftIndex++) {
  //     // Check if the encode index has gone undef
  //     if (this.shift[encodeShiftIndex] === undefined) {
  //       encodeShiftIndex = 0;
  //     }

  //     const plainLetter = plainTextArray[indexOfPlainText];
  //     const encodedIndex = LETTERS.indexOf(plainLetter) + this.shift[encodeShiftIndex];
  //     const encodedLetter = encodedIndex > 25 ? LETTERS[encodedIndex - 26]
  //     }
  // }

  encode(plainText) {
    const plainTextArray = plainText.toLowerCase().split('');
    let result = '';

    // console.log(`This key: `, this.key);
    console.log('This shift: ', this.shift);
    // console.log('This plaintext: ', plainText);

    for (let indexOfPlainText = 0, shiftIndex = 0; indexOfPlainText < plainTextArray.length; indexOfPlainText++, shiftIndex++) {
      if (this.shift[shiftIndex] === undefined) {
        shiftIndex = 0;
      }

      const plainLetter = plainTextArray[indexOfPlainText];
      const encodedIndex = LETTERS.indexOf(plainLetter) + this.shift[shiftIndex];
      console.log('Plain Letter: ', plainLetter);
      console.log('Plain letter index: ', LETTERS.indexOf(plainLetter));
      console.log('Shifted letter index: ', this.shift[shiftIndex])
      console.log('Shifted Letter: ', LETTERS[shiftIndex])

      const encodedLetter = encodedIndex > 25 ? LETTERS[encodedIndex - 25] : LETTERS[encodedIndex];

      result += encodedLetter;
    }
    console.log(`Encoded ${plainText} to ${result}`);
    return result;
  }

  // decode(cipherText) {
  //   const cipherTextArray = cipherText.toLowerCase().split('');
  //   let result = '';

  //   for (let indexOfCipherText = 0, shiftIndex = 0; indexOfCipherText < cipherTextArray.length; indexOfCipherText++, shiftIndex++) {
  //     if (this.shift[shiftIndex] === undefined) {
  //       shiftIndex = 0;
  //     }

  //     const cipherLetter = cipherTextArray[indexOfCipherText];
  //     const decodedIndex = LETTERS.indexOf(cipherLetter) - this.shift[shiftIndex];

  //     const decodedLetter = decodedIndex < 0 ? LETTERS[decodedIndex + 26] : LETTERS[decodedIndex];

  //     result += decodedLetter;
  //   }
  //   console.log(`Decoded ${cipherText} to ${result}`)
  //   return result;
  // }
}
