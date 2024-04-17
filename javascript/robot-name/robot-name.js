/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed but I do my best and feedback is welcome.
 * 
 *  Check out my solutions: https://exercism.org/profiles/Nostromos
 */

let fleet = new Set()

function generateName() {
  const code = Math.floor(Math.random() * (1000 - 100) + 100);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 2; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result + code;
}

function setName() { 
  // console.log(`Setting a new name...`)
  let newName = generateName();
  // console.log(`Tentative new name is ${newName}`)
  if (fleet.size !== 0) {
    // console.log(`Fleet isn't empty`)
    while (fleet.has(newName) === true) {
      // console.log(`Fleet already has this name..`)
      newName = generateName();
    }
  } 
  fleet.add(newName);
  return newName;
}

export class Robot {
  constructor() {
    this.name = setName();
    Object.defineProperty(this, 'name', {
      writable: false
    })
  }


  reset() {
    const newName = setName();
    Object.defineProperty(this, 'name', {
      writable: true
    })
    fleet.delete(this.name);
    this.name = newName;
    Object.defineProperty(this, 'name', {
      writable: false
    })
    fleet.add(this.name);
  }
}

Robot.releaseNames = () => {
  fleet = new Set();
};
