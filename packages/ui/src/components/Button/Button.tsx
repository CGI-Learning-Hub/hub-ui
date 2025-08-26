import MUIButton, { type ButtonProps } from "@mui/material/Button";
import { CSSObject, styled } from "@mui/material/styles";

const StyledButton = styled(MUIButton)(({ color, theme }) => {
  const rootStyles = theme.components?.MuiButton?.styleOverrides?.root as CSSObject | undefined;

  return {
    minHeight: 38,
    textTransform: rootStyles?.textTransform ?? "none",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&.MuiButton-outlined": {
      borderRadius: 5,
      borderWidth: 2,
      /* "&:hover": {
        //backgroundColor: theme.palette[color].main,
        color: theme.palette.common.white,
      },*/
    },
  }
});

const Button: React.FunctionComponent<ButtonProps> = ({
  variant = "outlined",
  ...otherProps
}) => {
  return <StyledButton variant={variant} {...otherProps} />;
};

export default Button;
