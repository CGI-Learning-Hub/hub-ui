import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import "react";

export interface TextInputProps extends TextFieldProps<"standard"> {}

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },
}));

const TextInput: React.FunctionComponent<TextInputProps> = (
  props: TextInputProps
) => {
  return <StyledTextField {...props} variant="standard" />;
};

export default TextInput;