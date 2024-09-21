import { mathFunctions } from "../constants/math";
import {
  binaryArithmeticOperators,
  unaryArithmeticOperators,
} from "../constants/operators";
import { SyntaxTreeKind } from "../constants/syntaxTreeKinds";
import { SyntaxTree } from "../classes/SyntaxTree";

export default function solveSyntaxTree(ast: SyntaxTree, x: number): number {
  if (ast.getKind() === SyntaxTreeKind.BINARY_OPERATOR) {
    if (ast.getToken().str in binaryArithmeticOperators === false) {
      throw new Error(`"${ast.getToken().str}" is not a valid Binary Operator`);
    }

    return binaryArithmeticOperators[ast.getToken().str].operation(
      solveSyntaxTree(ast.getChildren()[0], x),
      solveSyntaxTree(ast.getChildren()[1], x),
    );
  }
  if (ast.getKind() === SyntaxTreeKind.UNARY_OPERATOR) {
    if (ast.getToken().str in unaryArithmeticOperators === false) {
      throw new Error(`"${ast.getToken().str}" is not a valid Unary Operator`);
    }

    return unaryArithmeticOperators[ast.getToken().str].operation(
      solveSyntaxTree(ast.getChildren()[0], x),
    );
  }
  if (ast.getKind() === SyntaxTreeKind.FUNCTION_CALL) {
    if (ast.getToken().str.toLowerCase() in mathFunctions === false) {
      throw new Error(`"${ast.getToken().str}" is not a valid Math Function.`);
    }

    return mathFunctions[ast.getToken().str.toLowerCase()](
      solveSyntaxTree(ast.getChildren()[0], x),
    );
  }
  if (ast.getKind() === SyntaxTreeKind.VARIABLE) {
    if(ast.getToken().str.toLowerCase() in mathFunctions){
      throw new Error(
        `"${ast.getToken().str}" has not function parameters inside of parenthesis.`,
      );
    }
    if (ast.getToken().str !== "x") {
      throw new Error(
        `"${ast.getToken().str}" is not a valid variable. Use lowercase "x" instead`,
      );
    }

    return x;
  }
  if (ast.getKind() === SyntaxTreeKind.LITERAL) {
    const value = Number.parseFloat(ast.getToken().str);
    if (isNaN(value)) {
      throw new Error(`"${ast.getToken().str}" is not a valid number`);
    }

    return value;
  } else {
    throw new Error(`"${ast.getToken().str}" is has not valid TokenKind`);
  }
}
