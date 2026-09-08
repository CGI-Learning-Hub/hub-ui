import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

type StyledStackProps = StackProps & {
  disabled: boolean;
  hasFile: boolean;
  height: number | string;
  width: number | string;
};

export const StyledStack = styled(Stack)<StyledStackProps>(
  ({ theme, disabled, hasFile, height, width }) => ({
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minWidth: "150px",
    width,
    minHeight: "150px",
    height,
    borderRadius: "4px",
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "default" : "pointer",
    background: hasFile
      ? "unset"
      : "linear-gradient(180deg, #F5F7F9 0%, #FFF 100%)",
    border: hasFile ? "unset" : "1px dashed",
    borderColor: theme.palette.grey.main,
  }),
);
