import { useMemo, useState } from "react";
import MidpointRemannSum from "./utils/functions/midpointRiemannRule";
import SimpsonRule from "./utils/functions/SimpsonRule";
import TrapezoidalRule from "./utils/functions/trapezoidalRule";
import IntegralGrapher from "./components/IntegralGrapher";
import { TokenKind } from "./utils/constants/tokenKinds";
import Parser from "./utils/classes/Parser";
import solveSyntaxTree from "./utils/functions/solveSyntaxTree";
import { SyntaxTree } from "./utils/classes/SyntaxTree";
import { SyntaxTreeKind } from "./utils/constants/syntaxTreeKinds";

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
  expression: "sin(x)",
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

export default function IntegralForm() {
  const [form, setForm] = useState<FormFields>(initialForm);
  const [errorMessage, setErrorMessage] = useState("");

  const expressionTree = useMemo(() => {
    const parser = new Parser(form.expression);
    try {
      return parser.expression();
    } catch (e) {
      setErrorMessage((e as Error).message);
    }
    return new SyntaxTree(
      SyntaxTreeKind.LITERAL,
      { col: 0, row: 0, pos: 0, str: "0", kind: TokenKind.NUMBER },
      [],
    );
  }, [form]);

  const integralSolution = useMemo(() => {
    try {
      const res = integralSolvers[form.integralSolver](
        (x) => {
          const output = solveSyntaxTree(expressionTree, x);

          return output;
        },
        form.integralFrom,
        form.integralTo,
        form.divisions,
      );
      return res;
    } catch (e) {
      setErrorMessage((e as Error).message);
      return 0;
    }
  }, [expressionTree, form]);

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
    <section className="my-auto w-full lg:gap-8 bg-cyan-800 p-8 lg:grid lg:h-fit lg:w-fit lg:grid-cols-[30rem_20rem]">
      <form
        action="/"
        onSubmit={handleSubmit}
        className="flex flex-col"
      >
        <fieldset
          name="Integral definition"
          className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2 gap-y-1"
        >
          <span className="row-span-3 row-start-1 mr-2 text-7xl">∫</span>
          <label>
            <input
              className="col-start-2 w-6 text-sm"
              type="text"
              name="integralTo"
              defaultValue={initialForm.integralTo}
              onChange={adaptInputWidth}
            />
            <span className="invisible absolute">from</span>
          </label>
          <label>
            <input
              className="col-start-2 w-0 !min-w-20 p-0 text-xl"
              type="text"
              name="expression"
              defaultValue={initialForm.expression}
              onChange={(e) => {
                setErrorMessage("");
                adaptInputWidth(e);
              }}
            />
            <span className="invisible absolute">expression</span>
          </label>
          <label>
            <input
              className="col-start-2 w-6 text-sm"
              type="text"
              name="integralFrom"
              defaultValue={initialForm.integralFrom}
              onChange={adaptInputWidth}
            />
            <span className="invisible absolute">to</span>
          </label>
          <span className="col-start-3 row-span-3 row-start-1">dx</span>
        </fieldset>

        <div className="">
          <p className="mt-4">{"result ≈ " + integralSolution}</p>
          <p className="min-h-6 text-red-300">{errorMessage}</p>
        </div>

        <fieldset
          name="Numerical integration"
          className="flex h-full flex-col"
        >
          <label className="pr-1">
            <i>n =</i>
            <input
              type="text"
              name="divisions"
              className="ml-1 w-6 bg-transparent"
              defaultValue={initialForm.divisions}
              onChange={adaptInputWidth}
            />
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="integralSolver"
              value="midpoint"
              defaultChecked
            />
            <i>Midpoint Riemann's Rule</i>
          </label>

          <label className="cursor-pointer">
            <input type="radio" name="integralSolver" value="trapezoidal" />
            <i>Trapezoidal Rule</i>
          </label>

          <label className="cursor-pointer">
            <input type="radio" name="integralSolver" value="simpsons" />
            <i>Simpson's Rule</i>
          </label>
        </fieldset>
        <button
          className="col-span-2 col-start-1 mt-auto w-full bg-cyan-950 py-2 transition-colors hover:bg-cyan-300 hover:text-cyan-900 active:bg-cyan-200 active:text-cyan-900"
          type="submit"
        >
          Calculate
        </button>
      </form>

      <article className="col-start-2 mx-auto mt-5 lg:mt-0 aspect-square w-full  border-2 border-cyan-500 bg-cyan-950">
        <IntegralGrapher
          functionEvaluation={(x) => solveSyntaxTree(expressionTree, x)}
          integralFrom={form.integralFrom}
          integralTo={form.integralTo}
        />
      </article>
    </section>
  );
}
