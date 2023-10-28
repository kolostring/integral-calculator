export default function TrapezoidalRule(
  functionEvaluation: (x: number) => number,
  from: number,
  to: number,
  n: number
) {
  const deltaX = (to - from) / n;
  let result = functionEvaluation(from) + functionEvaluation(to);

  for (let i = from + deltaX; i < to; i += deltaX) {
    result += functionEvaluation(i) * 2;
  }

  return (result * deltaX) / 2;
}
