import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const StyledStack = styled(Stack)<StackProps>(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem",
  border: "1px dashed",
  borderColor: theme.palette.grey.main,
  borderRadius: 1,
  cursor: "pointer",
}));
