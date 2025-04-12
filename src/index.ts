import parseClasses from "./tailwindParser";

export * from "./tailwindParser";

export function tw(classNames: string) {
  return parseClasses(classNames);
}

export const rnStyle = tw;
export const webStyle = tw;

export default tw;
