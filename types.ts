export enum TokenType {
  NUMBER = "NUMBER",
  OPERATOR = "OPERATOR",
  PAREN = "PAREN",
}

export type TokenNode = {
  type: TokenType;
  value: string;
  next: TokenNode | null;
};

export type AstNode = {
  value: string;
  operandA: AstNode | null;
  operandB: AstNode | null;
};
