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
  const [scale, setScale] = useState(1);
  const child = cloneElement(children, {scale: scale, position: position})

  const handleScale = (zoom: number) => {
    setScale(scale + zoom);
  };

  const handlePosition = (x: number, y: number) => {
    setPosition({ x: position.x + x, y: position.y + y });
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
