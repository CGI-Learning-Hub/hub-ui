import type { StackProps } from "@mui/material/Stack";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { TypographyProps } from "@mui/material/Typography";
import type { InputHTMLAttributes } from "react";

export type DropZoneSlotProps = {
  root?: StackProps;
  input?: InputHTMLAttributes<HTMLInputElement>;
  icon?: SvgIconProps;
  label?: TypographyProps;
  information?: TypographyProps;
};
