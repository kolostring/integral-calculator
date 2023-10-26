interface Operator {
  [key: string]: {
    operation: (a: number, b: number) => number;
    precedence: number;
  };
}

export const operators: Operator = {
  "+": {
    operation: (a, b) => a + b,
    precedence: 0,
  },
  "-": {
    operation: (a, b) => a - b,
    precedence: 0,
  },
  "*": {
    operation: (a, b) => a * b,
    precedence: 1,
  },
  "/": {
    operation: (a, b) => a / b,
    precedence: 1,
  },
};

export default operators;
