import { ReactNode } from "react";

export interface ToggleButtonItem<T extends string = string> {
  value: T;
  icon: ReactNode;
  disabled?: boolean;
}

export interface SwitchViewProps<
  T extends readonly ToggleButtonItem<string>[],
> {
  onChange: (value: T[number]["value"]) => void;
  viewMode: T[number]["value"];
  toggleButtonList: T;
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
