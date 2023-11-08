import { ReactElement } from "react";

export default interface ITransformationListener {
  onZoom: (zoom: number) => void;
  onTranslate: (x: number, y: number) => void;
  children: ReactElement;
  className?: string;
}
