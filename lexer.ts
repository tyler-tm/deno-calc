import { TokenNode, TokenType } from "./types.ts";
import { isNumber, isOperator, isParen, tokenNode } from "./helpers.ts";

// deno-fmt-ignore
const toTokenType = (tokenValue: string): TokenType | null =>
  isNumber(tokenValue)   ? TokenType.NUMBER   :
  isOperator(tokenValue) ? TokenType.OPERATOR :
  isParen(tokenValue)    ? TokenType.PAREN    :
  null;

export const tokenize = (input: string): TokenNode => {
  let currentNode: TokenNode = tokenNode();
  const head = currentNode;
  for (let i = 0; i < input.length; i++) {
    let tokenValue = input.charAt(i);
    if (tokenValue.localeCompare(" ") === 0) {
      continue;
    }
    const tokenType = toTokenType(tokenValue);
    if (tokenType === null) {
      console.error(`Invalid character: ${tokenValue}`);
      throw "Invalid input character";
    }
    while (
      tokenType === TokenType.NUMBER &&
      toTokenType(input.charAt(i + 1)) === TokenType.NUMBER
    ) {
      tokenValue += input.charAt(++i);
    }
    currentNode.type = tokenType;
    currentNode.value = tokenValue;
    if (i < input.length - 1) {
      const newNode = tokenNode();
      currentNode.next = newNode;
      currentNode = newNode;
    }
  }
  return head;
};
