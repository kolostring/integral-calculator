import LightIcon from "@/assets/light-mode.svg?react";
import DarkIcon from "@/assets/dark-mode.svg?react";
import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

type DarkModeSwitchProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export default function DarkModeSwitch({
  className,
  ...props
}: DarkModeSwitchProps) {
  return (
    <label
      {...props}
      className={`${className} relative flex h-7 w-14 cursor-pointer overflow-hidden rounded-full bg-primary/10 p-1 dark:bg-secondary/10`}
    >
      <input
        role="switch"
        type="checkbox"
        className="aspect-square h-full cursor-pointer appearance-none rounded-full bg-primary/80 transition-all dark:translate-x-7 dark:bg-secondary/60"
        onClick={(event) => {
          const isDark = document.documentElement.classList.contains("dark");
          event.currentTarget.checked = !isDark;

          document.documentElement.classList.toggle("dark");
        }}
      />
      <span className="sr-only">Toggle dark mode</span>

      <div className="absolute bottom-1 left-1 top-1 translate-y-full opacity-0 transition-all dark:translate-y-0 dark:opacity-100 [&>svg]:h-5">
        <DarkIcon />
      </div>
      <div className="absolute bottom-1 right-1 top-1 opacity-100 transition-all dark:translate-y-full dark:opacity-0 [&>svg]:h-5 [&>svg]:fill-primary">
        <LightIcon />
      </div>
    </label>
  );
}
