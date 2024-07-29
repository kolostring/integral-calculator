import React, { useState } from "react";

export type useZoomProps = {
  onZoom: (zoom: number, origin: { x: number; y: number }) => void;
  wheelZoomMul: number;
};

export default function useZoom({ onZoom, wheelZoomMul }: useZoomProps) {
  const [lastPinchDistance, setLastPinchDistance] = useState(1);

  const handleTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length !== 2) return;

    setLastPinchDistance(obtainPinchDistance(event.touches));
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (event.touches.length !== 2) return;

    const pinchDistance = obtainPinchDistance(event.touches);

    const delta = pinchDistance - lastPinchDistance;
    setLastPinchDistance(pinchDistance);

    const pos = obtainPinchCenter(event.touches);
    const targetRect = event.currentTarget.getBoundingClientRect();

    onZoom(
      (Math.abs(delta / 100) + 1) * Math.sign(delta),
      obtainAbsoluteOrigin(pos, targetRect),
    );
  };

  const handleWheel = (event: React.WheelEvent) => {
    const pos = { x: event.clientX, y: event.clientY };
    const targetRect = event.currentTarget.getBoundingClientRect();

    onZoom(
      Math.sign(-event.deltaY) * wheelZoomMul,
      obtainAbsoluteOrigin(pos, targetRect),
    );
  };

  const obtainPinchDistance = (touches: React.TouchList) => {
    const touch1 = touches.item(0);
    const touch2 = touches.item(1);
    return Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY,
    );
  };

  const obtainPinchCenter = (touches: React.TouchList) => {
    const touch1 = touches.item(0);
    const touch2 = touches.item(1);
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  const obtainAbsoluteOrigin = (
    pos: { x: number; y: number },
    targetRect: DOMRect,
  ) => {
    const origin = {
      x: pos.x - targetRect.left - targetRect.width / 2,
      y: pos.y - targetRect.top - targetRect.height / 2,
    };

    return origin;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onWheel: handleWheel,
  };
}
