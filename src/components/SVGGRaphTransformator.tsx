import {
  ReactElement,
  cloneElement,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SVGFunctionGrapherProps } from "./SVGFunctionGrapher";
import useTransform from "../hooks/useTransform";

export default function SVGGraphTransformator({
  children,
  className,
}: Readonly<{
  children: ReactElement<SVGFunctionGrapherProps>;
  className?: string;
}>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(10);
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  const refContainer = useRef<HTMLDivElement>(null);

  const obtainChild = () => {
    return cloneElement(children, {
      scale: scale,
      position: position,
      width: width,
      height: height,
      from: (position.x - width/2) /scale,
      to: (position.x + width/2) /scale,
    });
  };

  const handleScale = (
    zoom: number,
    absoluteOrigin: { x: number; y: number }
  ) => {
    setScale(Math.max(Math.abs(scale + zoom), 5));

    if (zoom !== 0) {
      const zoomMult = zoom / scale;
      setPosition({
        x: position.x + (position.x + absoluteOrigin.x) * zoomMult,
        y: position.y + (position.y + absoluteOrigin.y) * zoomMult,
      });
    }
  };

  const handlePosition = (x: number, y: number) => {
    setPosition({ x: position.x + x, y: position.y + y });
  };

  const transformHandler = useTransform(handlePosition, handleScale);

  useLayoutEffect(() => {
    const updateSize = () => {
      const refRect = refContainer.current?.getBoundingClientRect();
      if (refRect) {
        setWidth(refRect.width);
        setHeight(refRect.height);
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div
      ref={refContainer}
      className={`${className} touch-none h-full w-full`}
      {...transformHandler}
    >
      {obtainChild()}
    </div>
  );
}
