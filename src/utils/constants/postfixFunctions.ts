import { SyntaxTree } from "../classes/SyntaxTree";
import { SyntaxTreeKind } from "./syntaxTreeKinds";

const postfixFunctions : Record<SyntaxTreeKind, (syntaxTree: SyntaxTree) => string> = {
  [SyntaxTreeKind.VARIABLE]: (syntaxTree) =>{
    return syntaxTree.getToken().str;
  },
  [SyntaxTreeKind.BINARY_OPERATOR]: (syntaxTree) =>{
    return `${postfix(syntaxTree.getChildren()[0])} ${postfix(syntaxTree.getChildren()[1])} ${syntaxTree.getToken().str}`;
  },
  [SyntaxTreeKind.UNARY_OPERATOR]: (syntaxTree) =>{
    return `${postfix(syntaxTree.getChildren()[0])} (${syntaxTree.getToken().str})`;
  },
  [SyntaxTreeKind.FUNCTION_CALL]: (syntaxTree) =>{
    return syntaxTree.getToken().str + "(" + syntaxTree.getChildren().reduce((acc: string, child, index)=>{
      return acc + (index > 0 ? "," : "") + " (" + (postfix(child)) + ") ";
    }, "") + ")";
  },
  [SyntaxTreeKind.LITERAL]: (syntaxTree) =>{
    return syntaxTree.getToken().str;
  },
}

export default function postfix(syntaxTree :SyntaxTree): string{
  return postfixFunctions[syntaxTree.getKind()](syntaxTree);
}