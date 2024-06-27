# Updates

Coming back to this after a few weeks of a baby that won't nap and a lot of family in town. I'm going to write my proposed changelist here to help me structure my approach to changes/edits, make those changes, push a new iteration, then follow up here and let you know when ready for final review.

## **Comments**

After a couple weeks of not looking at the code, the comments are bothering me and interrupting review. I'm going to trim them down pretty significantly.

### **Todos**

- [X] Revise comments - shorter, inline, and more descriptive.

- [x] Revise variable names - no short names outside of loops with `i`, descriptive and deleted where possible.
- [x] Unicode parsing of constructor arg (text/plaintext) - remove unicode parsing and replace with simple, non-unicode regex.
- [x] `encipher()`
  - [x] Lines 30-34 -> Remove checks for `string.length` 0 & 1. Algo should work without them.
  - [x] Lines 40-47 -> revise for readability per feedback. Might have to change initial values to 0.
  - [x] Line 54     -> Plaintext array conversion is unnecessary given that JS handles strings the same as arrays.
  - [x] Lines 76-79 -> Simplify loop. Remove unnecessary variable `chunk`.
