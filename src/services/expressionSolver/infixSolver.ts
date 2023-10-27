import { functions } from "./functions";
import operators from "./operators";

export default function solveInfix(infix: string[]): number {
  const stack: number[] = [];

  for (const token of infix) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else if (token in functions) {
      stack.push(functions[token].operation(stack.pop()!));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;

      stack.push(operators[token].operation(a, b));
    }
  }

  return stack.pop() as number;
}
