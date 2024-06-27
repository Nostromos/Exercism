# Pascal's Triangle

Welcome to Pascal's Triangle on Exercism's JavaScript Track.
If you need help running the tests or submitting your code, check out `HELP.md`.

## Instructions

Compute Pascal's triangle up to a given number of rows.

In Pascal's Triangle each number is computed by adding the numbers to the right and left of the current position in the previous row.

```text
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
# ... etc
```

1 ->   0: No Parents
11 ->  0: No Parents / 1: No Parents
121 -> 0: No Parents / 1: 0, 1 / 2: No Parents
1331 -> 0: No Parents / 1: 0, 1 / 2: 1, 2 / 3: No Parents
14641 -> 0: No Parents / 1: 0, 1 / 2: 1, 2 / 3: 2, 3 / 4: No Parents

## Source

### Created by

- @rchavarria

### Contributed to by

- @ankorGH
- @matthewmorgan
- @msomji
- @ovidiu141
- @ryanplusplus
- @SleeplessByte

### Based on

Pascal's Triangle at Wolfram Math World - https://www.wolframalpha.com/input/?i=Pascal%27s+triangle