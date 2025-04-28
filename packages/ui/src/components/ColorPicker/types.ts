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
  colors?: string[];
  selectColor: string;
  onColorChange: (newColor: HexaColor) => void;
  slotProps?: CirclePickerSlotProps;
}; 

export type PickerBackGroundBoxProps = {
    disabled: boolean | undefined;
  }

export type PickerColorBoxProps = {
  selectColor: string;
}  

export type CustomSVGProps = SVGAttributes<SVGSVGElement>;