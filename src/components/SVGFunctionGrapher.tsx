import { HTMLAttributes, SVGAttributes } from "react";

interface SVGFunctionGrapherProps extends HTMLAttributes<SVGElement> {
  functionPoints: number[];
  from: number;
  to: number;
  scale : number
  axesProps : SVGAttributes<SVGPathElement> 
  graphProps : SVGAttributes<SVGPathElement>
}

export default function SVGFunctionGrapher({
  functionPoints,
  from,
  to,
  scale,
  axesProps,
  graphProps,
  ...props
}: SVGFunctionGrapherProps) {
  const maxY = Math.max.apply(null, functionPoints);
  const minY = Math.min.apply(null, functionPoints);
  const deltaX = (to - from) / functionPoints.length;

  const dimensions = Math.max(
    Math.max(Math.abs(from) + to, 200),
    Math.max(Math.abs(minY) + maxY, 200)
  );

  const axesPathD = () => {
    return `M 0 ${-dimensions} V ${dimensions} M ${-dimensions} 0 H ${dimensions} `;
  }

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
      width="100%"
      viewBox={`${-dimensions / 2} ${
        -dimensions / 2
      } ${dimensions} ${dimensions}`}
      {...props}
    >
      <path d={axesPathD()} {...axesProps} />
      <path d={graphPathD()} {...graphProps}/>
    </svg>
  );
}
