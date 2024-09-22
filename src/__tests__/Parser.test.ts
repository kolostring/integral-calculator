import { describe, expect, it } from "vitest";
import Parser from "@/utils/classes/Parser";
import postfix from "@/utils/functions/postfixFunctions";

const parser = new Parser();

describe("Parser", () => {
  it("should parse lonely factors", () => {
    parser.setInput("123");
    expect(postfix(parser.expression())).toBe("123");
  });

  it("should parse addition and substraction", () => {
    parser.setInput("12+34");
    expect(postfix(parser.expression())).toBe("12 34 +");
    parser.setInput("12-34-56-78");
    expect(postfix(parser.expression())).toBe("12 34 - 56 - 78 -");
  });

  it("should parse multiplicatoin and division", () => {
    parser.setInput("12*34");
    expect(postfix(parser.expression())).toBe("12 34 *");
    parser.setInput("12/34/56/78");
    expect(postfix(parser.expression())).toBe("12 34 / 56 / 78 /");
  });

  it("should parse operators precedence correctly", () => {
    parser.setInput("12+34*56");
    expect(postfix(parser.expression())).toBe("12 34 56 * +");
    parser.setInput("12 + 34 * 56 / 78 + 90 / 123");
    expect(postfix(parser.expression())).toBe("12 34 56 * 78 / + 90 123 / +");
  });

  it("should parse parenthesis order correctly", () => {
    parser.setInput("(12+34)*56");
    expect(postfix(parser.expression())).toBe("12 34 + 56 *");
    parser.setInput("(12+34)*(56+78*(90+123))");
    expect(postfix(parser.expression())).toBe("12 34 + 56 78 90 123 + * + *");
    parser.setInput("(12+(34*(56/(78))))");
    expect(postfix(parser.expression())).toBe("12 34 56 78 / * +");
  });

  it("should parse unary arithmetic operators", () => {
    parser.setInput("1--2");
    expect(postfix(parser.expression())).toBe("1 2 (-) -");
    parser.setInput("1---(---(2--3)-4)-(-5)");
    expect(postfix(parser.expression())).toBe(
      "1 2 3 (-) - (-) (-) (-) 4 - (-) (-) - 5 (-) -"
    );
  });

  it("should parse power operators with right associativity", () => {
    parser.setInput("1^2^3");
    expect(postfix(parser.expression())).toBe("1 2 3 ^ ^");
    parser.setInput("1^(2*3)^(4*5)");
    expect(postfix(parser.expression())).toBe("1 2 3 * 4 5 * ^ ^");
    parser.setInput("1^(2*3^2^2^2)^(4*5)");
    expect(postfix(parser.expression())).toBe("1 2 3 2 2 2 ^ ^ ^ * 4 5 * ^ ^");
  });

  it("should parse Variables", () => {
    parser.setInput("_ab + cd2 / efg");
    expect(postfix(parser.expression())).toBe("_ab cd2 efg / +");
  })

  it("should parse function calls", () => {
    parser.setInput("foo()");
    expect(postfix(parser.expression())).toBe("foo()");
    parser.setInput("foo(a)");
    expect(postfix(parser.expression())).toBe("foo( (a) )");
    parser.setInput("foo(a,b)");
    expect(postfix(parser.expression())).toBe("foo( (a) , (b) )");
    parser.setInput("foo(a+b*c, 32^4)");
    expect(postfix(parser.expression())).toBe("foo( (a b c * +) , (32 4 ^) )");
    parser.setInput("foo(foo())");
    expect(postfix(parser.expression())).toBe("foo( (foo()) )");
  })

  it("should not allow to have missing operands", () => {
    parser.setInput("1-");
    expect(()=>{parser.expression()}).toThrowError();
    parser.setInput("1*2//3");
    expect(()=>{parser.expression()}).toThrowError();
  });

  it("should not allow to have empty expressions", () => {
    parser.setInput("");
    expect(()=>{parser.expression()}).toThrowError();
    parser.setInput("()");
    expect(()=>{parser.expression()}).toThrowError();
  });

});
