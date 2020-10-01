import compose from "https://deno.land/x/denofun/compose.ts";
import { tokenize } from "./lexer.ts";
import { parseList } from "./parser.ts";
import { traverse } from "./traverser.ts";

export const calculate: (_: string) => number = compose(
  traverse,
  parseList,
  tokenize,
);

if (Deno.args.length > 0) {
  const input = Deno.args.join("");
  console.log(calculate(input));
}
