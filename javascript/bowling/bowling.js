//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {
  constructor() {
    this.frame = [];
    this.game = [];
    this.rolls = [];
  }
  roll(pins) {
    //console.log(`Roll: ${pins} / Count: ${this.rolls.length}`)
    //console.log(this.rolls);
    this.rolls.push(pins);
  }

  processRolls(rolls) {
    for (let roll = 0; roll < rolls.length; roll++) {
      if (this.game.length >= 9) {
        this.game.push(rolls.slice(roll));
        roll += 2;
      } else {
        if (rolls[roll] === 10) {
          this.game.push([10]);
        } else if (rolls[roll] !== 10) {
          this.game.push([rolls[roll], rolls[roll + 1]])
          roll++;
        }
      }
    }

    if (this.game[10].length > 3) {
      console.log(`Took too many rolls in frame 10`)
    }
  }

  scoreFrame(frame, game) {
    const thisFrame = game[frame]
    const nextFrame = game[frame + 1]
    const twoFrames = game[frame + 2]

    const isStrike = thisFrame === [10] ? true : false;
    const isSpare = thisFrame[0] + thisFrame[1] === 10 ? true : false;
    const isFinal = thisFrame === 10 ? true : false;
    const isNinth = thisFrame === 9 ? true : false;

    if (frame < 9) {
      if (thisFrame === [10] && nextFrame === [10]) {
        return 20 + twoFrames[0];
      } else if (thisFrame === [10] && nextFrame !== [10]) {
        return 10 + nextFrame[0] + nextFrame[1];
      } else if (thisFrame[0] + thisFrame[1] === 10) {
        return 10 + nextFrame[0];
      } else {
        return thisFrame[0] + thisFrame[1];
      }
    } else {
      if (frame === 9) {
        if (thisFrame === [10]) {
          return 10 + nextFrame[0] + nextFrame[1];
        } else if (thisFrame[0] + thisFrame[1] === 10) {
          return 10 + nextFrame[0];
        } else {
          return thisFrame[0] + thisFrame[1];
        }
      } else {

      }
    }


  }

  score() {
    this.processRolls(this.rolls);
    let total = 0;

    for (let frame = 0; frame < this.game.length; frame++) {
      const frameScore = this.scoreFrame(frame, this.game)
      total += frameScore;
      console.log(`Frame: ${frame + 1} > Score: ${frameScore} > Total: ${total}`)
    }

    return total;
  }
}
``