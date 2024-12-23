import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeClassNames = (...args: Parameters<typeof clsx>) => {
  return twMerge(clsx(...args));
};
