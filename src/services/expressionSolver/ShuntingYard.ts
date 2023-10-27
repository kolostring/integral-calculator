import operators from "./operators";

export default function ShuntingYard(expression: string[]) {
  const queue: string[] = [];
  const operatorStack: string[] = [];

  for (const token of expression) {
    if (Object.keys(operators).includes(token)) {
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
    } else if (token === "(") {
      operatorStack.push("(");
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        queue.push(operatorStack.pop()!);
      }
      operatorStack.pop();
    } else {
      queue.push(token);
    }
  }

  return queue.concat(operatorStack.reverse());
}
