import React, { useState } from "react";
import ITransformationListener from "../models/ITransformationListener";

export default function TransformationListener({
  onZoom,
  onTranslate,
  children,
  className,
}: Readonly<ITransformationListener>) {
  const [translateTouch, setTranslateTouch] = useState({ x: 0, y: 0 });
  const [lastPinchDistance, setLastPinchDistance] = useState(1);

  const obtainPinchDistance = (touches: React.TouchList) => {
    const touch1 = touches.item(0);
    const touch2 = touches.item(1);
    return Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY
    );
  };

  const obtainPinchCenter = (touches: React.TouchList) => {
    const touch1 = touches.item(0);
    const touch2 = touches.item(1);
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  }

  const obtainRelativeOrigin = (pos :{x: number, y: number}, targetRect: DOMRect) => {
    const origin = {x: pos.x - targetRect.left - targetRect.width / 2, y: pos.y - targetRect.top - targetRect.height / 2};
    const relativeOrigin = {x: origin.x / (targetRect.width / 2), y: origin.y / (targetRect.height /2)}

    return relativeOrigin;
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length === 1) {
      const x = event.touches.item(0).clientX;
      const y = event.touches.item(0).clientY;

      setTranslateTouch({ x: x, y: y });
    }
    if (event.touches.length === 2) {
      setLastPinchDistance(obtainPinchDistance(event.touches));
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setTranslateTouch({ x: event.clientX, y: event.clientY });
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (event.touches.length === 1) {
      const x = translateTouch.x - event.touches.item(0).clientX;
      const y = translateTouch.y - event.touches.item(0).clientY;
      setTranslateTouch({
        x: event.touches.item(0).clientX,
        y: event.touches.item(0).clientY,
      });
      onTranslate(x, y);
    }
    if (event.touches.length === 2) {
      const pinchDistance = obtainPinchDistance(event.touches);

      const delta = pinchDistance - lastPinchDistance;
      setLastPinchDistance(pinchDistance);

      const pos = obtainPinchCenter(event.touches);
      const targetRect = event.currentTarget.getBoundingClientRect();

      onZoom(delta/15, obtainRelativeOrigin(pos, targetRect));
    }
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if(event.touches.length === 1) {
      setTranslateTouch({
        x: event.touches.item(0).clientX,
        y: event.touches.item(0).clientY,
      });
    }
  }

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

  const handleWheel = (event: React.WheelEvent) => {
    const pos = {x: event.clientX, y: event.clientY};
    const targetRect = event.currentTarget.getBoundingClientRect();

    onZoom(Math.sign(-event.deltaY), obtainRelativeOrigin(pos, targetRect));
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      className={`touch-none ${className}`}
    >
      {children}
    </div>
  );
}
