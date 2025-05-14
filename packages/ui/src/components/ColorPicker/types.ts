import { BoxProps, ClickAwayListenerProps } from "@mui/material";
import { SVGAttributes } from "react";
import { CirclePickerProps } from "react-color";

export type HexaColor = `#${string}`;

export type ColorPickerSlotProps = {
  clickAwayListener?: Omit<ClickAwayListenerProps, "onClickAway" | "children">;
  pickerBox?: BoxProps;
  circlePicker?: Omit<CirclePickerProps, "colors" | "color" | "onChange">;
  circlePickerBox?: BoxProps;
};

export type ColorPickerProps = {
  value: HexaColor;
  disabled?: boolean;
  options?: string[];
  slotProps?: ColorPickerSlotProps;
  onChange: (value: HexaColor) => void;
};

export type PickerBackGroundBoxProps = {
  disabled?: boolean;
};

export type CustomSVGProps = SVGAttributes<SVGSVGElement>;
