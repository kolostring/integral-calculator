import React, { useState } from "react";

export default function useTranslate(
  onTranslate: (x: number, y: number) => void
) {
  const [translateTouch, setTranslateTouch] = useState({ x: 0, y: 0 });

  const handleTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length !== 1) return;

    const x = event.touches.item(0).clientX;
    const y = event.touches.item(0).clientY;

    setTranslateTouch({ x: x, y: y });
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
    if (event.touches.length !== 1) return;

    setTranslateTouch({
      x: event.touches.item(0).clientX,
      y: event.touches.item(0).clientY,
    });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setTranslateTouch({ x: event.clientX, y: event.clientY });
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

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
  };
}
