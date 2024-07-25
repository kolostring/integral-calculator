import React from "react";
import { Transformable } from "./TransformationContainer";

export type SVGFunctionGridLinesProps = {
  numbersClassName?: string;
  strokeClassName?: string;
  axisClassName?: string;
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

  ...props
}: Readonly<SVGFunctionGridLinesProps>) {
  const deltaX = Math.min(
    Math.max(
      1,
      Math.trunc(width / scale / 3) - (Math.trunc(width / scale / 3) % 5),
    ),
    10,
  );

  const deltaY = Math.min(
    Math.max(
      1,
      Math.trunc(height / scale / 3) - (Math.trunc(height / scale / 3) % 5),
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
          <>
            <text
              className={numbersClassName}
              key={pos}
              x={`${pos}`}
              y={`${offsetY * scale + 20}`}
            >
              {Math.ceil(deltaX * index + offsetX - (offsetX % deltaX))}
            </text>
            <path
              className={`${pos == 0? axisClassName: strokeClassName}`}
              d={`M ${pos} ${position.y - height / 2} V ${position.y + height}`}
            />
          </>
        );
      })}

      {[...Array(20)].map((_, index) => {
        const pos = (deltaY * index + (offsetY - (offsetY % deltaY))) * scale;

        return (
          <>
            <text
              className={numbersClassName}
              key={pos}
              x={`${offsetX * scale + 20}`}
              y={`${pos}`}
            >
              {Math.ceil(deltaY * index + offsetY - (offsetY % deltaY))}
            </text>
            <path
              className={`${pos == 0? axisClassName: strokeClassName}`}
              d={`M ${position.x - width / 2} ${pos} H ${width + position.x}`}
            />
          </>
        );
      })}
    </svg>
  );
}
