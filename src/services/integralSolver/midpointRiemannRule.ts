export default function MidpointRemannSum(
  n: number,
  from: number,
  to: number,
  functionEvaluation: (x: number) => number
) {
  const deltaX = (to - from) / n;
  let result = 0;

  for (let i = from; i < to; i += deltaX) {
    result += functionEvaluation(i + deltaX / 2);
  }

  return result * deltaX;
}
