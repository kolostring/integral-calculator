import operators from "./operators";

export default function ShuntingYard(expression: string[]) {
  const queue: string[] = [];
  const operatorStack: string[] = [];

  for (const element of expression) {
    if (element in operators) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] != "(" &&
        operators[operatorStack[operatorStack.length - 1]].precedence >=
          operators[element].precedence
      ) {
        queue.push(operatorStack.pop()!);
      }

      operatorStack.unshift(element);
    } else if (element === "(") {
      operatorStack.unshift("(");
    } else if (element === ")") {
      while (operatorStack[0] !== "(") {
        queue.push(operatorStack.shift()!);
      }
      operatorStack.shift();
    } else {
      queue.push(element);
    }
  }

  return queue.concat(operatorStack);
}
