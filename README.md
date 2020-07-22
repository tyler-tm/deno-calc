# deno-calc

A string-parsing calculator running on Deno, using [Djikstra's Shunting-Yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) to generate an abstract syntax tree from a singly-linked list of tokens, and a postorder depth-first traversal to calculate the final result.

## Example usage
```
- deno run calculator.ts "2+2"
 4
- deno run calculator.ts "(5*(7+2))+1-3"
 43
```
