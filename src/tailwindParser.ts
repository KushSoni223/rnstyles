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
  [key: string]:
    | string
    | number
    | boolean
    | { [key: string]: boolean }
    | ParsedStyles;
};

const parseClasses = (
  classNames: string,
  theme: keyof Themes = "light"
): ParsedStyles => {
  const classList = classNames.split(/\s+/);
  const styles: ParsedStyles = {};

  const currentTheme =
    theme === "dark" ? { ...themes.dark } : { ...themes.light };
  styles.backgroundColor = currentTheme.backgroundColor;
  styles.color = currentTheme.color;

  classList.forEach((cls: string) => {
    if (!cls.trim()) return;

    if (cls.startsWith("font-")) {
      const fontKey = cls.split("-")[1] as keyof Fonts;
      styles.fontFamily = fonts[fontKey] || fonts.sans;
    }

    if (cls.startsWith("text-") || cls.startsWith("bg-")) {
      const parts = cls.split("-");
      const colorKey = parts[1] as keyof Colors;
      const colorType = cls.startsWith("text-") ? "color" : "backgroundColor";
      const shade = parts[2];
      const baseColor = colors[colorKey];
      if (typeof baseColor === "string") {
        styles[colorType] = baseColor;
      } else if (typeof baseColor === "object" && shade) {
        styles[colorType] = baseColor[shade as keyof typeof baseColor];
      }
    }

    if (cls.startsWith("p-")) {
      const paddingValue = cls.split("-")[1];
      styles.padding =
        spacing[paddingValue as unknown as keyof Spacing] ??
        Number(paddingValue);
    }

    if (cls.startsWith("m-")) {
      const marginValue = cls.split("-")[1];
      styles.margin =
        spacing[marginValue as unknown as keyof Spacing] ?? Number(marginValue);
    }

    if (cls.startsWith("w-")) {
      const widthValue = cls.split("-")[1];
      styles.width =
        spacing[widthValue as unknown as keyof Spacing] ?? Number(widthValue);
    }

    if (cls.startsWith("h-")) {
      const heightValue = cls.split("-")[1];
      styles.height =
        spacing[heightValue as unknown as keyof Spacing] ?? Number(heightValue);
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
      const v = spacing[val as unknown as keyof typeof spacing] ?? Number(val);
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

    if (cls === "flex") styles.display = "flex";
    if (cls === "flex-row") styles.flexDirection = "row";
    if (cls === "flex-col") styles.flexDirection = "column";

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

    if (/^border-(\d+)$/.test(cls)) {
      const borderWidth = cls.match(/^border-(\d+)$/)![1];
      styles.borderWidth = Number(borderWidth);
    }

    if (/^border-(solid|dashed|dotted)$/.test(cls)) {
      styles.borderStyle = cls.split("-")[1];
    }

    if (cls.startsWith("border-")) {
      const parts = cls.split("-");
      if (parts.length === 3) {
        const [, color, shade] = parts;
        const colorObj = colors[color as keyof typeof colors];
        if (typeof colorObj === "object") {
          const shadeValue = colorObj[shade as keyof typeof colorObj];
          if (shadeValue) styles.borderColor = shadeValue;
        }
      } else {
        const colorKey = cls.replace("border-", "");
        if (colors[colorKey as keyof typeof colors]) {
          styles.borderColor = colors[colorKey as keyof typeof colors];
        }
      }
    }

    if (/^rounded(-[a-z]+)?$/.test(cls)) {
      const radiusMap = {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12,
        full: 9999,
      };
      const parts = cls.split("-");
      const size = parts[1] || "md";
      styles.borderRadius = radiusMap[size as keyof typeof radiusMap] ?? 4;
    }

    if (cls.startsWith("text-")) {
      const fontSizeKey = cls.split("-")[1] as keyof FontSizes;
      const fallbackSize = Number(fontSizeKey);
      styles.fontSize = fontSizes[fontSizeKey] ?? fallbackSize;
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
        Object.assign(
          styles[screenSize] as ParsedStyles,
          parseClasses(classNamePart, theme)
        );
      }
    }
  });

  return styles;
};

export default parseClasses;
