interface Operator {
  [key: string]: {
    operation: (a: number, b?: number) => number;
    precedence: number;
    leftAssociativity: boolean;
  };
}

export const operators: Operator = {
  "+": {
    operation: (a, b) => a + b!,
    precedence: 0,
    leftAssociativity: true,
  },
  "-": {
    operation: (a, b) => a - b!,
    precedence: 0,
    leftAssociativity: true,
  },
  "*": {
    operation: (a, b) => a * b!,
    precedence: 1,
    leftAssociativity: true,
  },
  "/": {
    operation: (a, b) => a / b!,
    precedence: 1,
    leftAssociativity: true,
  },
  "!": {
    operation: (a)=> a*-1,
    precedence: 1,
    leftAssociativity: true
  },
  "^": {
    operation: (a, b) => Math.pow(a, b!),
    precedence: 2,
    leftAssociativity: false,
  },
  
};

export default operators;
