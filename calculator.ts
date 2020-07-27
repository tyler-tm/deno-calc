import compose from "https://deno.land/x/denofun/compose.ts";
import { tokenize } from "./lexer.ts";
import { parseList } from "./parser.ts";
import { traverse } from "./traverser.ts";

const input = Deno.args.join("");

export const calculate: (input: string) => number = compose(
  traverse,
  parseList,
  tokenize,
);

console.log(calculate(input));
