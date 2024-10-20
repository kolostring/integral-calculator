import { describe, expect, it } from "vitest";
import Tokenizer from "../utils/classes/Tokenizer";
import { TokenKind } from "../utils/constants/tokenKinds";

const tokenizer = new Tokenizer();

describe("Tokenizer", () => {
  it("should tokenize numbers", () => {
    tokenizer.setInput("1 23 456");
    ["1", "23", "456"].forEach((str) => {
      expect(tokenizer.getNextToken().str).toBe(str);
    });
  });

  it("should tokenize words", () => {
    tokenizer.setInput("a bc defg");
    ["a", "bc", "defg"].forEach((str) => {
      expect(tokenizer.getNextToken().str).toBe(str);
    });
  });

  it("should tokenize operators", () => {
    tokenizer.setInput("- + */");
    ["-", "+", "*", "/"].forEach((str) => {
      expect(tokenizer.getNextToken().str).toBe(str);
    });
  });
  it("should tokenize operators apart from words", () => {
    tokenizer.setInput("a+bc/d");
    ["a", "+", "bc", "/", "d"].forEach((str) => {
      expect(tokenizer.getNextToken().str).toBe(str);
    });
  });

  it("should tokenize parenthesis apart from words and other operators", () => {
    tokenizer.setInput("2+(3-(4*5)+ab)-cd");
    ["2","+","(","3","-","(","4","*","5",")","+","ab",")","-","cd"].forEach((str) => {
      expect(tokenizer.getNextToken().str).toBe(str);
    });
  });
  
  it("should return EOF if there's no token left", ()=>{
    tokenizer.setInput("1");
    tokenizer.advance();
    expect(tokenizer.getNextToken().kind).toBe(TokenKind.EOF);
  })
  
  it("should return correct token type", ()=>{
    tokenizer.setInput("123 variable ()+-/*");
    [TokenKind.NUMBER, TokenKind.SYMBOL, TokenKind.L_PARENTHESIS, TokenKind.R_PARENTHESIS, TokenKind.PLUS, TokenKind.MINUS, TokenKind.DIV, TokenKind.MUL].forEach((token)=>{
      expect(TokenKind[tokenizer.getNextToken().kind]).toBe(TokenKind[token]);
    })
  })

  it("should peek tokens correctly without modifying position", ()=>{
    tokenizer.setInput("ab cd fg");
    tokenizer.advance();

    ["ab", "cd", "fg"].forEach((str, index)=>{
      expect(tokenizer.peekToken(index).str).toBe(str);
    })

    expect(tokenizer.getCurrentToken().str).toBe("ab");
  })

  it("should tokenize numbers separated from words", ()=>{
    tokenizer.setInput("123x");
    tokenizer.advance();
    ["123", "x"].forEach((str, index)=>{
      expect(tokenizer.peekToken(index).str).toBe(str);
    })

    tokenizer.setInput("abc123");
    tokenizer.advance();
    ["abc", "123"].forEach((str, index)=>{
      expect(tokenizer.peekToken(index).str).toBe(str);
    })
  })
});
