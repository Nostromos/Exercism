/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  For my solutions, see my profile: https://exercism.org/profiles/Nostromos
 */

export class List {
  // Will take data but default to empty if not provided
  constructor(data = []) { 
    // Tests will look for a `values` property
    this.values = data; 
  }

  append(list) {
    /**
     * We want to handle edge cases first and an obvious one is empty
     * lists (we'll do this for all the functions). We check if `this` 
     * is empty - if it is, we set values of `this` to the values of 
     * `list` and return.
     */
    if (this.length() === 0) {
      this.values = list.values;
      return this;
    }

    // Since we can't use prototype methods, we just manually set values
    for (let i = 0, x = this.length(); i <= list.length() - 1; i++, x++) {
      this.values[x] = list.values[i]
    }

    return this;
  }

  concat(list) {
    if (list.length() === 0) { // Check if empty
      return this;

      /* Check if the first item is not a List */
    } else if (!(list.values[0] instanceof List)) {
      /* If it isn't, we assume its not a list of lists
      and just append the whole thing */
      this.append(list);
      return this;
    }

    // Otherwise we iterate through each item and append individually
    for (let i = 0; i <= list.length() - 1; i++) {
      if (list.values[i].length() !== 0) {
        this.append(list.values[i]);
      }
    }

    return this;
  }

  filter(func) {
    if (this.length() === 0) {
      return this;
    }

    let filtered = []; // Hold our true values
    // Iterate through each item...
    for (let i = 0, x = 0; i <= this.length() - 1; i++) {
      const outcome = func(this.values[i]); // Save the callback outcome
      if (outcome) {
        // if true, we set it to the filtered list
        // and increment x (the index where we add filtered items)
        filtered[x] = this.values[i];
        x++;
      }
    }
    this.values = filtered; // then update values with filtered list

    return this;
  }

  map(func) {
    if (this.length() === 0) {
      return this;
    }

    let mapped = [];
    for (let i = 0, x = 0; i <= this.length() - 1; i++, x++) {
      // Very similar to filter() except we just save each item
      mapped[x] = func(this.values[i]);
    }
    this.values = mapped;

    return this;
  }

  length() {
    let count = 0;
    // eslint-disable-next-line no-unused-vars
    for (let item of this.values) {
      count++;
    }
    return count;
  }

  foldl(func, init) {
    if (this.length() === 0) {
      return init;
    }

    let acc = init;
    // We start from index zero (the left)...
    for (let i = 0; i <= this.length() - 1; i++) {
      // And save the result to acc!
      acc = func(acc, this.values[i]);
    }

    return acc;
  }

  foldr(func, init) {
    if (this.length() === 0) {
      return init;
    }

    let acc = init;
    // This time, we start at the end and decrement...
    for (let i = this.length() - 1; i >= 0; i--) {
      acc = func(acc, this.values[i]);
    }

    return acc;
  }

  reverse() {
    if (this.length() === 0) {
      return this;
    }

    let reversed = [];
    for (let i = this.length() - 1, x = 0; i >= 0; i--, x++) {
      reversed[x] = this.values[i];
    }
    this.values = reversed;

    return this;
  }
}
