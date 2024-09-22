import { useCallback } from "react";
import { TransformableProps } from "./TransformationContainer";

export type SVGFunctionGrapherProps = {
  functionPoints: (from: number, to: number) => number[];
  axesProps?: React.SVGAttributes<SVGPathElement>;
  graphProps?: React.SVGAttributes<SVGPathElement>;
} & React.HTMLAttributes<SVGElement> &
  TransformableProps;

export default function SVGFunctionGrapher({
  functionPoints,
  scale = 10,
  width = 0,
  height = 0,
  position = { x: 0, y: 0 },
  graphProps,
  ...props
}: Readonly<SVGFunctionGrapherProps>) {
  const from = (position.x - width / 2) / scale;
  const to = (position.x + width / 2) / scale;

  const graphPathD = useCallback(() => {
    let path = "";
    const points = functionPoints(from, to);
    const deltaX = (to - from) / points.length;

    path += `M ${(deltaX + from) * scale - position.x} ${-position.y} `;
    points.forEach((y, index) => {
      path += `L ${(index * deltaX + from) * scale - position.x} `;
      if (isFinite(y)) {
        const renderY = -y * scale - position.y;
        path += Math.min(Math.abs(renderY), height) * Math.sign(renderY) + " ";
      } else if (y === Infinity) {
        path += -height + " ";
      } else {
        path += height + " ";
      }
    });

    path += `V ${-position.y}`;
    return path;
  }, [from, to, position, scale, functionPoints, height]);

  return (
    <svg viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`} {...props}>
      <path d={graphPathD()} {...graphProps} />
    </svg>
  );
}
