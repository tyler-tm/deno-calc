import { TokenNode, TokenType, AstNode } from "./types.ts";
import { toPrecedence, astNode, last } from "./helpers.ts";

const pushExpressionToOutputStack = (
  operatorStack: string[],
  outputStack: AstNode[],
): void => {
  const currentOperator = operatorStack.pop();
  const expressionB = outputStack.pop();
  const expressionA = outputStack.pop();
  if (currentOperator !== undefined) {
    outputStack.push(
      astNode(currentOperator, expressionA, expressionB),
    );
  }
};

/* 
*  Parses a linked list of tokens and outputs an AST, following Dijkstra's Shunting-Yard algorithm
*  https://en.wikipedia.org/wiki/Shunting-yard_algorithm
*/
export const parseList = (head: TokenNode | null): AstNode => {
  let currentTokenNode = head;
  const operatorStack: string[] = [];
  const outputStack: AstNode[] = [];
  while (currentTokenNode !== null) {
    switch (currentTokenNode.type) {
      case TokenType.NUMBER:
        outputStack.push(astNode(currentTokenNode.value));
        break;
      case TokenType.OPERATOR:
        while (
          toPrecedence(last(operatorStack)) >=
            toPrecedence(currentTokenNode.value)
        ) {
          pushExpressionToOutputStack(operatorStack, outputStack);
        }
        operatorStack.push(currentTokenNode.value);
        break;
      case TokenType.PAREN:
        if (
          currentTokenNode.value.localeCompare("(") === 0
        ) {
          operatorStack.push(currentTokenNode.value);
        } else if (
          currentTokenNode.value.localeCompare(")") === 0
        ) {
          while (last(operatorStack) !== "(") {
            pushExpressionToOutputStack(operatorStack, outputStack);
          }
          operatorStack.pop();
        }
        break;
    }
    currentTokenNode = currentTokenNode.next;
  }
  while (outputStack.length > 1) {
    pushExpressionToOutputStack(operatorStack, outputStack);
  }
  const result = outputStack.pop();
  if (!result) {
    throw "Invalid token set";
  }
  return result;
};
