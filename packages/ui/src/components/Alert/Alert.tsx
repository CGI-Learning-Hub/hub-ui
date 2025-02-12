import {
  AlertTitle,
  Alert as MUIAlert,
  AlertProps as MUIAlertProps,
  styled,
} from "@mui/material";

type AlertProps = {
  title?: string;
} & Omit<MUIAlertProps, "variant" | "color">;

const StyledAlert = styled(MUIAlert)(() => {
  return {
    "& .MuiAlertTitle-root": {
      fontWeight: 600,
    },
  };
});

const Alert: React.FunctionComponent<AlertProps> = (props) => {
  return (
    <StyledAlert
      {...props}
      severity={props.severity}
      color={props.severity}
      variant="standard"
    >
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.children}
    </StyledAlert>
  );
};

export default Alert;
