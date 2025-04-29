import { ClickAwayListenerProps } from "@mui/material";
import { SVGAttributes } from "react";
import { CirclePickerProps } from "react-color";


export type HexaColor = `#${string}`;

export type CirclePickerSlotProps = {
  clickAwayListener?: Omit<ClickAwayListenerProps, 'onClickAway' | 'children'>;
    circlePicker?: Omit<CirclePickerProps, 'colors' | 'color' | 'onChange'>;
}

export type ColorPickerProps = {
  disabled?: boolean;
  options?: string[];
  value: string;
  onChange: (newColor: HexaColor) => void;
  slotProps?: CirclePickerSlotProps;
}; 

export type PickerBackGroundBoxProps = {
    disabled: boolean | undefined;
  }

export type CustomSVGProps = SVGAttributes<SVGSVGElement>;