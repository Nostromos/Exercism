/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed...
 * 
 *  For more of my solutions, check out my profile: https://exercism.org/profiles/Nostromos
 */

const BASE_MAP = { // We use an Object hold our DNA to RNA base map.
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U'
}

export const toRna = (dna) => {
  return dna.length === 0 ? '' : // If the input is empty, return empty. Else....
    dna.split('') // We use `.split()` to turn the string into an array...
      .map((base) => BASE_MAP[base]) // We `.map()` over it and return the corresponding RNA base...
      .join(''); // Then we join it into a string and its returned.
};
