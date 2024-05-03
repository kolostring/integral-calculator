import { ReactElement, cloneElement, useState } from "react";
import TransformationListener from "./TransformationListener";
import ISVGFunctionGrapher from "../models/ISVGFunctionGrapher";

export default function SVGGraphTransformator({
  children,
  className,
}: Readonly<{
  children: ReactElement<ISVGFunctionGrapher>;
  className?: string
}>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(10);
  const child = cloneElement(children, {scale: scale, position: position})

  const handleScale = (zoom: number) => {
    setScale(Math.max(Math.abs(scale + zoom), 5));

    if(zoom !== 0){ 
      const zoomMult = zoom / scale;
      setPosition({x: position.x + position.x * zoomMult, y: position.y + position.y * zoomMult});
    }

  };

  const handlePosition = (x: number, y: number) => {
    setPosition({ x: position.x + x/1.6, y: position.y + y/1.6});
  };

  return (
      <TransformationListener
        onTranslate={handlePosition}
        onZoom={handleScale}
        className={className}
      >
        {child}
      </TransformationListener>
  );
}
