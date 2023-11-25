import { functions } from "./functions";
import operators from "./operators";

export default function ShuntingYard(expression: string[]) {
  const queue: string[] = [];
  const operatorStack: string[] = [];
  for (const token of expression) {
    if (token in operators) {
      let lastOperator;

      while (
        operatorStack.length > 0 &&
        (lastOperator = operatorStack[operatorStack.length - 1]) !== "(" &&
        ((operators[lastOperator].leftAssociativity &&
          operators[lastOperator].precedence >= operators[token].precedence) ||
          (!operators[lastOperator].leftAssociativity &&
            operators[lastOperator].precedence > operators[token].precedence))
      )
        queue.push(operatorStack.pop()!);

      operatorStack.push(token);
    } else if (token === "(" || token in functions) {
      operatorStack.push(token);
    } else if (token === ")") {
      try {
        while (operatorStack[operatorStack.length - 1] !== "(") {
          queue.push(operatorStack.pop()!);
        }
      } catch (e) {
        throw new Error("Unpaired Parenthesis");
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

  if (operatorStack.includes("(")) {
    throw new Error("Unpaired Parenthesis");
  }

  return queue.concat(operatorStack.reverse());
}
