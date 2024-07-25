import ShuntingYard from "../services/expressionSolver/ShuntingYard";
import solvePostfix from "../services/expressionSolver/postfixSolver";
import SVGFunctionGrapher from "./SVGFunctionGrapher";
import SVGFunctionGridLines from "./SVGFunctionGridLines";
import TransformationContainer, {
  Transformable,
} from "./TransformationContainer";

export type IntegralGrapherProps = {
  parsedExpression: string[];
  integralFrom: number;
  integralTo: number;
};

export default function IntegralGrapher({
  parsedExpression,
  integralFrom,
  integralTo,
}: Readonly<IntegralGrapherProps>) {
  const renderGraph = (itemProps: Transformable) => {
    return (
      <>
        <SVGFunctionGrapher
          axesProps={{ className: "stroke-cyan-500" }}
          graphProps={{ className: "stroke-cyan-300 fill-transparent" }}
          functionPoints={(from, to) => {
            const res = [];
            const n = 1000;
            const deltaX = (to - from) / n;

            for (let i = 0; i < n; i++) {
              try {
                const ev = solvePostfix(
                  ShuntingYard(parsedExpression),
                  from + deltaX * i,
                ).result;

                res.push(ev);
              } catch (e) {
                console.log(e);
              }
            }

            return res;
          }}
          {...itemProps}
        />

        <SVGFunctionGridLines {...itemProps} />
        
        <SVGFunctionGrapher
          className="absolute top-0"
          axesProps={{ className: "" }}
          graphProps={{ className: "fill-cyan-300" }}
          functionPoints={(from, to) => {
            const res = [];
            const n = 1000;
            const deltaX = (to - from) / n;

            for (let i = 0; i < n; i++) {
              try {
                let ev = 0;
                const x = from + deltaX * i;

                if (x > integralFrom && x < integralTo) {
                  ev = solvePostfix(
                    ShuntingYard(parsedExpression),
                    from + deltaX * i,
                  ).result;
                }
                res.push(ev);
              } catch (e) {
                console.log(e);
              }
            }

            return res;
          }}
          {...itemProps}
        />
      </>
    );
  };

  return (
    <TransformationContainer className="relative" renderItem={renderGraph} />
  );
}
