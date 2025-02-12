import TextField, { type TextFieldProps } from "@mui/material/TextField";

export type InputTextProps = {} & TextFieldProps;

const TextInput: React.FunctionComponent<InputTextProps> = (
  props: InputTextProps,
) => {
  return <TextField {...props} variant={props.variant || "standard"} />;
};

export default TextInput;
