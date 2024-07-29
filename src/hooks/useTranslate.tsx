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

  const handleTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length !== 1) return;

    const x = event.touches.item(0).clientX;
    const y = event.touches.item(0).clientY;

    setTranslateTouch({ x: x, y: y });

    if (onTranslateStart) onTranslateStart(event);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (event.touches.length !== 1) return;

    const x = translateTouch.x - event.touches.item(0).clientX;
    const y = translateTouch.y - event.touches.item(0).clientY;
    setTranslateTouch({
      x: event.touches.item(0).clientX,
      y: event.touches.item(0).clientY,
    });
    onTranslate(x, y);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (onTranslateEnd) onTranslateEnd(event);
    
    if (event.touches.length !== 1) return;

    setTranslateTouch({
      x: event.touches.item(0).clientX,
      y: event.touches.item(0).clientY,
    });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setTranslateTouch({ x: event.clientX, y: event.clientY });

    if (onTranslateStart) onTranslateStart(event);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (event.buttons !== 1) return;

    const x = translateTouch.x - event.clientX;
    const y = translateTouch.y - event.clientY;
    setTranslateTouch({
      x: event.clientX,
      y: event.clientY,
    });
    onTranslate(x, y);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (onTranslateEnd) onTranslateEnd(event);
    return event.currentTarget;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
  };
}
