export enum TokenKind {
  BOF,
  EOF,
  SYMBOL,
  L_PARENTHESIS,
  R_PARENTHESIS,
  COMMA,
  PLUS,
  MINUS,
  MUL,
  DIV,
  POWER,
  NUMBER,
}

export const tokenKindToString: Record<TokenKind, string> = {
  [TokenKind.BOF]: "BOF",
  [TokenKind.EOF]: "EOF",
  [TokenKind.SYMBOL]: "VARIABLE",
  [TokenKind.L_PARENTHESIS]: "(",
  [TokenKind.R_PARENTHESIS]: ")",
  [TokenKind.COMMA]: ",",
  [TokenKind.PLUS]: "+",
  [TokenKind.MINUS]: "-",
  [TokenKind.MUL]: "*",
  [TokenKind.DIV]: "/",
  [TokenKind.POWER]: "^",
  [TokenKind.NUMBER]: "NUMBER",
}

export function isTokenLiteral(tokenKind: TokenKind){
  return tokenKind === TokenKind.NUMBER;
}

export function isTokenUnaryOperator(tokenKind: TokenKind){
  return tokenKind === TokenKind.PLUS || tokenKind === TokenKind.MINUS;
}

export function isTokenArithmeticOperator(tokenKind: TokenKind){
  return tokenKind === TokenKind.PLUS || tokenKind === TokenKind.MINUS || tokenKind === TokenKind.DIV || tokenKind === TokenKind.MUL || tokenKind === TokenKind.POWER;
}
