import { AstNode } from "./types.ts";
import { isOperator } from "./helpers.ts";

export const traverse = (node: AstNode): number =>
  isOperator(node.value) ? evaluateExpression(node) : parseInt(node.value);

const evaluateExpression = (node: AstNode): number => {
  if (!node.operandA || !node.operandB) {
    console.error(
      `Operator "${node.value}" in syntax tree without ${
        !node.operandA ? "left" : "right"
      } operand`,
    );
    throw "Invalid syntax tree";
  }
  const left = traverse(node.operandA);
  const right = traverse(node.operandB);
  switch (node.value) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    default:
      throw "Unsupported operator";
  }
};
