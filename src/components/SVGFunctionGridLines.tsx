import React from "react";
import { Transformable } from "./TransformationContainer";

export type SVGFunctionGridLinesProps = {
  numbersClassName?: string;
  strokeClassName?: string;
  axisClassName?: string;
  breakPointFactor: number;
} & Transformable &
  React.SVGProps<SVGSVGElement>;

export default function SVGFunctionGridLines({
  width,
  height,
  position,
  scale,
  numbersClassName,
  strokeClassName,
  axisClassName,
  breakPointFactor,
  ...props
}: Readonly<SVGFunctionGridLinesProps>) {

  const deltaX = Math.min(
    Math.max(
      1,
      Math.trunc(width / scale / breakPointFactor) - (Math.trunc(width / scale / breakPointFactor) % 5),
    ),
    10,
  );

  const deltaY = Math.min(
    Math.max(
      1,
      Math.trunc(height / scale / breakPointFactor) - (Math.trunc(height / scale / breakPointFactor) % 5),
    ),
    10,
  );

  const offsetX = (position.x - width / 2) / scale;
  const offsetY = (position.y - height / 2) / scale;

  return (
    <svg
      {...props}
      viewBox={`${position.x - width / 2} ${position.y - height / 2} ${width} ${height}`}
    >
      {[...Array(20)].map((_, index) => {
        const pos = (deltaX * index + (offsetX - (offsetX % deltaX))) * scale;

        return (
          <g key={pos}>
            <text
              className={numbersClassName}
              x={`${pos}`}
              y={`${offsetY * scale + 20}`}
            >
              {Math.ceil(deltaX * index + offsetX - (offsetX % deltaX))}
            </text>
            <path
              className={`${pos == 0? axisClassName: strokeClassName}`}
              d={`M ${pos} ${position.y - height / 2} V ${position.y + height}`}
            />
          </g>
        );
      })}

      {[...Array(20)].map((_, index) => {
        const pos = (deltaY * index + (offsetY - (offsetY % deltaY))) * scale;

        return (
          <g key={pos}>
            <text
              className={numbersClassName}
              x={`${offsetX * scale + 20}`}
              y={`${pos}`}
            >
              {-Math.ceil(deltaY * index + offsetY - (offsetY % deltaY))}
            </text>
            <path
              className={`${pos == 0? axisClassName: strokeClassName}`}
              d={`M ${position.x - width / 2} ${pos} H ${width + position.x}`}
            />
          </g>
        );
      })}
    </svg>
  );
}
