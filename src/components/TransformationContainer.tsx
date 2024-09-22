import { useLayoutEffect, useRef, useState } from "react";
import useSlidingTransform from "../hooks/useSlidingTransform";

export type TransformableProps = {
  scale: number;
  position: { x: number; y: number };
  width: number;
  height: number;
};

export type TransformationContainer = {
  renderItem: (itemProps: TransformableProps) => React.JSX.Element;
  minScale: number;
  maxScale: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function TransformationContainer({
  renderItem,
  minScale,
  maxScale,
  ...props
}: TransformationContainer) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(10);
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  const refContainer = useRef<HTMLDivElement>(null);

  const handleScale = (
    zoom: number,
    absoluteOrigin: { x: number; y: number },
  ) => {
    const scaleMul = Math.abs(zoom);
    if (zoom !== 0) {
      const newScale = scale * (zoom > 0 ? scaleMul : 1 / scaleMul);

      if (newScale < minScale || newScale > maxScale) {
        return;
      }

      const offset = {
        x:
          position.x +
          (position.x + absoluteOrigin.x) *
            (zoom > 0 ? scaleMul - 1 : -(1 - 1 / scaleMul)),
        y:
          position.y +
          (position.y + absoluteOrigin.y) *
            (zoom > 0 ? scaleMul - 1 : -(1 - 1 / scaleMul)),
      };

      setScale(newScale);
      setPosition(offset);
    }
  };

  const handlePosition = (x: number, y: number) => {
    setPosition({ x: position.x + x, y: position.y + y });
  };

  const transformHandler = useSlidingTransform({
    onTranslate: handlePosition,
    onZoom: handleScale,
    wheelZoomMul: 1.1,
    slidingAlpha: 0.07,
  });

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
    <div ref={refContainer} {...{ ...props, ...transformHandler }}>
      {renderItem({ height, position, scale, width })}

      <button
        className="absolute bottom-0 right-0 m-2 bg-cyan-600 bg-opacity-60 overflow-hidden backdrop-blur-sm size-8 flex justify-center items-center rounded-full"
        onClick={() => {
          setPosition({ x: 0, y: 0 });
          setScale(10);
        }}
      >
        <img src="/src/assets/reset.svg" alt="reset" />
      </button>
    </div>
  );
}
