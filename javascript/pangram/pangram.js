/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  For more of my solutions, check out my profile: https://exercism.org/profiles/Nostromos
 */

export const isPangram = (sentence) => {
  const normalized = sentence
    .toLowerCase()           // Make it all lowercase...
    .replace(/[^a-z]/g, ''); // ...and use regex to replace non-alphabetical characters with nothing (ie. remove them).

  /* The below loop starts with the unicode value for 'a' (97) and loops through the alphabet ending with 'z' (122). For each letter, we convert the unicode number to its letter (as a `String`) and check if the normalized sentence `.includes()` it.
  -> If it finds that a letter is *not* included, it immediately returns `false`. 
  -> If the loop completes, it means that every letter was present and we return `true`. */
  for (let unicodeNumber = 97; unicodeNumber <= 122; unicodeNumber++) {
    if (!normalized.includes(String.fromCharCode(unicodeNumber))) {
      return false;
    }
  }
  return true;
};
