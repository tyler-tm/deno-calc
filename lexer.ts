import { TokenNode, TokenType } from "./types.ts";
import { isNumber, isOperator, isParen, tokenNode } from "./helpers.ts";

// deno-fmt-ignore
const toTokenType = (tokenValue: string): TokenType | null =>
  isNumber(tokenValue)   ? TokenType.NUMBER   :
  isOperator(tokenValue) ? TokenType.OPERATOR :
  isParen(tokenValue)    ? TokenType.PAREN    :
  null;

const appendToken = (
  previousAndHead: [TokenNode | null, TokenNode | null],
  inputChar: string,
): [TokenNode | null, TokenNode | null] => {
  const [previousNode, headNode] = previousAndHead;
  if (inputChar.localeCompare(" ") === 0) {
    return [previousNode, headNode];
  }
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
    return [previousNode, headNode];
  }
  const newNode = { type: tokenType, value: inputChar, next: null };
  if (previousNode === null) {
    return [newNode, newNode];
  } else {
    previousNode.next = newNode;
    return [newNode, headNode];
  }
};

export const tokenize = (input: string): TokenNode | null => {
  const inputArray = input.split("");
  let currentNode: TokenNode | null = null;
  const [_, head] = inputArray.reduce(
    appendToken,
    [currentNode, currentNode],
  );
  return head;
};
