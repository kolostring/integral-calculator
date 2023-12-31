import { useState } from "react";
import SVGGraphTransformator from "./components/SVGGRaphTransformator";
import solvePostfix from "./services/expressionSolver/postfixSolver";
import ShuntingYard from "./services/expressionSolver/ShuntingYard";
import SVGFunctionGrapher from "./components/SVGFunctionGrapher";
import MidpointRemannSum from "./services/integralSolver/midpointRiemannRule";
import SimpsonRule from "./services/integralSolver/SimpsonRule";
import TrapezoidalRule from "./services/integralSolver/trapezoidalRule";

const integralSolvers = [MidpointRemannSum, TrapezoidalRule, SimpsonRule];

function App() {
  const [expression, setExpression] = useState("");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(9);
  const [divisions, setDivisions] = useState(5);
  const [integralSolver, setIntegralSolver] = useState(0);
  const [integral, setIntegral] = useState(0);
  const [graphNode, setGraphNode] = useState<React.JSX.Element>(<></>);

  const parseExpression = (exp: string) => {
    const modexp = exp.replace(/(?<=[+\-*/^()]|^)-/g, "!");
    const regex = /([-+*/^()!])|\b(sin|cos|tan|sqrt|ln|x|e)\b|\b\d+(\.\d+)?\b/g;
    const express: string[] = [];
    let match;

    while ((match = regex.exec(modexp)) !== null) {
      express.push(match[0]);
    }

    return express;
  };

  const buildGraph = () => {
    return (
      <SVGFunctionGrapher
        className="w-full h-full"
        scale={10}
        position={{ x: 0, y: 0 }}
        from={from}
        to={to}
        axesProps={{ className: "stroke-cyan-500" }}
        graphProps={{ className: "stroke-cyan-300 fill-cyan-900" }}
        functionPoints={(() => {
          const res = [];
          const n = 1000;
          const deltaX = (to - from) / n;

          for (let i = 0; i < n; i++) {
            try {
              const ev = solvePostfix(
                ShuntingYard(parseExpression(expression)),
                from + deltaX * i
              ).result;
              res.push(ev);
            } catch (e) {
              console.log(e);
            }
          }

          return res;
        })()}
      />
    );
  };

  return (
    <main className="flex items-center justify-center container lg:px-5 mx-auto h-[100svh]">
      <section className="p-8 my-auto bg-cyan-800 w-full lg:w-fit lg:grid lg:grid-rows-[auto_auto] lg:grid-cols-[30rem_20rem] gap-8">
        <div className="flex font-math font-normal h-min">
          <h1 className="mb-4 mr-2 text-7xl">∫</h1>
          <div className="flex-col">
            <input
              className="text-sm"
              type="text"
              id="to"
              defaultValue={to}
              min={from}
              onChange={(event) => {
                const target = event.target;
                const value = Math.max(parseFloat(target.value), from);
                if (!isNaN(value)) {
                  setTo(value);
                }

                target.style.width = "0px";
                target.style.width = target.scrollWidth + "px";
              }}
              onBlur={(event) => {
                const target = event.target;
                target.value = to + "";
                target.style.width = "0px";
                target.style.width = target.scrollWidth + "px";
              }}
            />
            <div className="flex flex-wrap my-auto text-xl w-fit">
              <input
                className="p-0"
                type="text"
                id="expression"
                onBlur={(event) => {
                  setExpression(event.target.value);
                }}
                onChange={(event) => {
                  const target = event.target;
                  target.style.width = "0px";
                  target.style.width = target.scrollWidth + "px";
                }}
              />
              <p className="ml-1">dx</p>
              <p className="ml-1 shrink-0"> ≈ {integral}</p>
            </div>
            <input
              className="text-sm"
              type="text"
              id="from"
              defaultValue={from}
              max={to}
              onChange={(event) => {
                const target = event.target;
                const value = Math.min(parseFloat(target.value), to);
                if (!isNaN(value)) {
                  setFrom(value);
                }

                target.style.width = "0px";
                target.style.width = target.scrollWidth + "px";
              }}
              onBlur={(event) => {
                const target = event.target;
                target.value = from + "";
                target.style.width = "0px";
                target.style.width = target.scrollWidth + "px";
              }}
            />
          </div>
        </div>

        <div className="col-start-1 my-8 ">
          <h1 className="text-xl font-medium">Numerical Integration:</h1>
          <label className="pr-1 text-end" htmlFor="to">
            n =
          </label>
          <input
            type="text"
            id="divisions"
            className="bg-transparent"
            min={integralSolver === 2 ? 2 : 1}
            step={integralSolver === 2 ? 2 : 1}
            defaultValue={divisions}
            onChange={(event) => {
              const target = event.target;
              let value = Math.max(parseInt(target.value), 1);

              if (!isNaN(value)) {
                if (integralSolver === 2) {
                  value += value % 2;
                }

                setDivisions(value);
              }

              target.style.width = "0px";
              target.style.width = target.scrollWidth + "px";
            }}
            onBlur={(event) => {
              const target = event.target;
              target.value = divisions + "";
              target.style.width = "0px";
              target.style.width = target.scrollWidth + "px";
            }}
          />
          <div className="">
            <input
              type="radio"
              checked={integralSolver === 0}
              onChange={() => setIntegralSolver(0)}
              id="midpoint"
            />
            <label className="cursor-pointer" htmlFor="midpoint">
              Midpoint Riemann's Rule
            </label>
          </div>

          <div className="">
            <input
              type="radio"
              checked={integralSolver === 1}
              onChange={() => setIntegralSolver(1)}
              id="trapezoidal"
            />
            <label className="cursor-pointer" htmlFor="trapezoidal">
              Trapezoidal Rule
            </label>
          </div>

          <div className="">
            <input
              type="radio"
              checked={integralSolver === 2}
              onChange={() => {
                setIntegralSolver(2);
                setDivisions(divisions + (divisions % 2));
              }}
              id="simpson"
            />
            <label className="cursor-pointer" htmlFor="simpson">
              Simpson's Rule
            </label>
          </div>

          <button
            className="w-full bg-cyan-950 hover:bg-cyan-300 hover:text-cyan-900 active:bg-cyan-200 active:text-cyan-900 transition-colors py-2 mt-2"
            onClick={() => {
              setGraphNode(buildGraph());
              const exp = ShuntingYard(parseExpression(expression));
              setIntegral(
                integralSolvers[integralSolver](
                  (x) => {
                    return solvePostfix(exp, x).result;
                  },
                  from,
                  to,
                  divisions
                )
              );
            }}
          >
            Calculate
          </button>
        </div>

        <div className="box-content col-start-2 row-span-2 row-start-1 border-2 mx-auto bg-cyan-950 border-cyan-500 w-full aspect-square">
          <SVGGraphTransformator className="overflow-hidden relative">
            {graphNode}
          </SVGGraphTransformator>
        </div>
      </section>
    </main>
  );
}

export default App;
