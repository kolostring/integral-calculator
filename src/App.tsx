import { useState } from "react";
import solvePostfix from "./services/expressionSolver/postfixSolver";
import ShuntingYard from "./services/expressionSolver/ShuntingYard";
import MidpointRemannSum from "./services/integralSolver/midpointRiemannRule";
import SimpsonRule from "./services/integralSolver/SimpsonRule";
import TrapezoidalRule from "./services/integralSolver/trapezoidalRule";
import IntegralGrapher from "./components/IntegralGrapher";

const integralSolvers = {
  midpoint: MidpointRemannSum,
  trapezoidal: TrapezoidalRule,
  simpsons: SimpsonRule,
};

type FormFields = {
  expression: string;
  integralFrom: number;
  integralTo: number;
  divisions: number;
  integralSolver: "midpoint" | "trapezoidal" | "simpsons";
};

const initialForm: FormFields = {
  expression: "",
  integralFrom: 0,
  integralTo: 9,
  divisions: 5,
  integralSolver: "midpoint",
};

const adaptInputWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
  const target = event.target;

  target.style.width = "0px";
  target.style.width = target.scrollWidth + "px";
};

function App() {
  const [form, setForm] = useState<FormFields>(initialForm);

  const parseExpression = (exp: string) => {
    const modexp = exp.replace(`/(?<=[+-*/^()]|^)-/g`, "!");
    const regex = /([-+*/^()!])|\b(sin|cos|tan|sqrt|ln|x|e)\b|\b\d+(\.\d+)?\b/g;
    const express: string[] = [];
    let match;

    while ((match = regex.exec(modexp)) !== null) {
      express.push(match[0]);
    }
    
    return express.length > 0? express: ["0"];
  };

  const getNamedItem = (
    formElements: HTMLFormControlsCollection,
    name: string,
  ) => {
    const control = formElements.namedItem(name);
    if (!control || !("value" in control)) {
      throw new Error(`Valid form control of name: "${name}" not found`);
    }

    return control;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;
    const integralSolver = getNamedItem(formElements, "integralSolver").value;

    setForm({
      expression: getNamedItem(formElements, "expression").value,
      integralFrom: Number.parseFloat(
        getNamedItem(formElements, "integralFrom").value,
      ),
      integralTo: Number.parseFloat(
        getNamedItem(formElements, "integralTo").value,
      ),
      divisions: Number.parseInt(getNamedItem(formElements, "divisions").value),
      integralSolver: integralSolver as "midpoint" | "trapezoidal" | "simpsons",
    });
  };

  return (
    <main className="container mx-auto flex h-[100svh] items-center justify-center lg:px-5">
      <section className="my-auto w-full gap-8 bg-cyan-800 p-8 lg:grid lg:w-fit lg:grid-cols-[30rem_20rem] lg:grid-rows-[auto_auto]">
        <form action="/" onSubmit={handleSubmit}>
          <div className="flex h-min font-math font-normal">
            <p className="mb-4 mr-2 text-7xl">∫</p>
            <div className="flex-col">
              <input
                className="text-sm"
                type="text"
                name="integralTo"
                defaultValue={initialForm.integralTo}
                onChange={adaptInputWidth}
              />
              <div className="my-auto flex w-fit flex-wrap text-xl">
                <input
                  className="p-0"
                  type="text"
                  name="expression"
                  defaultValue={initialForm.expression}
                  onChange={adaptInputWidth}
                />
                <p className="ml-1">dx</p>
                <p className="ml-1 shrink-0">
                  {" ≈ "}
                  {integralSolvers[form.integralSolver](
                    (x) =>
                      solvePostfix(
                        ShuntingYard(parseExpression(form.expression)),
                        x,
                      ).result,
                    form.integralFrom,
                    form.integralTo,
                    form.divisions,
                  )}
                </p>
              </div>
              <input
                className="text-sm"
                type="text"
                name="integralFrom"
                defaultValue={initialForm.integralFrom}
                onChange={adaptInputWidth}
              />
            </div>
          </div>

          <div className="col-start-1 my-8">
            <h2 className="text-xl font-medium">Numerical Integration:</h2>
            <label className="pr-1 text-end">
              <i>n =</i>
              <input
                type="text"
                name="divisions"
                className="bg-transparent"
                defaultValue={initialForm.divisions}
                onChange={adaptInputWidth}
              />
            </label>
            <div className="">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="integralSolver"
                  value="midpoint"
                  defaultChecked
                />
                <i>Midpoint Riemann's Rule</i>
              </label>
            </div>

            <div className="">
              <label className="cursor-pointer">
                <input type="radio" name="integralSolver" value="trapezoidal" />
                <i>Trapezoidal Rule</i>
              </label>
            </div>

            <div className="">
              <label className="cursor-pointer">
                <input type="radio" name="integralSolver" value="simpsons" />
                <i>Simpson's Rule</i>
              </label>
            </div>

            <button
              className="mt-2 w-full bg-cyan-950 py-2 transition-colors hover:bg-cyan-300 hover:text-cyan-900 active:bg-cyan-200 active:text-cyan-900"
              type="submit"
            >
              Calculate
            </button>
          </div>
        </form>

        <div className="col-start-2 row-span-2 row-start-1 mx-auto box-content aspect-square w-full border-2 border-cyan-500 bg-cyan-950">
          <IntegralGrapher
            parsedExpression={parseExpression(form.expression)}
            integralFrom={form.integralFrom}
            integralTo={form.integralTo}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
