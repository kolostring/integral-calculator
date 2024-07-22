import useTranslate from "./useTranslate";
import useZoom from "./useZoom";

export default function useTransform(
  onTranslate: (x: number, y: number) => void,
  onZoom: (zoom: number, origin: { x: number; y: number }) => void,
) {
  const translateHandler = useTranslate(onTranslate);
  const zoomHandler = useZoom(onZoom);


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

  const handleWheel = (event: React.WheelEvent) => {
    zoomHandler.onWheel(event);
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onWheel: handleWheel,
  };
}
