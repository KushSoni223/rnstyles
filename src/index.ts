import parseClasses from "./tailwindParser";
import { TailwindClasses } from "./types";

/**
 * Universal Tailwind-like utility
 * - Parses Tailwind classes to React Native styles
 */
export function tw(classNames: TailwindClasses | TailwindClasses[]): any {
  const input = Array.isArray(classNames) ? classNames.join(" ") : classNames;
  return parseClasses(input);
}

export const rnStyle = tw;

(globalThis as any).tw = tw;

export default tw;
