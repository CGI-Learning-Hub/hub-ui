import MUIAlert, {
  type AlertProps as MUIAlertProps,
} from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type AlertProps = {
  title?: string;
} & Omit<MUIAlertProps, "color">;

const Alert: React.FunctionComponent<AlertProps> = (props) => {
  return (
    <MUIAlert {...props} color={props.severity}>
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.children}
    </MUIAlert>
  );
};

export default Alert;
