export default function tokenizeExpression(expression: string) {
  const regex = /([-+*/^()])|\b(sin|cos|tan|sqrt|ln)\b|\b\d+(\.\d+)?\b/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(expression)) !== null) {
    tokens.push(match[0]);
  }

  return tokens;
}
