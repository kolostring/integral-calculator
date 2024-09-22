import { useRef } from "react";
import useTranslate, { useTranslateProps } from "./useTranslate";
import useZoom, { useZoomProps } from "./useZoom";

export type useTransformProps = useTranslateProps & useZoomProps;

export default function useTransform({
  onTranslate,
  onTranslateStart,
  onTranslateEnd,
  onZoom,
  wheelZoomMul,
}: useTransformProps) {
  const translateHandler = useTranslate({
    onTranslate,
    onTranslateStart,
    onTranslateEnd,
  });
  const zoomHandler = useZoom({ onZoom, wheelZoomMul });

  const cachedPointerEvent = useRef<React.PointerEvent[]>([]);

  const handleTouchStart = (event: React.PointerEvent) => {
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    cachedPointerEvent.current.push(event);

    translateHandler.onPointerDown(cachedPointerEvent.current);
    zoomHandler.onPointerDown(cachedPointerEvent.current);
  };

  const handleTouchMove = (event: React.PointerEvent) => {
    const index = cachedPointerEvent.current.findIndex(
      (pe) => pe.pointerId === event.pointerId,
    );
    cachedPointerEvent.current[index] = event;

    translateHandler.onPointerMove(cachedPointerEvent.current);
    zoomHandler.onPointerMove(cachedPointerEvent.current);
  };

  const handleTouchEnd = (event: React.PointerEvent) => {
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
    cachedPointerEvent.current = cachedPointerEvent.current.filter(
      (pe) => pe.pointerId !== event.pointerId,
    );

    translateHandler.onPointerUp(cachedPointerEvent.current);
  };

  const handleWheel = (event: WheelEvent) => {
    zoomHandler.onWheel(event);
  };

  return {
    onPointerDown: handleTouchStart,
    onPointerMove: handleTouchMove,
    onPointerUp: handleTouchEnd,
    onWheel: handleWheel,
  };
}
