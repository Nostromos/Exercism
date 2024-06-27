export const transform = (old) => {
  let newPoints = {};
  Object.entries(old).forEach((entry) => {
    entry[1].forEach((letter) => {
      newPoints[`${letter.toLowerCase()}`] = Number(entry[0]);
    });
  });
  return newPoints;
};

