export type Fonts = {
  sans: string;
  serif: string;
  monospace: string;
  custom: string;
};

export type Colors = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  white: string;
  black: string;
  [key: string]: string;
};

export type Themes = {
  light: {
    backgroundColor: string;
    color: string;
  };
  dark: {
    backgroundColor: string;
    color: string;
  };
};

export type FontSizes = {
  sm: string;
  md: string;
  lg: string;
};

export type Spacing = {
  [key: number]: string;
};

export type FlexJustify = {
  start: string;
  center: string;
  end: string;
};

export type FlexAlign = {
  start: string;
  center: string;
  end: string;
};

export type Breakpoints = {
  sm: string;
  md: string;
  lg: string;
};

export const fonts: Fonts = {
  sans: "Helvetica, Arial, sans-serif",
  serif: "Georgia, serif",
  monospace: "Courier New, monospace",
  custom: "sans-serif",
};

export const colors: Colors = {
  primary: "#007bff",
  secondary: "#6c757d",
  background: "#f8f9fa",
  text: "#212529",
  white: "#ffffff",
  black: "#000000",
  "blue-500": "#3B82F6",
  "gray-700": "#374151",
  "gray-200": "#E5E7EB",
};

export const themes: Themes = {
  light: {
    backgroundColor: "#ffffff",
    color: "#212529",
  },
  dark: {
    backgroundColor: "#212529",
    color: "#ffffff",
  },
};

export const fontSizes: FontSizes = {
  sm: "12px",
  md: "16px",
  lg: "24px",
};

export const spacing: Spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "16px",
  4: "24px",
  5: "32px",
  6: "40px",
  7: "48px",
};

export const flexJustify: FlexJustify = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

export const flexAlign: FlexAlign = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

export const breakpoints: Breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "1024px",
};
