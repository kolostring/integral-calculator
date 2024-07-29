import { useCallback, useLayoutEffect, useRef } from "react";
import useTransform from "./useTransform";
import lerp from "../utils/lerp";

export default function useSlidingTransform(
  onTranslate: (x: number, y: number) => void,
  onZoom: (zoom: number, origin: { x: number; y: number }) => void,
  WheelZoomMul: number = 1.2,
  slidingAlpha: number = 0.07,
) {
  const isTranslating = useRef<boolean>(false);
  const lastTranslate = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const onAcceleratedTranslate = useCallback(
    (x: number, y: number) => {
      lastTranslate.current = {
        x: lerp(x, lastTranslate.current.x, 0.5),
        y: lerp(y, lastTranslate.current.y, 0.5),
      };
      onTranslate(x, y);
    },
    [onTranslate, slidingAlpha],
  );

  const transformHandler = useTransform(
    onAcceleratedTranslate,
    onZoom,
    WheelZoomMul,
  );

  const onTranslateStart = (
    translateStartCallback: (
      event: React.TouchEvent | React.MouseEvent,
    ) => void,
  ) => {
    return (event: React.TouchEvent | React.MouseEvent) => {
      translateStartCallback(event);
      isTranslating.current = true;
    };
  };

  const onTranslateEnd = (
    translateEndCallback: (event: React.TouchEvent | React.MouseEvent) => void,
  ) => {
    return (event: React.TouchEvent | React.MouseEvent) => {
      translateEndCallback(event);
      isTranslating.current = false;
    };
  };

  const animate = useCallback(() => {
    if (!isTranslating.current) {
      onAcceleratedTranslate(
        lerp(lastTranslate.current.x, 0, slidingAlpha),
        lerp(lastTranslate.current.y, 0, slidingAlpha),
      );
    } else {
      lastTranslate.current = { x: 0, y: 0 };
    }
  }, [onAcceleratedTranslate, slidingAlpha]);

  useLayoutEffect(() => {
    const requestID = setInterval(animate, 10);
    return () => {
      clearTimeout(requestID);
    };
  }, [animate]);

  return {
    ...transformHandler,
    onTouchStart: onTranslateStart(
      transformHandler.onTouchStart as (
        event: React.TouchEvent | React.MouseEvent,
      ) => void,
    ),
    onMouseDown: onTranslateStart(
      transformHandler.onMouseDown as (
        event: React.TouchEvent | React.MouseEvent,
      ) => void,
    ),
    onTouchEnd: onTranslateEnd(
      transformHandler.onTouchEnd as (
        event: React.TouchEvent | React.MouseEvent,
      ) => void,
    ),
    onMouseUp: onTranslateEnd(
      transformHandler.onMouseUp as (
        event: React.TouchEvent | React.MouseEvent,
      ) => void,
    ),
  };
}
