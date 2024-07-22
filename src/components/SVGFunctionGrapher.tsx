import { useCallback } from "react";

export type SVGFunctionGrapherProps = {
  functionPoints: (from: number, to: number) => number[];
  from: number;
  to: number;
  width: number;
  height: number;
  scale: number;
  position: { x: number; y: number };
  axesProps: React.SVGAttributes<SVGPathElement>;
  graphProps: React.SVGAttributes<SVGPathElement>;
} & React.HTMLAttributes<SVGElement>;

export default function SVGFunctionGrapher({
  functionPoints,
  from,
  to,
  scale,
  width,
  height,
  position,
  axesProps,
  graphProps,
  ...props
}: Readonly<SVGFunctionGrapherProps>) {
  const axesPathD = () => {
    return `M ${-position.x} ${-height} V ${height} M ${-width} ${-position.y} H ${width} `;
  };

  const graphPathD = useCallback(() => {
    let path = "";
    const points = functionPoints(from, to);
    const deltaX = (to - from) / points.length;

    path += `M ${(deltaX + from) * scale - position.x} ${-position.y} `;
    points.forEach((y, index) => {
      path += `L ${(index * deltaX + from) * scale - position.x} `;
      if (isFinite(y)) {
        path += -y * scale - position.y + " ";
      } else if (y === Infinity) {
        path += 99999999999 + " ";
      } else {
        path += 99999999999 + " ";
      }
    });

    path += `V ${-position.y}`;
    return path;
  }, [from, to, position, scale, functionPoints])

  return (
    <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`} {...props}>
      <path d={axesPathD()} {...axesProps} />
      <path d={graphPathD()} {...graphProps} />
    </svg>
  );
}
