/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  Check out my solutions: https://exercism.org/profiles/Nostromos
 */

/**
 * Normally I'd build linked list nodes with getters and setters to help with
 * parsing but for the purposes of this exercise, I skipped that. 
 * 
 * The only 'extra' in this exercise is my `constructList()` function. This
 * handles two conditions from the tests:
 * 1. A list is initialized with no input (empty list) and...
 * 2. A list is initialized with an array of values.
 * 
 * I've done this before so I remember how to reverse, but if you're learning
 * and want a great writeup on how to approach this, I urge you to check out
 * Sergey Piterman's writeup here: https://medium.com/outco/reversing-a-linked-list-easy-as-1-2-3-560fbffe2088
 * 
 * Drawing diagrams is useful when thinking about list operations!
 */
export class Element {
  constructor(input) {
    this.value = input;
    this.next = null;
  }
}

export class List {
  constructor(input = undefined) {
    this.length = 0;
    this.head = null
    this.constructList(input);
  }

  constructList(input) {
    if (input === undefined) {
      return;
    } else {
      for (let value of input) {
        let node = new Element(value);
        this.add(node);
      }
    }
  }

  add(node) {
    this.length++;
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }

  toArray() {
    const listArray = [];
    let pointer = this.head;

    while (pointer !== null) {
      listArray.push(pointer.value);
      pointer = pointer.next;
    }

    return listArray;
  }

  reverse() {
    let previous = null;
    let current = this.head;
    let next = this.head;

    while (current !== null) {
      next = next.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    this.head = previous;
    return this;
  }
}
