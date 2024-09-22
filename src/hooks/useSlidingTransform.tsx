import { useCallback, useLayoutEffect, useRef } from "react";
import useTransform, { useTransformProps } from "./useTransform";
import lerp from "@/utils/functions/lerp";

export type useSlidingTransformProps = {
  slidingAlpha: number;
} & useTransformProps;

export default function useSlidingTransform({
  onTranslate,
  onTranslateStart,
  onTranslateEnd,
  onZoom,
  wheelZoomMul,
  slidingAlpha,
}: useSlidingTransformProps) {
  const isTranslating = useRef<boolean>(true);
  const lastTranslate = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const onSlidingTranslate = useCallback(
    (x: number, y: number) => {
      lastTranslate.current = {
        x: lerp(x, lastTranslate.current.x, 0.5),
        y: lerp(y, lastTranslate.current.y, 0.5),
      };
      onTranslate(x, y);
    },
    [onTranslate],
  );

  const onSlidingTranslateStart = (
    event: React.TouchEvent | React.MouseEvent,
  ) => {
    isTranslating.current = true;
    if (onTranslateStart) onTranslateStart(event);
  };

  const onSlidingTranslateEnd = (
    event: React.TouchEvent | React.MouseEvent,
  ) => {
    isTranslating.current = false;
    if (onTranslateEnd) onTranslateEnd(event);
  };

  const animate = useCallback(() => {
    if (!isTranslating.current) {
      onSlidingTranslate(
        lerp(lastTranslate.current.x, 0, slidingAlpha),
        lerp(lastTranslate.current.y, 0, slidingAlpha),
      );
    } else {
      lastTranslate.current = { x: 0, y: 0 };
    }
  }, [onSlidingTranslate, slidingAlpha]);

  useLayoutEffect(() => {
    const requestID = setInterval(animate, 10);
    return () => {
      clearTimeout(requestID);
    };
  }, [animate]);

  return useTransform({
    onTranslate: onSlidingTranslate,
    onTranslateStart: onSlidingTranslateStart,
    onTranslateEnd: onSlidingTranslateEnd,
    onZoom,
    wheelZoomMul,
  });
}
