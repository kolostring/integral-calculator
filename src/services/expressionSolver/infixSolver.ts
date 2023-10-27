import { functions } from "./functions";
import operators from "./operators";

export default function solveInfix(infix: string[]): number {
  const stack: number[] = [];
  const operations: string[] = [];

  for (const token of infix) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else if (token in functions) {
      const a = stack.pop();
      if (a) {
        stack.push(functions[token].operation(a));
        operations.push(token + "(" + a + ") = " + stack[stack.length - 1]);
      } else {
        throw new Error("Missing arguments for function: " + token);
      }
    } else {
      const b = stack.pop();
      const a = stack.pop();

      if (a && b) {
        stack.push(operators[token].operation(a, b));
        operations.push(a + token + b + " = " + stack[stack.length - 1]);
      } else {
        throw new Error("Missing arguments for operator: " + token);
      }
    }
  }

  if (stack.length > 1) {
    throw new Error("Missing operators");
  }

  console.log(operations);
  return stack.pop() as number;
}
