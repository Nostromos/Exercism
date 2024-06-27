function generateAllNames() {
  const LETTERS = [..."XNZYRFJBMDWIUHOGVTESALQKPC"]; 
  const NUMBERS = [..."8150243697"];
  let allNames = new Array();

  LETTERS.forEach((a) => {
    LETTERS.forEach((b) => {
      NUMBERS.forEach((c) => {
        NUMBERS.forEach((d) => {
          NUMBERS.forEach((e) => {
            allNames.push([a, b, c, d, e].join(''))
          })
        })
      })
    })
  });

  return allNames;
}

let allTheNames = generateAllNames();

export class Robot {
  #name;

  constructor() {
    this.reset();
  }

  get name() {
    return this.#name;
  }

  assignName() {
    let randomIndex = Math.floor(Math.random() * (allTheNames.length));
    return allTheNames.splice(randomIndex, 1)[0];
  }

  reset() {
    this.#name = this.assignName();
  }

}

Robot.releaseNames = () => {
  allTheNames = generateAllNames();
};