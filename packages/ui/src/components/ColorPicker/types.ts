import type { BoxProps } from "@mui/material/Box";
import type { ClickAwayListenerProps } from "@mui/material/ClickAwayListener";
import type { SVGAttributes } from "react";
import type { CirclePickerProps } from "react-color";

export type HexaColor = `#${string}`;

export type SwatchProps = {
  color: string;
  onClick: () => void;
  active: boolean;
  showBorder?: boolean;
};

export type ColorOption = {
  color: string;
  showBorder?: boolean;
};

export type ColorPickerSlotProps = {
  clickAwayListener?: Omit<ClickAwayListenerProps, "onClickAway" | "children">;
  circlePicker?: Omit<CirclePickerProps, "colors" | "color" | "onChange">;
  circlePickerBox?: BoxProps;
};

export type ColorPickerProps = {
  value: HexaColor;
  disabled?: boolean;
  options?: string[] | ColorOption[];
  slotProps?: ColorPickerSlotProps;
  onChange: (value: HexaColor) => void;
  useCheckmarkSwatch?: boolean;
};

export type PickerBackGroundBoxProps = {
  disabled?: boolean;
};

export type CustomSVGProps = SVGAttributes<SVGSVGElement>;

export interface StyledSwatchBoxProps {
  showBorder?: boolean;
  backgroundColor?: string;
}
