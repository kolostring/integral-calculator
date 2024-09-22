import React, { useState } from "react";

export type useTranslateProps = {
  onTranslate: (x: number, y: number) => void;
  onTranslateStart?: (event: React.TouchEvent | React.MouseEvent) => void;
  onTranslateEnd?: (event: React.TouchEvent | React.MouseEvent) => void;
};

export default function useTranslate({
  onTranslate,
  onTranslateStart,
  onTranslateEnd,
}: useTranslateProps) {
  const [translateTouch, setTranslateTouch] = useState({ x: 0, y: 0 });

  const handlePointerDown = (cachedEvents: React.PointerEvent[]) => {
    if(cachedEvents.length !== 1) return;

    const x = cachedEvents[0].clientX;
    const y = cachedEvents[0].clientY;

    setTranslateTouch({ x: x, y: y });

    if (onTranslateStart) onTranslateStart(cachedEvents[0]);
  };

  const handlerPointerMove = (cachedEvents: React.PointerEvent[]) => {
    if(cachedEvents.length !== 1) return;

    const x = translateTouch.x - cachedEvents[0].clientX;
    const y = translateTouch.y - cachedEvents[0].clientY;
    setTranslateTouch({
      x: cachedEvents[0].clientX,
      y: cachedEvents[0].clientY,
    });
    onTranslate(x, y);
  };

  const handlePointerUp = (cachedEvents: React.PointerEvent[]) => {
    if (onTranslateEnd) onTranslateEnd(cachedEvents[0]);

    if(cachedEvents.length !== 1) return;

    setTranslateTouch({
      x: cachedEvents[0].clientX,
      y: cachedEvents[0].clientY,
    });
  };

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlerPointerMove,
    onPointerUp: handlePointerUp,
  };
}
