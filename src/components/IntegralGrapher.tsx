import SVGFunctionGrapher from "./SVGFunctionGrapher";
import SVGFunctionGridLines from "./SVGFunctionGridLines";
import TransformationContainer, {
  TransformableProps,
} from "./TransformationContainer";

export type IntegralGrapherProps = {
  functionEvaluation: (x: number) => number;
  integralFrom: number;
  integralTo: number;
};

export default function IntegralGrapher({
  functionEvaluation,
  integralFrom,
  integralTo,
}: Readonly<IntegralGrapherProps>) {
  const renderGraph = (itemProps: TransformableProps) => {
    return (
      <>
        <SVGFunctionGridLines
          {...itemProps}
          breakPointFactor={4.2}
          className="pointer-events-none absolute top-0"
          numbersClassName="fill-cyan-700 select-none"
          strokeClassName="stroke-cyan-700"
          axisClassName="stroke-cyan-300"
        />

        <SVGFunctionGrapher
          className="absolute top-0"
          graphProps={{
            className: "stroke-2 stroke-cyan-200 fill-transparent",
          }}
          functionPoints={(from, to) => {
            const res = [];
            const n = 1000;
            const deltaX = (to - from) / n;

            for (let i = 0; i < n; i++) {
              try {
                const ev = functionEvaluation(from + deltaX * i);

                res.push(ev);
              } catch (e) {
                console.log(e);
              }
            }

            return res;
          }}
          {...itemProps}
        />

        <SVGFunctionGrapher
          className="absolute top-0"
          graphProps={{ className: "fill-cyan-300 opacity-20" }}
          functionPoints={(from, to) => {
            const res = [];
            const n = 1000;
            const deltaX = (to - from) / n;

            for (let i = 0; i < n; i++) {
              try {
                let ev = 0;
                const x = from + deltaX * i;

                if (x > integralFrom && x < integralTo) {
                  ev = functionEvaluation(from + deltaX * i);
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
    <TransformationContainer
      className="relative h-full w-full cursor-move touch-none"
      renderItem={renderGraph}
      minScale={3}
      maxScale={45}
    />
  );
}
