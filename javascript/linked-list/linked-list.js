/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  For more of my solutions, check out my profile: https://exercism.org/profiles/Nostromos
 */

/**
 * Linked List operations are easier with a Node class 
 * that provides us with getters & setters, so lets create one.
 */
class Node {
  constructor(data) { // Takes a `data`...
    this.data = data; // And saves it along with...
    this.next = null; // A reference to the next node...
    this.prev = null; // And a reference to the previous node.
  }

  /* Lets create two methods for dealing with next nodes... */
  setNextNode(node) { 
    // We make sure its a node or null...
    if (node instanceof Node || node === null) { 
      this.next = node;
    } else { // And we throw an error if its not.
      throw new Error('Next node must be a member of the Node class');
    }
  }

  getNextNode() {
    return this.next;
  }

  /* And two methods for dealing with previous nodes... */
  setPreviousNode(node) {
    if (node instanceof Node || node === null) {
      this.prev = node;
    } else {
      throw new Error('Previous node must be a member of the Node class');
    }
  }

  getPreviousNode() {
    return this.prev;
  }
};

/* Now that we have our Node class, let's work on the doubly 
linked list... */
export class LinkedList {
  constructor() {
    // We save a ref to the head (start of list)...
    this.head = null; 
    // And a ref to the tail (end of list).
    this.tail = null; 
  }

  /* For pushing data, we want to add to the end and we don't 
  want to have to traverse the whole list to find the end. 
  Thankfully we saved our tail, so we can start there. */
  push(data) {
    // Create a new node and give it the data
    const newTail = new Node(data); 
    // And we save a ref to our tail.
    const currentTail = this.tail; 

    if (currentTail) { // Check tail exists (list isn't empty)
      // For our current tail, we set new node as next...
      currentTail.setNextNode(newTail); 
      // For new node, we set old tail as its previous.
      newTail.setPreviousNode(currentTail); 
    }

    this.tail = newTail; // Then update list with the new tail.

    // Lastly, we ensure that if list was empty, update head. 
    if (!this.head) { 
      this.head = newTail;
    }
  }

  /* Popping data is removing from the end of the list. `this.
  tail` helps us with this. */
  pop() {
    const removedTail = this.tail; // Get our tail..
  
    if (!removedTail) { //...and see if null. 
      return; // If it is, we return nothing.
    }

    // Get prev node and make that tail. 
    this.tail = removedTail.getPreviousNode(); 
    if (this.tail) { 
      // Since end of the list, we set next node to null.
      this.tail.setNextNode(null); 
    }

    // If our list had one item (that we just removed)...
    if (removedTail === this.head) { 
      this.head = null; // ...we make sure the head is null.
    }

    return removedTail.data; // We return the data.
  }

  /* Shifting is the same as pop except we use the head and 
  update Node (previous) and LinkedList (head, tail) 
  properties accordingly. */
  shift() {
    const removedHead = this.head;

    if (!removedHead) {
      return;
    }

    this.head = removedHead.getNextNode();
    if (this.head) {
      this.head.setPreviousNode(null);
    }

    if (removedHead === this.tail) {
      this.tail = null;
    }
    return removedHead.data;
  }

  /* Unshifting is very similar to pushing, just in a different direction. */
  unshift(data) {
    const newHead = new Node(data);
    const currentHead = this.head;

    if (currentHead) {
      currentHead.setPreviousNode(newHead);
      newHead.setNextNode(currentHead);
    }

    this.head = newHead;

    if (!this.tail) {
      this.tail = newHead;
    }
  }

  /* Deleting is where it gets a bit tricky. The first part of 
  this is really about traversing a list. If this were an 
  array, we could use a native JS method to find the right 
  node, but we don't want to use an array for this. If the 
  list had millions of items, we'd have big memory problems to 
  deal with. Here's my approach using a single pointer... */
  delete(data) {
    // (At beginning of list) Check if a head...
    if (!this.head) {
      return; // if not, return nothing
    }

    /* If it exists, we create a pointer, which is really just 
    a variable to hold our current node. */
    let pointer = this.head; 

    /* Then we iterate over the list using a `while` loop, 
    that runs as long as pointer isn't null. */
    while (pointer) {
      /* First we check if the current Node (pointer) has data 
      that matches what we're looking for. If it does match, 
      we break out of the loop. */
      if (pointer.data === data) { 
        break;
      } else {
        /* If it doesn't match, we set pointer to the next 
        node and continue to loop until we've found the data 
        or pointer is null (ie. we reach the end of the list) */
        pointer = pointer.getNextNode();
      }
    }
    
    /* One way or another, we've finished looping. Now we 
    check our pointer - If it is not null, we know we've found 
    our data. If it *is* null, the function doesn't enter the 
    `if` block and ends. */
    if (pointer) { 
      // We get the nodes before (`prevNode`)...
      const prevNode = pointer.getPreviousNode(); 
      // ...and after (`nextNode`).
      const nextNode = pointer.getNextNode(); 

      console.log(prevNode);
      console.log(nextNode);

      if (!prevNode) { // If no prev node, this is start...
        this.head = nextNode; // ... so set head
      } else { // If there is prev node, 
        /* we update its reference to next node, ensuring that 
        it isn't pointing at the one we're deleting. */
        prevNode.setNextNode(nextNode);
      }
      
      /* Similar to the last `if/else` block, If its null, we 
      know we're at the end of the list so we update 
      references accordingly. */
      if (!nextNode) { 
        this.tail = prevNode;
      } else { // If not null, we're not at the end...
        nextNode.setPreviousNode(prevNode); // ...so update.
      }
      // Finally return data for the node we orphaned!
      return pointer.data;
    }
  }

  /* We're gonna traverse the list and increment a count each 
  loop then return count at the end. */
  count() {
    let count = 0;
    let pointer = this.head;

    if (!this.head) { // If no head, list is empty so...
      return count; // ...return count (should be zero)
    }
    /* Otherwise, set up loop while pointer exists (not 
      null)... */
    while (pointer) { 
      count++; // Increment count each loop...
      pointer = pointer.getNextNode(); // move pointer forward.
    }

    return count; // Then return the count.
  }
}
