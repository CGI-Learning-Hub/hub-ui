import MUIAlert, {
  type AlertProps as MUIAlertProps,
} from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { alpha, useTheme } from "@mui/material/styles";

export type AlertProps = {
  title?: string;
} & Omit<MUIAlertProps, "color">;

const Alert: React.FunctionComponent<AlertProps> = ({
  severity = "success",
  ...otherProps
}) => {
  const theme = useTheme();

  return (
    <MUIAlert
      color={severity}
      sx={{ bgcolor: alpha(theme.palette[severity].light, 0.35) }}
      {...otherProps}
    >
      {otherProps.title ? <AlertTitle>{otherProps.title}</AlertTitle> : null}
      {otherProps.children}
    </MUIAlert>
  );
};

export default Alert;
