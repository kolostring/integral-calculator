import ISVGFunctionGrapher from "../models/ISVGFunctionGrapher";

export default function SVGFunctionGrapher({
  functionPoints,
  from,
  to,
  scale,
  position,
  axesProps,
  graphProps,
  ...props
}: Readonly<ISVGFunctionGrapher>) {
  const maxY = Math.max.apply(null, functionPoints);
  const minY = Math.min.apply(null, functionPoints);
  const deltaX = (to - from) / functionPoints.length;

  const dimensions = Math.max(
    Math.max(Math.abs(from) + to, 200),
    Math.max(Math.abs(minY) + maxY, 200)
  );

  const axesPathD = () => {
    return `M 0 ${-dimensions+position.y} V ${dimensions+position.y} M ${-dimensions+position.x} 0 H ${dimensions+position.x} `;
  };

  const graphPathD = () => {
    let path = "";

    path += `M ${(deltaX + from) * scale} 0 `;
    functionPoints.forEach((y, index) => {
      path += `L ${(index * deltaX + from) * scale} ${-y * scale} `;
    });

    path += `V ${0}`;
    return path;
  };

  return (
    <svg
      viewBox={`${-dimensions / 2 + position.x} ${
        -dimensions / 2 + position.y
      } ${dimensions} ${dimensions}`}
      {...props}
    >
      <path d={axesPathD()} {...axesProps} />
      <path d={graphPathD()} {...graphProps} />
    </svg>
  );
}
