import { useState } from "react";
import SVGGraphTransformator from "./components/SVGGRaphTransformator";
import solvePostfix from "./services/expressionSolver/postfixSolver";
import ShuntingYard from "./services/expressionSolver/ShuntingYard";
import SVGFunctionGrapher from "./components/SVGFunctionGrapher";

function App() {
  const [expression, setExpression] = useState("");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [graphNode, setGraphNode] = useState<React.JSX.Element>(<></>);

  const buildGraph = () => {
    return (
      <SVGFunctionGrapher
        className="h-96 w-96 bg-slate-500"
        scale={10}
        position={{ x: 0, y: 0 }}
        from={from}
        to={to}
        axesProps={{ stroke: "black" }}
        graphProps={{ stroke: "blue", fill: "blue" }}
        functionPoints={(() => {
          const modexp = expression.replace(/(?<=[+\-*/^()]|^)-/g, "!");
          const regex =
            /([-+*/^()!])|\b(sin|cos|tan|sqrt|ln|x|e)\b|\b\d+(\.\d+)?\b/g;
          const express: string[] = [];
          let match;

          while ((match = regex.exec(modexp)) !== null) {
            express.push(match[0]);
          }

          const res = [];
          const n = 1000;
          const deltaX = (to - from) / n;

          for (let i = 0; i < n; i++) {
            try {
              const ev = solvePostfix(
                ShuntingYard(express),
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
    <>
      <input
        type="text"
        onBlur={(event) => {
          setFrom(parseFloat(event.target.value));
        }}
      />
      <input
        type="text"
        onBlur={(event) => {
          setTo(parseFloat(event.target.value));
        }}
      />
      <input
        type="text"
        onBlur={(event) => {
          setExpression(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setGraphNode(buildGraph());
        }}
      >
        Calcular
      </button>

      <div>
        <SVGGraphTransformator>{graphNode}</SVGGraphTransformator>
      </div>
    </>
  );
}

export default App;
