import { ReactElement } from "react";

export default interface ITransformationListener {
  onZoom: (zoom: number, origin: {x: number, y: number}) => void;
  onTranslate: (x: number, y: number) => void;
  children: ReactElement;
  className?: string;
}
