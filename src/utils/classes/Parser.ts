import {
  TokenKind,
  isTokenLiteral,
  isTokenUnaryOperator,
  tokenKindToString,
} from "../constants/tokenKinds";
import Tokenizer from "./Tokenizer";
import { SyntaxTree } from "./SyntaxTree";
import { SyntaxTreeKind } from "../constants/syntaxTreeKinds";

export default class Parser {
  private tokenizer: Tokenizer;

  constructor(input: string = "") {
    this.tokenizer = new Tokenizer(input);
  }

  public setInput(input: string) {
    this.tokenizer.setInput(input);
  }

  private eat(token: TokenKind, errorMessage?: string) {
    const currToken = this.tokenizer.getCurrentToken();
    if (currToken.kind !== token) {
      throw new Error(
        errorMessage
          ? errorMessage
          : `"${tokenKindToString[token]}" expected at position: "${currToken.pos}". Got <${TokenKind[currToken.kind]}>("${currToken.str}") instead.`,
      );
    }
    this.tokenizer.advance();
  }

  public expression(): SyntaxTree {
    this.eat(TokenKind.BOF);
    if (this.tokenizer.getCurrentToken().kind === TokenKind.EOF) {
      return new SyntaxTree(
        SyntaxTreeKind.LITERAL,
        { ...this.tokenizer.getCurrentToken(), str: "0" },
        [],
      );
    }
    const arithmeitcExpression = this.arithmeitcExpression();
    const currToken = this.tokenizer.getCurrentToken();
    this.eat(
      TokenKind.EOF,
      `Operator expected at position: "${currToken.pos}". Got <${TokenKind[currToken.kind]}>("${currToken.str}") instead.`,
    );
    return arithmeitcExpression;
  }

  private arithmeitcExpression(): SyntaxTree {
    let root = this.term();

    while (
      this.tokenizer.getCurrentToken().kind === TokenKind.PLUS ||
      this.tokenizer.getCurrentToken().kind === TokenKind.MINUS
    ) {
      root = new SyntaxTree(
        SyntaxTreeKind.BINARY_OPERATOR,
        this.tokenizer.advance(),
        [root, this.term()],
      );
    }

    return root;
  }

  private term(): SyntaxTree {
    let root = this.factor();

    while (
      this.tokenizer.getCurrentToken().kind === TokenKind.MUL ||
      this.tokenizer.getCurrentToken().kind === TokenKind.DIV
    ) {
      root = new SyntaxTree(
        SyntaxTreeKind.BINARY_OPERATOR,
        this.tokenizer.advance(),
        [root, this.factor()],
      );
    }

    return root;
  }

  private factor(): SyntaxTree {
    let root = this.basePower();

    while (this.tokenizer.getCurrentToken().kind === TokenKind.POWER) {
      root = new SyntaxTree(
        SyntaxTreeKind.BINARY_OPERATOR,
        this.tokenizer.advance(),
        [root, this.factor()],
      );
    }

    return root;
  }

  private basePower(): SyntaxTree {
    const currToken = this.tokenizer.getCurrentToken();

    if (isTokenUnaryOperator(currToken.kind)) {
      this.tokenizer.advance();
      return new SyntaxTree(SyntaxTreeKind.UNARY_OPERATOR, currToken, [
        this.basePower(),
      ]);
    }
    if (isTokenLiteral(currToken.kind)) {
      this.tokenizer.advance();
      return new SyntaxTree(SyntaxTreeKind.LITERAL, currToken, []);
    }
    if (currToken.kind === TokenKind.L_PARENTHESIS) {
      this.tokenizer.advance();
      const root = this.arithmeitcExpression();
      this.eat(TokenKind.R_PARENTHESIS);
      return root;
    }
    if (currToken.kind === TokenKind.SYMBOL) {
      if (this.tokenizer.peekToken(1).kind === TokenKind.L_PARENTHESIS) {
        return this.functionCall();
      } else {
        this.tokenizer.advance();
        return new SyntaxTree(SyntaxTreeKind.VARIABLE, currToken, []);
      }
    }

    throw new Error(
      `Expression expected at position: "${currToken.pos}". Got <${TokenKind[currToken.kind]}>("${currToken.str}") instead."`,
    );
  }

  private functionCall(): SyntaxTree {
    const token = this.tokenizer.advance();
    const children: SyntaxTree[] = [];

    this.eat(TokenKind.L_PARENTHESIS);

    let parametersLeft: boolean =
      this.tokenizer.getCurrentToken().kind !== TokenKind.R_PARENTHESIS;

    while (parametersLeft) {
      children.push(this.arithmeitcExpression());

      if (this.tokenizer.getCurrentToken().kind === TokenKind.COMMA) {
        parametersLeft = true;
        this.tokenizer.advance();
      } else {
        parametersLeft = false;
      }
    }

    this.eat(TokenKind.R_PARENTHESIS);

    return new SyntaxTree(SyntaxTreeKind.FUNCTION_CALL, token, children);
  }
}
