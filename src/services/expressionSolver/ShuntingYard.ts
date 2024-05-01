import { functions } from "./functions";
import operators from "./operators";

export default function ShuntingYard(expression: string[]) {
  const queue: string[] = [];
  const operatorStack: string[] = [];

  expression.forEach((token)=>{
    if (token in operators) {
      parseOperator(token, operatorStack, queue);
    } else if (token === "(" || token in functions) {
      operatorStack.push(token);
    } else if (token === ")") {
      parseClosedParenthesis(operatorStack, queue);
    } else {
      queue.push(token);
    }
  })

  if (operatorStack.includes("(")) {
    throw new Error("Unpaired Parenthesis");
  }

  return queue.concat(operatorStack.reverse());
}

function parseOperator(token: string, operatorStack: string[], queue: string[]){
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
}

function parseClosedParenthesis(operatorStack: string[], queue: string[]){
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
}