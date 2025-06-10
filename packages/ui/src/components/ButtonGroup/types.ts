import { ReactNode } from "react";

export interface ButtonItem<T extends string = string> {
  value: T;
  icon: ReactNode;
  text?: string;
  disabled?: boolean;
}

export interface ButtonGroupProps<
  T extends readonly ButtonItem<string>[],
> {
  onChange: (value: T[number]["value"]) => void;
  viewMode: T[number]["value"];
  buttonList: T;
  colorVariant?: ColorVariant;
  size?: "small" | "medium" | "large";
  orientation?: "horizontal" | "vertical";
}

export type ColorVariant = "primary" | "secondary";

export interface StyledToggleButtonGroupProps {
  colorvariant: ColorVariant;
}

export interface StyledToggleButtonProps {
  colorvariant: ColorVariant;
}