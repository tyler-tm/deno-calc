import { TokenNode, TokenType } from "./types.ts";
import { isNumber, isOperator, isParen, tokenNode } from "./helpers.ts";

const toTokenType = (c: string): TokenType | null => {
  if (isNumber(c)) return TokenType.NUMBER;
  else if (isOperator(c)) return TokenType.OPERATOR;
  else if (isParen(c)) return TokenType.PAREN;
  else return null;
};

export const tokenize = (input: string): TokenNode => {
  let currentNode: TokenNode = tokenNode();
  const head = currentNode;
  for (let i = 0; i < input.length; i++) {
    let c = input.charAt(i);
    if (c.localeCompare(" ") === 0) {
      continue;
    }
    const tokenType = toTokenType(c);
    if (tokenType === null) {
      console.error(`Invalid character: ${c}`);
      throw "Invalid input character";
    }
    if (tokenType === TokenType.NUMBER) {
      while (toTokenType(input.charAt(i + 1)) === TokenType.NUMBER) {
        i++;
        c += input.charAt(i);
      }
    }
    currentNode.type = tokenType;
    currentNode.value = c;
    if (i < input.length - 1) {
      const newNode = tokenNode();
      currentNode.next = newNode;
      currentNode = newNode;
    }
  }
  return head;
};
