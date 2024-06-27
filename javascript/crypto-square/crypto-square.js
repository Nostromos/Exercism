/**
 *  I assume we don't want to feed any random data into this and the class only works on itself. For each string you want to encipher, 
 *  you create a new instance of the class. 
 */

export class Crypto {
  constructor(text = '') {
    // Remove spaces, punctuation, and lowercase input
    this.string = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    this.ciphertext = this.encipher(); 
  }

  encipher() {
    // Figure out dimensions of square. Truncated square root saves a lot of work and gets us within 1 column or row value, then handles with if statements.
    let rows = Math.trunc(Math.sqrt(this.string.length)),
        columns = rows;
    if (rows * columns < this.string.length) ++columns;
    if (rows * columns < this.string.length) ++rows;

    
    const plaintext = this.string.padEnd((rows * columns), ' ') // Pad the string to reach proper length for square.
    const cipherArray = [];

    for (let i = 0; cipherArray.length < plaintext.length; i += columns) {
      if (i > plaintext.length - 1) {
        i = i - plaintext.length + 1;
      }
      cipherArray.push(plaintext[i]);
    }
    
    // Now format response and return
    const result = []
    for (let i = 0; i < cipherArray.length; i += rows) {
      result.push(cipherArray.slice(i, i + rows).join(''));
    }

    return result.join(' ');
  }
}
