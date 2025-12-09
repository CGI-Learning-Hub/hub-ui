import BaseAlert, {
  type AlertProps as BaseAlertProps,
} from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { alpha, useTheme } from "@mui/material/styles";
import type { FC } from "react";

export type AlertProps = {
  title?: string;
} & Omit<BaseAlertProps, "color">;

const Alert: FC<AlertProps> = ({ severity = "success", ...otherProps }) => {
  const theme = useTheme();

  return (
    <BaseAlert
      severity={severity}
      color={severity}
      sx={{
        bgcolor: alpha(theme.palette[severity].light, 0.35),
        ...otherProps.sx,
      }}
      {...otherProps}
    >
      {otherProps.title ? <AlertTitle>{otherProps.title}</AlertTitle> : null}
      {otherProps.children}
    </BaseAlert>
  );
};

export default Alert;
