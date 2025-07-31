import { ButtonProps } from "@mui/material/Button";
import { StackProps } from "@mui/material/Stack";

export type ActionBarButton = {
  label: string;
  action: () => void;
};

export type ActionBarProps = {
  leftActions: ActionBarButton[];
  rightActions: ActionBarButton[];
  slotProps?: {
    leftActions?: ButtonProps;
    leftActionsContainer?: StackProps;
    rightActions?: ButtonProps;
    rightActionsContainer?: StackProps;
    root?: StackProps;
  };
};
