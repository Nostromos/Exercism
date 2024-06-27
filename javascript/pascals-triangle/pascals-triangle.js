export const rows = (count) => {
  let triangle = [];
  let num = 0;

  while (num < count) {
    triangle.push(new Array(num + 1)
      .fill(null)
      .map((_, i) => {
        return i === 0 || i === num ? 1 :
          triangle[num - 1][i - 1] + triangle[num - 1][i];
      }));
    num++;
  }

  return triangle;
};
