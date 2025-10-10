import { BoxProps, ClickAwayListenerProps } from "@mui/material";
import { SVGAttributes } from "react";
import { CirclePickerProps } from "react-color";

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
  useCheckmarkSwatch?: boolean;
};

export type ColorPickerProps = {
  value: HexaColor;
  disabled?: boolean;
  options?: string[] | ColorOption[];
  slotProps?: ColorPickerSlotProps;
  onChange: (value: HexaColor) => void;
};

export type PickerBackGroundBoxProps = {
  disabled?: boolean;
};

export type CustomSVGProps = SVGAttributes<SVGSVGElement>;

export interface StyledSwatchBoxProps {
  showBorder?: boolean;
  backgroundColor?: string;
}
