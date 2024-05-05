import React from "react";

export default interface ITransformationListener extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onZoom: (zoom: number, origin: {x: number, y: number}) => void;
  onTranslate: (x: number, y: number) => void;
}
