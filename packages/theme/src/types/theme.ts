export type ColorShades = {
  darker: string;
  dark: string;
  regular: string;
  light: string;
  lighter: string;
  contrastText: string;
};

export type Theme = {
  palette: {
    primary: ColorShades;
    secondary: ColorShades;
    grey: Omit<ColorShades, "contrastText">;
    red: Omit<ColorShades, "darker" | "lighter">;
    blue: Omit<ColorShades, "darker" | "lighter">;
    green: Omit<ColorShades, "darker" | "lighter">;
    yellow: Omit<ColorShades, "darker" | "lighter">;
  };
};
