import useScroll from "@/hooks/useScroll";
import DarkModeSwitch from "./DarkModeSwitch";
import { useLayoutEffect, useMemo, useRef } from "react";

export default function Navbar() {
  const { scrollPosition } = useScroll(100, 100);
  const lastScrollPosition = useRef(scrollPosition);
  const isShown = useMemo(
    () => lastScrollPosition.current - scrollPosition > 0,
    [scrollPosition],
  );

  useLayoutEffect(() => {
    lastScrollPosition.current = scrollPosition;
  }, [scrollPosition]);

  return (
    <div
      className={`full-width sticky top-0 z-50 mb-12 bg-background/50 backdrop-blur-md transition-transform ${isShown ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="flex items-center justify-center gap-8 py-4 text-sm tracking-wide text-secondary">
        <a href="/integral-calculator/#calculator">
          <span className="mb-8 bg-gradient-to-r from-neutral/80 to-primary bg-clip-text text-center font-display text-xl leading-none">
            <span className="text-sm tracking-widest text-primary/80">
              integrals
            </span>
            <br />
            <span className="text-secondary">i</span>
            <span className="text-transparent">Calculate</span>
          </span>
        </a>
        <a className="uppercase" href="/integral-calculator/#how-to-use">
          How to use
        </a>
        <a className="uppercase" href="/integral-calculator/#about">
          About
        </a>
        <a className="uppercase" href="/integral-calculator/#contact">
          Contact
        </a>
        <DarkModeSwitch className="ml-auto" />
      </nav>
    </div>
  );
}
