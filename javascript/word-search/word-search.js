class WordSearch {
  constructor(grid) {
    this.grid = grid;
  }

  find(searchArray) {
    console.log(`Start`)
    let answer = {};

    // We search word-by-word
    for (let word of searchArray) {
      console.log(`Search: ${word}`)
      let possibleStarts = [];

      // Search by line and letter
      for (let line = 0; line < this.grid.length; line++) {
        const currentLine = this.grid[line];
        for (let letter = 0; letter < currentLine.length; letter++) {
          const currentLetter = currentLine[letter];
          if (currentLetter === word[0]) {
            possibleStarts.push([line, letter])
          }
        }
      }

      // Search through possible starts
      for (let possible of possibleStarts) {
        const [ lineIndex, letterIndex ] = possible;
        const lineLength = this.grid[lineIndex].length;
        const gridLength = this.grid.length;

        const canLeftToRight = lineLength - letterIndex + 1 >= word.length ? true : false;
        const canRightToLeft = (lineLength + letterIndex + 1) - lineLength >= word.length ? true : false;
        const canTopToBottom = gridLength - lineIndex + 1 >= word.length ? true : false;
        const canBottomToTop = (gridLength + lineIndex + 1) - gridLength >= word.length ? true : false;
        const canTopLeftToBottomRight = canLeftToRight && canTopToBottom ? true : false;
        const canTopRightToBottomLeft = canRightToLeft && canTopToBottom ? true : false;
        const canBottomLeftToTopRight = canLeftToRight && canBottomToTop ? true : false;
        const canBottomRightToTopLeft = canRightToLeft && canBottomToTop ? true : false;
        
        if (canLeftToRight) {
          const leftToRight = this.grid[lineIndex].substring(letterIndex, letterIndex + word.length);
          
          if (leftToRight === word) {
            answer[word] = { 
              start: [lineIndex + 1, letterIndex + 1], 
              end: [lineIndex + 1, letterIndex + word.length] 
            };
          }    
        }  

        if (canRightToLeft) {
          const rightToLeft = this.grid[lineIndex].substring(letterIndex + 1, letterIndex - word.length).split('').reverse().join('');
          
          if (rightToLeft === word) {
            answer[word] = { 
              start: [lineIndex + 1, letterIndex + 1], 
              end: [lineIndex + 1, letterIndex - word.length + 2] 
            };
          }
        } 

        if (canTopToBottom) {
          const topToBottom = [];
          const indAnswer = {};
          
          for (let line = lineIndex, letter = letterIndex, letterCount = word.length; line < this.grid.length; line++, letterCount--) {
            if (letterCount === word.length) {
              indAnswer.start = [line + 1, letter + 1];
            } else if (letterCount === 1) {
              indAnswer.end = [line + 1, letter + 1];
            }

            topToBottom.push(this.grid[line][letterIndex]);
          }

          if (topToBottom.join('') === word) {
            answer[word] = { 
              start: [lineIndex + 1, letterIndex + 1], 
              end: [lineIndex + word.length, letterIndex + 1] 
            };
          }
        } 

        if (canBottomToTop) {
          const bottomToTop = [];
          const indAnswer = {};
          
          for (let line = lineIndex, letter = letterIndex, letterCount = word.length; letterCount > 0; line--, letterCount--) {
            if (letterCount === word.length) {
              indAnswer.start = [line + 1, letter + 1];
            } else if (letterCount === 1) {
              indAnswer.end = [line + 1, letter + 1];
            }

            bottomToTop.push(this.grid[line][letterIndex]);        
          }

          if (bottomToTop.join('') === word) {
            answer[word] = indAnswer;
          }
        }

        if (canTopLeftToBottomRight) {
          const topLeftToBottomRight = [];
          const indAnswer = {};
          
          for (let line = lineIndex, letter = letterIndex, letterCount = word.length; letterCount > 0 && line < this.grid.length; line++, letter++, letterCount--) {
            if (letterCount === word.length) {
              indAnswer.start = [line + 1, letter + 1];
            } else if (letterCount === 1) {
              indAnswer.end = [line + 1, letter + 1];
            }

            topLeftToBottomRight.push(this.grid[line][letter]);
          }

          if (topLeftToBottomRight.join('') === word) {
            answer[word] = indAnswer;
          }
        }

        if (canTopRightToBottomLeft) {
          const topRightToBottomLeft = [];
          const indAnswer = {};
          
          for (let line = lineIndex, letter = letterIndex, letterCount = word.length; letterCount > 0 && line < this.grid.length; line++, letter--, letterCount--) {
            if (letterCount === word.length) {
              indAnswer.start = [line + 1, letter + 1];
            } else if (letterCount === 1) {
              indAnswer.end = [line + 1, letter + 1];
            }

            topRightToBottomLeft.push(this.grid[line][letter]);
          }

          if (topRightToBottomLeft.join('') === word) {
            answer[word] = indAnswer;
          }
        }

        if (canBottomLeftToTopRight) {
          const bottomLeftToTopRight = [];
          const indAnswer = {};
          
          for (let line = lineIndex, letter = letterIndex, letterCount = word.length; letterCount > 0 && line > -1; line--, letter++, letterCount--) {
            if (letterCount === word.length) {
              indAnswer.start = [line + 1, letter + 1];
            } else if (letterCount === 1) {
              indAnswer.end = [line + 1, letter + 1];
            }

            bottomLeftToTopRight.push(this.grid[line][letter]);
          }

          if (bottomLeftToTopRight.join('') === word) {
            answer[word] = indAnswer;
          }
        }

        if (canBottomRightToTopLeft) {
          const bottomRightToTopLeft = [];
          const indAnswer = {};

          for (let line = lineIndex, letter = letterIndex, letterCount = word.length; letterCount > 0 && line > -1; line--, letter--, letterCount--) {
            if (letterCount === word.length) {
              indAnswer.start = [line + 1, letter + 1];
            } else if (letterCount === 1) {
              indAnswer.end = [line + 1, letter + 1];
            }

            bottomRightToTopLeft.push(this.grid[line][letter]);
          }

          if (bottomRightToTopLeft.join('') === word) {
            answer[word] = indAnswer;
          }
        }
      }
    }

    return answer;
  }
}

export default WordSearch;
