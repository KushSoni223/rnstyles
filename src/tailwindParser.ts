import {
  breakpoints,
  Colors,
  colors,
  FlexAlign,
  flexAlign,
  FlexJustify,
  flexJustify,
  Fonts,
  fonts,
  FontSizes,
  fontSizes,
  Spacing,
  spacing,
  Themes,
  themes,
} from "./tailwindUtils";

export type ParsedStyles = {
  [key: string]: string | number | boolean | { [key: string]: boolean }; // Allow strings, numbers, or objects with booleans for responsive styles
};

const parseClasses = (
  classNames: string,
  theme: keyof Themes = "light"
): ParsedStyles => {
  const classList = classNames.split(" ");
  const styles: ParsedStyles = {};

  const currentTheme =
    theme === "dark" ? { ...themes.dark } : { ...themes.light };
  styles.backgroundColor = currentTheme.backgroundColor;
  styles.color = currentTheme.color;

  classList.forEach((className: string) => {
    if (className.startsWith("font-")) {
      const fontKey = className.split("-")[1] as keyof Fonts;
      styles.fontFamily = fonts[fontKey] || fonts.sans;
    }

    if (className.startsWith("text-") || className.startsWith("bg-")) {
      const colorKey = className.split("-")[1] as keyof Colors;
      const colorType = className.startsWith("text-")
        ? "color"
        : "backgroundColor";
      styles[colorType] = colors[colorKey] || colorKey;
    }

    if (className.startsWith("p-")) {
      const paddingValue = className.split("-")[1] as unknown as keyof Spacing;
      styles.padding = spacing[paddingValue] || paddingValue;
    }

    if (className.startsWith("m-")) {
      const marginValue = className.split("-")[1] as unknown as keyof Spacing;
      styles.margin = spacing[marginValue] || marginValue;
    }

    if (className.startsWith("justify-")) {
      const justifyValue = className.split("-")[1] as keyof FlexJustify;
      styles.justifyContent = flexJustify[justifyValue] || justifyValue;
    }

    if (className.startsWith("items-")) {
      const alignValue = className.split("-")[1] as keyof FlexAlign;
      styles.alignItems = flexAlign[alignValue] || alignValue;
    }

    if (
      className.startsWith("sm:") ||
      className.startsWith("md:") ||
      className.startsWith("lg:")
    ) {
      const [breakpointKey, classNamePart] = className.split(":");

      if (breakpointKey in breakpoints) {
        const screenSize = breakpointKey as keyof typeof breakpoints;

        if (
          typeof styles === "object" &&
          styles !== null &&
          !Object.prototype.hasOwnProperty.call(styles, screenSize)
        ) {
          styles[screenSize] = {};
        }

        const screenStyle = styles[screenSize] as Record<string, boolean>;
        screenStyle[classNamePart] = true;
      }
    }

    if (className.startsWith("text-")) {
      const fontSizeKey = className.split("-")[1] as keyof FontSizes;
      const fallbackSize = Number(fontSizeKey); // convert "16" to 16
      styles.fontSize = fontSizes[fontSizeKey] ?? fallbackSize;
    }
  });

  return styles;
};

export default parseClasses;
