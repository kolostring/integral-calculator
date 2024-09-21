export default function SimpsonRule(
  functionEvaluation: (x: number) => number,
  from: number,
  to: number,
  n: number
) {
  const deltaX = (to - from) / n;
  let result = functionEvaluation(from) + functionEvaluation(to);

  for (let i = 1; i * deltaX + from < to; i++) {
    result += functionEvaluation(i * deltaX + from) * (i % 2 === 0 ? 2 : 4);
    console.log(i % 2 === 0 ? 2 : 4);
  }

  return (result * deltaX) / 3;
}
