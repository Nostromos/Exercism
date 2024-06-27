export const commands = (num) => {
  let seq = Array.from(num.toString(2));
  let s = [];
  
  for (let i = 0, l = seq.length; i < l; i++) {
    let action = seq.pop();

    if (Number(action) === 1) {
      switch (i) {
        case 0:
          s.push('wink');
          break;
        case 1:
          s.push('double blink');
          break;
        case 2:
          s.push('close your eyes');
          break;
        case 3:
          s.push('jump');
          break;
        case 4:
          s.reverse();
          break;
      }
    }
  }

  return s;
};
