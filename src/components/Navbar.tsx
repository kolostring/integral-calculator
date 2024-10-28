import useScroll from "@/hooks/useScroll";
import DarkModeSwitch from "./DarkModeSwitch";
import Menu from "@/assets/menu.svg?react";
import Close from "@/assets/close.svg?react";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

export default function Navbar() {
  const { scrollPosition } = useScroll(100, 100);
  const lastScrollPosition = useRef(scrollPosition);
  const isShown = useMemo(
    () => lastScrollPosition.current - scrollPosition >= 0,
    [scrollPosition],
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    lastScrollPosition.current = scrollPosition;
  }, [scrollPosition]);

  return (
    <div
      className={`full-width sticky top-0 z-50 mb-12 bg-background backdrop-blur-md transition-transform md:bg-background/50 ${isShown ? "translate-y-0" : "-translate-y-full"}`}
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

        <div className="relative order-last w-full md:order-none">
          <button
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            className="relative ml-auto flex h-6 w-6 md:hidden"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <Close
              className={`absolute fill-secondary transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`}
            />
            <Menu
              className={`absolute fill-secondary transition-all ${!isMenuOpen ? "rotate-0 opacity-100" : "rotate-180 opacity-0"}`}
            />
          </button>

          <div
            className={`absolute right-0 grid w-max grid-rows-[0fr] flex-col transition-[grid-template-rows_500ms_ease-in-out] md:static md:w-full md:grid-rows-[1fr] [button[aria-expanded="true"]_+_&]:grid-rows-[1fr] ${!isShown ? "!grid-rows-[0fr]" : ""}`}
          >
            <div className="ml-auto overflow-hidden">
              <ul
                id="primary-navigation"
                className="flex w-full flex-col items-end gap-4 rounded-lg border border-primary/40 bg-background p-4 pl-14 md:flex-row md:items-center md:gap-8 md:border-none md:bg-transparent md:p-0"
              >
                <li>
                  <a
                    className="text-xs uppercase underline-offset-4 hover:underline md:inline"
                    href="/integral-calculator/#how-to-use"
                  >
                    How to use
                  </a>
                </li>
                <li>
                  <a
                    className="text-xs uppercase underline-offset-4 hover:underline md:inline"
                    href="/integral-calculator/#about"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    className="pb-4 text-xs uppercase underline-offset-4 hover:underline md:inline md:pb-0"
                    href="/integral-calculator/#contact"
                  >
                    Contact
                  </a>
                </li>
                <br />
                <DarkModeSwitch />
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
