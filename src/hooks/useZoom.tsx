import React, { useState } from "react";

export type useZoomProps = {
  onZoom: (zoom: number, origin: { x: number; y: number }) => void;
  wheelZoomMul: number;
};

export default function useZoom({ onZoom, wheelZoomMul }: useZoomProps) {
  const [lastPinchDistance, setLastPinchDistance] = useState(1);

  const handlePointerDown = (cachedEvents: React.PointerEvent[]) => {
    if (cachedEvents.length !== 2) return;

    setLastPinchDistance(obtainPinchDistance(cachedEvents));
  };

  const handlePointerMove = (cachedEvents: React.PointerEvent[]) => {
    if (cachedEvents.length !== 2) return;

    const pinchDistance = obtainPinchDistance(cachedEvents);

    const delta = pinchDistance - lastPinchDistance;
    setLastPinchDistance(pinchDistance);

    const pos = obtainPinchCenter(cachedEvents);
    const targetRect = cachedEvents[0].currentTarget.getBoundingClientRect();

    onZoom(
      (Math.abs(delta / 100) + 1) * Math.sign(delta),
      obtainAbsoluteOrigin(pos, targetRect),
    );
  };

  const handleWheel = (event: WheelEvent) => {
    const pos = { x: event.clientX, y: event.clientY };
    const targetRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();

    onZoom(
      Math.sign(-event.deltaY) * wheelZoomMul,
      obtainAbsoluteOrigin(pos, targetRect),
    );

    event.preventDefault();
  };

  const obtainPinchDistance = (cachedEvents: React.PointerEvent[]) => {
    const touch1 = cachedEvents[0];
    const touch2 = cachedEvents[1];
    return Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY,
    );
  };

  const obtainPinchCenter = (cachedEvents: React.PointerEvent[]) => {
    const touch1 = cachedEvents[0];
    const touch2 = cachedEvents[1];
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
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onWheel: handleWheel,
  };
}
