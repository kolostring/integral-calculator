import ISVGFunctionGrapher from "../models/ISVGFunctionGrapher";

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
}: Readonly<ISVGFunctionGrapher>) {
  const deltaX = (to - from) / functionPoints.length;

  const axesPathD = () => {
    return `M 0 ${-height + position.y} V ${height + position.y} M ${
      -width + position.x
    } 0 H ${width + position.x} `;
  };

  const graphPathD = () => {
    let path = "";

    path += `M ${(deltaX + from) * scale} 0 `;
    functionPoints.forEach((y, index) => {
      path += `L ${(index * deltaX + from) * scale} `;
      if (isFinite(y)) {
        path += -y * scale + " ";
      } else if (y === Infinity) {
        path += 99999999999 + " ";
      } else {
        path += 99999999999 + " ";
      }
    });

    path += `V ${0}`;
    return path;
  };

  return (
    <>
      <svg
        viewBox={`${-width / 2 + position.x} ${
          -height / 2 + position.y
        } ${width} ${height}`}
        {...props}
      >
        <path d={axesPathD()} {...axesProps} />
        <path d={graphPathD()} {...graphProps} />
      </svg>
      <h1
        className="absolute text-cyan-200"
        style={{ left: `${(width / 2 - position.x + from*scale)}px` , top: `${height / 2 - (position.y) }px`}}
      >
        {from}
      </h1>
      <h1
        className="absolute text-cyan-200"
        style={{ left: `${(width / 2 - position.x + to*scale)}px` , top: `${(height / 2 - position.y)}px`}}
      >
        {to}
      </h1>
    </>
  );
}
