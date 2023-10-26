import operators from "./operators";

export default function solveInfix(infix: string[]): number {
  const stack: number[] = [];

  for (const element of infix) {
    if (!isNaN(parseFloat(element))) {
      stack.push(parseFloat(element));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;

      stack.push(operators[element].operation(a, b));
    }
  }

  return stack.pop() as number;
}
