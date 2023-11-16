import { functions } from "./functions";
import operators from "./operators";

interface PostfixResult {
  result: number;
  operations: string[];
}

export default function solvePostfix(
  infix: string[],
  x: number | undefined = undefined
): PostfixResult {
  const stack: number[] = [];
  const operations: string[] = [];

  for (const token of infix) {
    if (token === "x") {
      if (x !== undefined) {
        stack.push(x);
      } else {
        throw new Error("Value of variable 'x' not specified");
      }
    } else if (token === "e") {
      stack.push(Math.E);
    } else if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else if (token in functions) {
      const a = stack.pop();
      if (a !== undefined) {
        stack.push(functions[token].operation(a));
        operations.push(token + "(" + a + ") = " + stack[stack.length - 1]);
      } else {
        throw new Error("Missing arguments for function: " + token);
      }
    } 
    else if (token === '!'){
      const a = stack.pop();
      if (a !== undefined) {
        stack.push(operators[token].operation(a));
        operations.push(a + "*-1 = " + stack[stack.length - 1]);
      } else {
        throw new Error("Missing arguments for operator: " + token);
      }
    }
    else if (token in operators) {
      const b = stack.pop();
      const a = stack.pop();

      if (a !== undefined && b !== undefined) {
        stack.push(operators[token].operation(a, b));
        operations.push(a + token + b + " = " + stack[stack.length - 1]);
      } else {
        throw new Error("Missing arguments for operator: " + token);
      }
    } else {
      throw new Error("Unknown token: " + token);
    }
  }

  if (stack.length > 1) {
    throw new Error("Missing operators");
  }

  return { result: stack.pop() as number, operations };
}
