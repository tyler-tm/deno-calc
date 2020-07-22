import { TokenType, TokenNode, AstNode } from "./types.ts";

const OPERATORS: Map<string, number> = new Map(
  [["+", 1], ["-", 1], ["*", 2], ["/", 2]],
);

export const isNumber = (s: string): boolean => s >= "0" && s <= "9";

export const isOperator = (s: string): boolean => OPERATORS.has(s);

export const isParen = (s: string): boolean => s === "(" || s === ")";

export const toPrecedence = (op: string): number => OPERATORS.get(op) || -1;

export const last = <T>(arr: T[]): T => arr[arr.length - 1];

export const tokenNode = (
  type = TokenType.NUMBER,
  value = "",
  next = null,
): TokenNode => ({
  type,
  value,
  next,
});

export const astNode = (
  value: string,
  operandA: AstNode | null = null,
  operandB: AstNode | null = null,
): AstNode => ({
  value,
  operandA,
  operandB,
});
