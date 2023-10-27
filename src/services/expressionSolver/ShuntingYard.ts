import { functions } from "./functions";
import operators from "./operators";

export default function ShuntingYard(expression: string[]) {
  const queue: string[] = [];
  const operatorStack: string[] = [];

  for (const token of expression) {
    if (token in operators) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "(" &&
        ((operators[operatorStack[operatorStack.length - 1]]
          .leftAssociativity &&
          operators[operatorStack[operatorStack.length - 1]].precedence >=
            operators[token].precedence) ||
          (!operators[operatorStack[operatorStack.length - 1]]
            .leftAssociativity &&
            operators[operatorStack[operatorStack.length - 1]].precedence >
              operators[token].precedence))
      )
        queue.push(operatorStack.pop()!);

      operatorStack.push(token);
    } else if (token === "(" || token in functions) {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        queue.push(operatorStack.pop()!);
      }
      operatorStack.pop();

      if (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] in functions
      ) {
        queue.push(operatorStack.pop()!);
      }
    } else {
      queue.push(token);
    }
  }

  return queue.concat(operatorStack.reverse());
}
