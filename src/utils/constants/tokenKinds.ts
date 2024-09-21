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

export function isTokenLiteral(tokenKind: TokenKind){
  return tokenKind === TokenKind.NUMBER;
}

export function isTokenUnaryOperator(tokenKind: TokenKind){
  return tokenKind === TokenKind.PLUS || tokenKind === TokenKind.MINUS;
}

export function isTokenArithmeticOperator(tokenKind: TokenKind){
  return tokenKind === TokenKind.PLUS || tokenKind === TokenKind.MINUS || tokenKind === TokenKind.DIV || tokenKind === TokenKind.MUL || tokenKind === TokenKind.POWER;
}
