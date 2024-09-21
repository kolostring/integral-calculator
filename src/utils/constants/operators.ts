import { TokenKind } from "./tokenKinds";

type OperatorInfo = {
  tokenID: number;
};

type BinaryArithmeticOperatorInfo = {
  operation: (a: number, b: number) => number;
} & OperatorInfo;

type UnaryArithmeticOperatorInfo = {
  operation: (a: number) => number;
} & OperatorInfo;

export const binaryArithmeticOperators: {
  [key: string]: BinaryArithmeticOperatorInfo;
} = {
  "+": {
    operation: (a, b) => a + b,
    tokenID: TokenKind.PLUS,
  },
  "-": {
    operation: (a, b) => a - b,
    tokenID: TokenKind.MINUS,
  },
  "*": {
    operation: (a, b) => a * b,
    tokenID: TokenKind.MUL,
  },
  "/": {
    operation: (a, b) => a / b,
    tokenID: TokenKind.DIV,
  },
  "**": {
    operation: (a, b) => Math.pow(a, b),
    tokenID: TokenKind.POWER,
  },
};

export const unaryArithmeticOperators: {
  [key: string]: UnaryArithmeticOperatorInfo;
} = {
  "+": {
    operation: (a) => a,
    tokenID: TokenKind.PLUS,
  },
  "-": {
    operation: (a) => a * -1,
    tokenID: TokenKind.MINUS,
  },
};

export const langOperators: {
  [key: string]: OperatorInfo;
} = {
  "(": {
    tokenID: TokenKind.L_PARENTHESIS,
  },
  ")": {
    tokenID: TokenKind.R_PARENTHESIS,
  },
  ",": {
    tokenID: TokenKind.COMMA,
  },
};

export const operators = {
  ...binaryArithmeticOperators,
  ...unaryArithmeticOperators,
  ...langOperators,
}
