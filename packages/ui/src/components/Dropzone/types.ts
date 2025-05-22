import { StackProps, SvgIconProps, TypographyProps } from "@mui/material";

export type DropZoneSlotProps = {
  root?: StackProps;
  input?: React.InputHTMLAttributes<HTMLInputElement>;
  icon?: SvgIconProps;
  label?: TypographyProps;
  information?: TypographyProps;
};
