/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  Check out my solutions: https://exercism.org/profiles/Nostromos
 */

export class Crypto {
  constructor(text = '') {
    /**
     * We clean the input using regex to remove punctuation and 
     * spaces, then we lowercase it. 
     * 
     * The regex does a few things:
     * 1. `\p{P}` matches any punctuation character
     * 2. `\s` matches any whitespace char
     * 3. `+` matches one or more of the preceding chars
     * 4. Lastly we have `gu` - G for global, which finds all 
     * matches instead of just returning the first.
     * 5. And `u`, which signifies that it should also match 
     * unicode properties
     */
    this.string = text.replace(/[\p{P}\s]+/gu, '').toLowerCase();
    this.ciphertext = this.encipher();
  }

  encipher() {
    // We handle two cases where we don't need to run code.
    if (this.string.length === 0) {
      return '';
    } else if (this.string.length === 1) {
      return this.string;
    }

    // Then we figure out the dimensions of our square.
    let rows = 1;
    let columns = 1;

    while (!(
      // We run the loop until all the rules aren't false!
      ((rows * columns) >= this.string.length) &&
      (columns >= rows) &&
      ((columns - rows) <= 1))) {
      // And each iteration just counts up!
      columns > rows ? rows++ : columns++;
    }

    
    const plaintext = this.string
      // We format our string with the right amount of white space
      .padEnd((rows * columns), ' ')
      // And we turn it into an array to make iteration easier
      .split('');
    const cipherArray = [];

    /**
     * Now we encipher our text! Starting with 0, we push 
     * every `column`th character until `cipherArray` is the same 
     * length as our original text. If index `i` is bigger than
     * the length of our text, we 'go back to the start' and add
     * one, to start the next row.
     */
    for (let i = 0; cipherArray.length < plaintext.length; i += columns) {
      if (i > plaintext.length - 1) {
        i = i - plaintext.length + 1;
      }
      cipherArray.push(plaintext[i]);
    }

    /**
     * Then we format our response and join it into a string and
     * that is returned.
     */
    const result = []
    for (let i = 0, ri = rows; i < cipherArray.length; i = ri, ri += rows) {
      const chunk = cipherArray.slice(i, ri).join('');
      result.push(chunk);
    }

    return result.join(' ');
  }
}
