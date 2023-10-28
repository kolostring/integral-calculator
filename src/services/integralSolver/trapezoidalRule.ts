export default function TrapezoidalRule(
  n: number,
  from: number,
  to: number,
  functionEvaluation: (x: number) => number
) {
  const deltaX = (to - from) / n;
  let result = functionEvaluation(from) + functionEvaluation(to);

  for (let i = from + deltaX; i < to; i += deltaX) {
    result += functionEvaluation(i) * 2;
  }

  return (result * deltaX) / 2;
}
