import { tokenize } from "./lexer.ts";
import { parseList } from "./parser.ts";
import { traverse } from "./traverser.ts";

const input = Deno.args.join(""); // join arguments to handle any spaces in input
const tokenHead = tokenize(input); // tokenize into a singly-linked list
const ast = parseList(tokenHead); // parse token list into an abstract syntax tree
const result = traverse(ast); // postorder traversal of AST to calculate result
console.log(result);
