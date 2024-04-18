/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  Check out my solutions: https://exercism.org/profiles/Nostromos
 */

/**
 * From the tests, we can see that this needs to handle two use cases: 
 * 
 * - Classic Caesar Cipher (with no key passed in) - Generating a random 
 *   number that shifts each character in a string by the same amount and...
 * - Substitution Cipher (with a key passed) - The passed key tells us how
 *   much to shift each character, and if the message is longer than the key, 
 *   we just reset the key counter and start over.
 * 
 * There are a few ways to approach this but once I realized my caesar cipher 
 * approach wouldn't work with the substitution cipher, I decided to build
 * a substitution cipher that also handles caesars.
 * 
 * There is definitely a cleaner and more efficient way to do this (probably 
 * with map or reduce) but I got hung up on an off-by-one index mistake for too 
 * long, so I'm submitting this.
 */

// Declare the allowed characters and use destructuring to make it an array
let LETTERS = [...'abcdefghijklmnopqrstuvwxyz'];

export class Cipher {
  constructor(input = undefined) { // if no input, key is undefined
    this.key = input; // if an input, thats the key
    this.shift; // we declare a `shift` variable, where we'll store an array that tells us how much to shift each position
    this.generateKey(); // we call this to process our key into a shift
  }

  generateKey() {
    if (!this.key) { // if there was no key passed, we do the below...
      // generate a random number between 0-25 (A-Z). I kept the zeros to
      // show how to calculate random max / min integer inclusive of max and min
      
      // Math.floor(Math.random() * (max - min + 1) + min);
      const shift = Math.floor(Math.random() * (25 - 0 + 1) + 0);

      // Since there's no key, we just repeat the random letter 10 times so 
      // the encode / decode functions work properly.
      const key = LETTERS[shift].repeat(10); 

      // And we declare an array to store our temporary shift array
      let shiftArray = []; 

      // Then we just add the random number 10 times
      for (let x = 10; x > 0; x--) {
        shiftArray.push(shift);
      }

      // And set our class variables.
      this.shift = shiftArray;
      this.key = key;
    } else { // If there is an input (key)...
      let subShift = []; // temp array to store it
      let keyArray = this.key.split(''); // split the key to make iteration easy

      // For each letter in key, we find the index of it in letters, which
      // tells us how much the shift is at that position. We try to stick to 
      // index values for the whole problem to make it easier.
      for (let i = 0; i < keyArray.length; i++) {
        subShift.push(LETTERS.indexOf(keyArray[i]));
      }

      this.shift = subShift; // set our shift
    }
  }

  encode(plainText) {
    const plainTextArray = plainText.split(''); // process our plain text
    let result = ''; // temp result var

    // iterate over our text and our shift arrays...
    for (let indexOfPlainText = 0, shiftIndex = 0; indexOfPlainText < plainTextArray.length; indexOfPlainText++, shiftIndex++) {
      // if we hit the end of our shift array, we go back to zero
      if (this.shift[shiftIndex] === undefined) {
        console.log(`Hit end of shift index - returning to beginning`)
        shiftIndex = 0;
      }

      // we get our plain letter...
      const plainLetter = plainTextArray[indexOfPlainText];
      // ...and its index! Then we just add the shift to it for its position.
      const encodedIndex = LETTERS.indexOf(plainLetter) + this.shift[shiftIndex];

      // If we end up with a shift index greater than the length of the alphabet,
      // we subtract 26 from it to get the right letter.
      const encodedLetter = encodedIndex > 25 ? LETTERS[encodedIndex - 26] : LETTERS[encodedIndex];

      result += encodedLetter; // and for each loop we append to result
    }

    return result; // then return it
  }

  decode(cipherText) { // very similar to encode except...
    const cipherTextArray = cipherText.split('');
    let result = '';

    for (let indexOfCipherText = 0, shiftIndex = 0; indexOfCipherText < cipherTextArray.length; indexOfCipherText++, shiftIndex++) {
      if (this.shift[shiftIndex] === undefined) {
        shiftIndex = 0;
      }

      const cipherLetter = cipherTextArray[indexOfCipherText];
      const decodedIndex = LETTERS.indexOf(cipherLetter) - this.shift[shiftIndex];

      // We check if our shift index is *less* than zero, and add 26 if true;
      const decodedLetter = decodedIndex < 0 ? LETTERS[decodedIndex + 26] : LETTERS[decodedIndex];

      result += decodedLetter;
    }

    return result;
  }
}
