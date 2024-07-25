import { Transformable } from "./TransformationContainer";

export default function SVGFunctionGridLines({
  width,
  height,
  position,
  scale,
}: Transformable) {
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

  const offsetX = position.x / scale - width / 2 / scale;
  const offsetY = position.y / scale - height / 2 / scale;

  return (
    <svg
      className="pointer-events-none absolute top-0 fill-cyan-800 stroke-cyan-800"
      viewBox={`${position.x - width / 2} ${position.y - height / 2} ${width} ${height}`}
    >
      {[...Array(50)].map((val, index) => {
        const pos = (deltaX * index + (offsetX - (offsetX % deltaX))) * scale;

        return (
          <>
            <text key={pos} x={`${pos}`} y={`${offsetY * scale + 20}`}>
              {Math.ceil(deltaX * index + offsetX - (offsetX % deltaX))}
            </text>
            <path d={`M ${pos} ${position.y - height/2} V ${position.y + height}`} />
          </>
        );
      })}

      {[...Array(50)].map((val, index) => {
        const pos = (deltaY * index + (offsetY - (offsetY % deltaY))) * scale;

        return (
          <>
            <text key={pos} x={`${offsetX * scale + 20}`} y={`${pos}`}>
              {Math.ceil(deltaY * index + offsetY - (offsetY % deltaY))}
            </text>
            <path d={`M ${position.x - width/2} ${pos} H ${width + position.x}`} />
          </>
        );
      })}
    </svg>
  );
}
