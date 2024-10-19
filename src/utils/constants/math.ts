export const mathConstants: { [key: string]: number } = {
  pi: Math.PI,
  e: Math.E,
};

export const mathFunctions: { [key: string]: (x: number) => number } = {
  sqrt:(x) => Math.sqrt(x),
  cbrt:(x) => Math.cbrt(x),
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
  tan: (x) => Math.tan(x),
  asin: (x) => Math.asin(x),
  acos: (x) => Math.acos(x),
  atan: (x) => Math.atan(x),
  ln: (x) => Math.log(x),
  log10: (x) => Math.log10(x),
  log2: (x) => Math.log2(x),
  abs: (x) => Math.abs(x),
  sign: (x) => Math.sign(x),
  round: (x) => Math.round(x),
  floor: (x) => Math.floor(x),
  ceil: (x) => Math.ceil(x),
};
