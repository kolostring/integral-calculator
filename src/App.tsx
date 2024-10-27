import IntegralForm from "@/IntegralForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="content-grid font-body text-text">
      <Navbar />

      <header id="hero" className="scroll">
        <h1 className="sr-only mb-8 bg-gradient-to-r from-neutral/80 to-primary bg-clip-text text-center font-display text-4xl tracking-tight">
          <span className="leading-tighter text-xl tracking-widest text-primary/80">
            integrals
          </span>
          <br />
          <span className="text-secondary">i</span>
          <span className="text-transparent">Calculate</span>
        </h1>
      </header>

      <main>
        <IntegralForm id="calculator" className="isolate mb-24" />

        <section
          id="how-to-use"
          aria-labelledby="how-to-use-header"
          className="mb-24"
        >
          <h2 id="how-to-use-header" className="mb-4 text-3xl font-bold">
            How to use
          </h2>
          <p className="text-balance">
            Just enter the expression to evaluate, the integral limits and
            select a numerical integration method. The aproximated result and an
            interactive graph will be displayed.
          </p>
          <br />

          <article>
            <h3 className="col-span-3">
              You can build your expressions using:
            </h3>

            <ul className="list-inside list-disc">
              <li>Arithmetic operators (+, -, *, /, ^).</li>
              <li>Parentheses for grouping ( ).</li>
              <li>Root functions (sqrt, cbrt).</li>
              <li>Logarithms functions (ln, log10, log2)</li>
              <li>Trigonometric functions (sin, cos, tan, asin, acos, atan)</li>
              <li>Computer functions (abs, sign, round, floor, ceil)</li>
              <li>Constants (pi, e)</li>
            </ul>
          </article>

          <br />

          <p className="text-balance">
            Functions, such as trigonometric functions or logarithms, are
            required to be followed by parentheses. <code>Eg. sin(x).</code>.
          </p>
        </section>

        <section id="about" aria-labelledby="about-header" className="mb-24">
          <h2 id="about-header" className="mb-4 text-3xl font-bold">
            About
          </h2>
          <p>
            This web calculator is a personal project of mine as a way of
            learning and improving my frontend development related skills. It is
            designed to help users calculate definite integrals of mathematical
            functions. It provides a simple and user-friendly interface for
            entering integral definitions and selecting the numerical
            integration method. Available integration methods are{" "}
            <i>Midpoint Riemann's Rule</i>, <i>Trapezoidal Rule</i>, and{" "}
            <i>Simpson's Rule</i> to perform the integration.
          </p>
          <br />
          <p>
            In order to know more about the numerical integration, you can read
            this{" "}
            <a
              className="underline"
              href="https://en.wikipedia.org/wiki/Numerical_integration"
            >
              wikipedia article
            </a>
            {""}.
          </p>
          <br />
        </section>

        <section
          id="contact"
          aria-labelledby="contact-header"
          className="mb-24"
        >
          <h2 id="contact-header" className="mb-4 text-3xl font-bold">
            Contact
          </h2>
          <p>
            If you have any questions or suggestions, please feel free to send
            me an email at{" "}
            <a
              className="underline"
              href="mailto:yoerodriguezjunior@gmail.com"
              target="_blank"
            >
              yoerodriguezjunior@gmail.com
            </a>
            {""}.
          </p>

          <br />
          <p>
            You can also check out my other projects on my{" "}
            <a
              className="underline"
              href="https://github.com/kolostring"
              target="_blank"
            >
              GitHub
            </a>{" "}
            or connect with me on{" "}
            <a
              className="underline"
              href="https://www.linkedin.com/in/yoel-rodriguez-99615a310/"
              target="_blank"
            >
              LinkedIn
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
