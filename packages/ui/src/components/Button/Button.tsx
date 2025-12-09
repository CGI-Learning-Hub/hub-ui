import BaseButton, { type ButtonProps } from "@mui/material/Button";
import { type CSSObject, styled } from "@mui/material/styles";
import type { FC } from "react";

const StyledButton = styled(BaseButton)(({ color, theme }) => {
  const outlinedVariant = theme.components?.MuiButton?.variants?.find(
    (v): boolean => (v.props as Partial<ButtonProps>)?.variant === "outlined",
  );
  const containedVariant = theme.components?.MuiButton?.variants?.find(
    (v): boolean => (v.props as Partial<ButtonProps>)?.variant === "contained",
  );
  const outlinedStyle = outlinedVariant?.style as CSSObject | undefined;
  const containedStyle = containedVariant?.style as CSSObject | undefined;

  return {
    minHeight: 38,
    textTransform: "none",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&.MuiButton-outlined": {
      ...(outlinedStyle ?? {}),
      borderRadius: outlinedStyle?.borderRadius ?? 5,
      borderWidth: outlinedStyle?.borderWidth ?? 2,
      textTransform: outlinedStyle?.textTransform ?? "none",
      /* "&:hover": {
        //backgroundColor: theme.palette[color].main,
        color: theme.palette.common.white,
      },*/
    },
    "&.MuiButton-contained": {
      ...(containedStyle ?? {}),
      borderRadius: containedStyle?.borderRadius ?? 5,
      borderWidth: containedStyle?.borderWidth ?? 2,
      textTransform: containedStyle?.textTransform ?? "none",
    },
  };
});

const Button: FC<ButtonProps> = ({ variant = "outlined", ...otherProps }) => {
  return <StyledButton variant={variant} {...otherProps} />;
};

export default Button;

export type { ButtonProps };
