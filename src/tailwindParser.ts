import {
  breakpoints,
  Colors,
  colors,
  flexAlign,
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
  [key: string]: string | number | boolean | { [key: string]: boolean };
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

  classList.forEach((cls: string) => {
    if (cls.startsWith("font-")) {
      const fontKey = cls.split("-")[1] as keyof Fonts;
      styles.fontFamily = fonts[fontKey] || fonts.sans;
    }

    if (cls.startsWith("text-") || cls.startsWith("bg-")) {
      const colorKey = cls.split("-")[1] as keyof Colors;
      const colorType = cls.startsWith("text-") ? "color" : "backgroundColor";
      styles[colorType] = colors[colorKey] || colorKey;
    }

    if (cls.startsWith("p-")) {
      const paddingValue = cls.split("-")[1] as unknown as keyof Spacing;
      styles.padding = spacing[paddingValue] || paddingValue;
    }

    if (cls.startsWith("m-")) {
      const marginValue = cls.split("-")[1] as unknown as keyof Spacing;
      styles.margin = spacing[marginValue] || marginValue;
    }

    if (cls.startsWith("justify-")) {
      const justifyKey = cls.split("-")[1];
      if (justifyKey in flexJustify) {
        styles.justifyContent =
          flexJustify[justifyKey as keyof typeof flexJustify];
      }
    }

    if (cls.startsWith("items-")) {
      const alignKey = cls.split("-")[1];
      if (alignKey in flexAlign) {
        styles.alignItems = flexAlign[alignKey as keyof typeof flexAlign];
      }
    }

    if (/^(m[trblxy]?)-(\d+)$/.test(cls)) {
      const [, dir, val] = cls.match(/^(m[trblxy]?)-(\d+)$/)!;
      const v = spacing[val as unknown as keyof typeof spacing];
      switch (dir) {
        case "m":
          styles.margin = v;
          break;
        case "mt":
          styles.marginTop = v;
          break;
        case "mb":
          styles.marginBottom = v;
          break;
        case "ml":
          styles.marginLeft = v;
          break;
        case "mr":
          styles.marginRight = v;
          break;
        case "mx":
          styles.marginLeft = v;
          styles.marginRight = v;
          break;
        case "my":
          styles.marginTop = v;
          styles.marginBottom = v;
          break;
      }
    }

    if (/^(p[trblxy]?)-(\d+)$/.test(cls)) {
      const [, dir, val] = cls.match(/^(p[trblxy]?)-(\d+)$/)!;

      const spacingValue =
        spacing[val as unknown as keyof typeof spacing] ?? Number(val);

      switch (dir) {
        case "p":
          styles.padding = spacingValue;
          break;
        case "pt":
          styles.paddingTop = spacingValue;
          break;
        case "pb":
          styles.paddingBottom = spacingValue;
          break;
        case "pl":
          styles.paddingLeft = spacingValue;
          break;
        case "pr":
          styles.paddingRight = spacingValue;
          break;
        case "px":
          styles.paddingLeft = spacingValue;
          styles.paddingRight = spacingValue;
          break;
        case "py":
          styles.paddingTop = spacingValue;
          styles.paddingBottom = spacingValue;
          break;
      }
    }

    if (/^gap(-(x|y))?-(\d+)$/.test(cls)) {
      const match = cls.match(/^gap(?:-(x|y))?-(\d+)$/);

      if (Array.isArray(match)) {
        const direction = match[1] as "x" | "y" | undefined;
        const key = match[2];
        const value =
          spacing[key as unknown as keyof typeof spacing] ?? Number(key);

        if (direction === "x") {
          styles.columnGap = value;
        } else if (direction === "y") {
          styles.rowGap = value;
        } else {
          styles.gap = value;
        }
      }
    }

    if (cls === "flex") {
      styles.display = "flex";
    }

    if (cls === "flex-row") {
      styles.flexDirection = "row";
    }

    if (cls === "flex-col") {
      styles.flexDirection = "column";
    }

    if (/^items-(start|center|end)$/.test(cls)) {
      const alignments = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
      } as const;
      const key = cls.split("-")[1];
      if (key in alignments) {
        styles.alignItems = alignments[key as keyof typeof alignments];
      }
    }

    if (/^justify-(start|center|end|between|around)$/.test(cls)) {
      const justifies = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        between: "space-between",
        around: "space-around",
      } as const;
      const key = cls.split("-")[1];
      if (key in justifies) {
        styles.justifyContent = justifies[key as keyof typeof justifies];
      }
    }

    if (/^font-(light|normal|medium|bold)$/.test(cls)) {
      const weights = {
        light: "300",
        normal: "400",
        medium: "500",
        bold: "700",
      } as const;
      const key = cls.split("-")[1];
      if (key in weights) {
        styles.fontWeight = weights[key as keyof typeof weights];
      }
    }

    if (/^object-(cover|contain|fill|center|top|bottom)$/.test(cls)) {
      const mode = cls.split("-")[1];
      styles.resizeMode = mode === "center" ? "center" : mode;
    }

    if (
      cls.startsWith("sm:") ||
      cls.startsWith("md:") ||
      cls.startsWith("lg:")
    ) {
      const [breakpointKey, classNamePart] = cls.split(":");
      if (breakpointKey in breakpoints) {
        const screenSize = breakpointKey as keyof typeof breakpoints;
        if (!styles[screenSize]) {
          styles[screenSize] = {};
        }
        (styles[screenSize] as Record<string, boolean>)[classNamePart] = true;
      }
    }

    if (cls.startsWith("text-")) {
      const fontSizeKey = cls.split("-")[1] as keyof FontSizes;
      const fallbackSize = Number(fontSizeKey);
      styles.fontSize = fontSizes[fontSizeKey] ?? fallbackSize;
    }
  });

  return styles;
};

export default parseClasses;
