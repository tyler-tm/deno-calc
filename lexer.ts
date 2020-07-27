import reduce from "https://deno.land/x/denofun/reduce.ts";
import split from "https://deno.land/x/denofun/split.ts";
import curry from "https://deno.land/x/denofun/curry.ts";
import compose from "https://deno.land/x/denofun/compose.ts";
import { TokenNode, TokenType } from "./types.ts";
import {
  isNumber,
  isOperator,
  isParen,
  tokenNode,
  tail,
  isSpace,
} from "./helpers.ts";

// deno-fmt-ignore
const toTokenType = (tokenValue: string): TokenType | null =>
  isNumber(tokenValue)   ? TokenType.NUMBER   :
  isOperator(tokenValue) ? TokenType.OPERATOR :
  isParen(tokenValue)    ? TokenType.PAREN    :
  null;

const appendToken = (
  head: TokenNode | null,
  inputChar: string,
): TokenNode | null => {
  if (isSpace(inputChar)) {
    return head;
  }
  const previousNode = tail(head);
  const tokenType = toTokenType(inputChar);
  if (tokenType === null) {
    console.error(`Invalid character: ${inputChar}`);
    throw "Invalid input character";
  }
  if (
    tokenType === TokenType.NUMBER && previousNode &&
    previousNode.type === TokenType.NUMBER
  ) {
    previousNode.value += inputChar;
    return head;
  }
  const newNode = tokenNode(tokenType, inputChar);
  if (previousNode === null) {
    return newNode;
  }
  previousNode.next = newNode;
  return head;
};

const toTokenList: (_: string[]) => TokenNode = curry(reduce)(
  appendToken,
  null,
);

const toCharacterArray: (_: string) => string[] = curry(split)("");

export const tokenize: (_: string) => TokenNode | null = compose(
  toTokenList,
  toCharacterArray,
);
