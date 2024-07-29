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

  const handleTouchStart = (event: React.TouchEvent) => {
    translateHandler.onTouchStart(event);
    zoomHandler.onTouchStart(event);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    translateHandler.onTouchMove(event);
    zoomHandler.onTouchMove(event);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    translateHandler.onTouchEnd(event);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    translateHandler.onMouseDown(event);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    translateHandler.onMouseMove(event);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    translateHandler.onMouseUp(event);
  };

  const handleWheel = (event: React.WheelEvent) => {
    zoomHandler.onWheel(event);
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onWheel: handleWheel,
  };
}
