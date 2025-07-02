import { BoxProps, ButtonProps, SxProps } from "@mui/material";

export interface IActionBarButton {
  label: string;
  action: () => void;
}

export type ActionBarProps = {
  leftButtons: IActionBarButton[];
  rightButtons: IActionBarButton[];
  boxLeftWrapperProps?: BoxProps;
  boxRightWrapperProps?: BoxProps;
  buttonLeftProps?: ButtonProps;
  buttonRightProps?: ButtonProps;
} & BoxProps;
