type MathFunction = {
  [key: string]: {
    operation: (a: number) => number;
  };
}

export const functions: MathFunction = {
  sin: {
    operation: (a) => Math.sin(a),
  },
  cos: {
    operation: (a) => Math.cos(a),
  },
  tan: {
    operation: (a) => Math.tan(a),
  },
  sqrt: {
    operation: (a) => Math.sqrt(a),
  },
  ln: {
    operation: (a) => Math.log(a),
  },
};
