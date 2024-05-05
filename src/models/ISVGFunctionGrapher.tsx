import { HTMLAttributes, SVGAttributes } from "react";

export default interface ISVGFunctionGrapher extends HTMLAttributes<SVGElement> {
    functionPoints: number[];
    from: number;
    to: number;
    width: number;
    height: number;
    scale : number;
    position: {x: number, y:number};
    axesProps : SVGAttributes<SVGPathElement>; 
    graphProps : SVGAttributes<SVGPathElement>;
  }
  