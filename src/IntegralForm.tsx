import { Suspense, lazy, useMemo, useState } from "react";
import MidpointRemannSum from "./utils/functions/midpointRiemannRule";
import SimpsonRule from "./utils/functions/SimpsonRule";
import TrapezoidalRule from "./utils/functions/trapezoidalRule";
import { TokenKind } from "./utils/constants/tokenKinds";
import Parser from "./utils/classes/Parser";
import { SyntaxTree } from "./utils/classes/SyntaxTree";
import { SyntaxTreeKind } from "./utils/constants/syntaxTreeKinds";
import ChartIcon from "@/assets/chart.svg";
import solveSyntaxTree from "./utils/functions/solveSyntaxTree";

const LazyIntegralGrapher = lazy(() => import("@/components/IntegralGrapher"));

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

const integralSolverToLabel: { [key: string]: string } = {
  midpoint: "Midpoint Rule",
  trapezoidal: "Trapezoidal Rule",
  simpsons: "Simpson's Rule",
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
    setErrorMessage("");
    const parser = new Parser(form.expression);
    try {
      return parser.expression();
    } catch (e) {
      setErrorMessage((e as Error).message);
    }
    return new SyntaxTree(
      SyntaxTreeKind.LITERAL,
      { col: 0, row: 0, pos: 0, str: "NaN", kind: TokenKind.NUMBER },
      [],
    );
  }, [form]);

  const integralSolution = useMemo(() => {
    try {
      if (expressionTree.getToken().str === "NaN") return NaN;
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
      return NaN;
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
    <section id="calculator" aria-labelledby="calculator-title">
      <h2
        className="sr-only mb-12 flex items-center gap-4 after:h-px after:w-full after:bg-white"
        id="calculator-title"
      >
        <span className="shrink-0 text-xs uppercase">Calculator</span>
      </h2>
      <div className="my-auto w-full lg:grid lg:h-fit lg:w-fit lg:grid-cols-[3fr_2fr] lg:gap-6">
        <form
          action="/"
          onSubmit={handleSubmit}
          className="flex flex-col rounded-lg p-6"
        >
          <fieldset
            name="Integral definition"
            className="mb-8 grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1"
          >
            <legend className="mb-6 text-xs font-extralight uppercase tracking-widest dark:text-neutral/70">
              Integral definition
            </legend>
            <span className="row-span-3 mr-2 place-self-center pb-[0.25em] pl-2 text-7xl leading-none">
              ∫
            </span>
            <label>
              <input
                className="col-start-2 box-content w-5 min-w-5 border-2 border-neutral/10 bg-transparent text-center text-sm italic text-neutral/80 outline-none focus:bg-neutral/10"
                type="text"
                name="integralTo"
                defaultValue={initialForm.integralTo}
                onChange={adaptInputWidth}
              />
              <span className="sr-only">Lower limit</span>
            </label>
            <label>
              <input
                className="col-start-2 box-content w-0 min-w-20 border-2 border-neutral/10 bg-transparent p-0 text-center text-2xl italic text-neutral/80 outline-none focus:bg-neutral/10"
                type="text"
                name="expression"
                defaultValue={initialForm.expression}
                onChange={(e) => {
                  adaptInputWidth(e);
                }}
              />
              <i className="ml-2">dx</i>
              <span className="sr-only">Function to integrate</span>
            </label>
            <label>
              <input
                className="col-start-2 box-content w-5 min-w-5 border-2 border-neutral/10 bg-transparent text-center text-sm italic text-neutral/80 outline-none focus:bg-neutral/10"
                type="text"
                name="integralFrom"
                defaultValue={initialForm.integralFrom}
                onChange={adaptInputWidth}
              />
              <span className="sr-only">Upper limit</span>
            </label>

            <p className="col-span-2 mb-2 mt-2 min-h-6 text-sm font-light dark:text-neutral/70">
              * For supported functions, please check the{" "}
              <a className="underline" href="#how-to-use">
                How to use
              </a>{" "}
              section.
            </p>
          </fieldset>

          <fieldset className="mb-12 grid grid-cols-3 gap-x-3">
            <legend className="mb-6 text-xs font-extralight uppercase tracking-widest dark:text-neutral/70">
              Numerical Integration
            </legend>

            {[
              [
                "trapezoidal",
                "Trapezoidal Rule",
                "Simplest to implement, with the least accuracy.",
              ],
              ["midpoint", "Midpoint Rule", "Better accuracy the bigger n is."],
              [
                "simpsons",
                "Simpson's Rule",
                "Highest accuracy. Best for curved functions.",
              ],
            ].map(([value, label, description], index) => (
              <label
                className="group relative flex w-full cursor-pointer flex-col items-center rounded-md bg-neutral/5 px-1 py-4 transition-colors focus-within:bg-primary/40 dark:focus-within:bg-transparent"
                key={value}
              >
                <input
                  type="radio"
                  className="absolute inset-0 -z-10 appearance-none rounded-md bg-gradient-to-tr from-primary/30 to-primary opacity-0 transition-opacity duration-200 checked:opacity-65 focus:opacity-100 dark:to-secondary dark:checked:opacity-25 dark:focus:opacity-55 [&:not(:checked)]:hover:opacity-20 dark:[&:not(:checked)]:hover:opacity-10"
                  name="integralSolver"
                  value={value}
                  aria-labelledby={value + "-label"}
                  aria-describedby={value + "-description"}
                  defaultChecked={index === 0}
                />
                <img
                  src={ChartIcon}
                  alt="chart"
                  className="mb-2 size-6 shrink-0"
                />
                <strong
                  className="mb-1 shrink-0 text-balance text-center text-sm font-semibold"
                  id={value + "-label"}
                >
                  {label}
                </strong>
                <p
                  className="text-balance text-center text-xs font-light"
                  id={value + "-description"}
                >
                  {description}
                </p>
              </label>
            ))}

            <label className="mt-4 pr-1">
              <strong id="divisions-label">Divisions: </strong>
              <input
                type="text"
                name="divisions"
                aria-labelledby="divisions-label"
                aria-describedby="divisions-description"
                className="mb-1 ml-1 box-content w-5 min-w-5 border-2 border-neutral/10 bg-transparent text-center italic text-neutral/80 outline-none focus:bg-neutral/10"
                defaultValue={initialForm.divisions}
                onChange={adaptInputWidth}
              />
              <br />
              <p
                id="divisions-description"
                className="sr-only text-sm font-light"
              >
                Number of divisions to use in the numerical integration.
              </p>
            </label>
          </fieldset>

          <button
            className="font group relative isolate col-span-2 col-start-1 mt-auto w-full transition-colors before:absolute before:left-0 before:right-0 before:top-1/4 before:-z-10 before:h-full before:rounded-full before:bg-gradient-to-r before:from-secondary before:to-secondary before:opacity-5 before:blur-lg before:transition-opacity before:content-[''] hover:before:opacity-20 focus:outline-none focus:before:opacity-30 dark:text-background"
            type="submit"
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg px-10 py-2 text-lg font-medium before:absolute before:inset-0 before:-right-1/2 before:-z-10 before:bg-gradient-to-r before:from-primary before:from-30% before:to-secondary before:transition-transform before:content-[''] hover:before:-translate-x-1/4 group-focus:before:-translate-x-1/4">
              Calculate It!
            </div>
          </button>
        </form>
        <article className="col-start-2 mx-auto mt-5 flex h-full w-full flex-col gap-10 place-self-center lg:mt-0">
          <div className="flex h-full flex-col rounded-lg bg-gradient-to-tr from-transparent from-30% to-secondary/50 p-6 pb-3 dark:to-secondary/10">
            <header>
              <h3 className="text-xs font-extralight uppercase tracking-widest dark:text-neutral/70">
                Integral Result
              </h3>
              <p className="mb-1 text-balance text-end text-xl font-bold leading-none text-neutral">
                {form.expression}
              </p>
            </header>
            <p className="text-balance text-end text-xs font-extralight leading-none tracking-widest">
              From <i>{form.integralFrom}</i> to <i>{form.integralTo}</i>.
              <br />
              {integralSolverToLabel[form.integralSolver]}, {form.divisions}{" "}
              divisions.
            </p>

            <p className="mt-auto pt-3 text-end text-lg text-primary">
              <i>
                {isNaN(integralSolution) ? (
                  <span className="font-semibold text-red-400">
                    Unable to calculate
                  </span>
                ) : (
                  integralSolution
                )}
              </i>
            </p>
            <p className="text-xs text-end tracking-wide text-red-400">
              {errorMessage}
            </p>
          </div>
          <div className="aspect-square w-full shrink-0 overflow-hidden rounded-md">
            <Suspense
              fallback={
                <div className="aspect-square w-full rounded-md bg-neutral/5" />
              }
            >
              <LazyIntegralGrapher
                functionEvaluation={(x: number) => {
                  if (errorMessage !== "") {
                    return 0;
                  }
                  return solveSyntaxTree(expressionTree, x);
                }}
                integralFrom={form.integralFrom}
                integralTo={form.integralTo}
              />
            </Suspense>
          </div>
        </article>
      </div>
    </section>
  );
}
