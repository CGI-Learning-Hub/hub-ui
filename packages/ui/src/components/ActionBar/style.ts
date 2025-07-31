import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { Button } from "../Button";

export const Root = styled(Stack, {
  name: "MuiActionBar",
  slot: "Root",
})(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: "100",
  padding: "1rem",
  gap: "1rem",
  backgroundColor: theme.palette.primary.main,
}));

export const LeftActionsContainer = styled(Stack, {
  name: "MuiActionBar",
  slot: "LeftActionsContainer",
})({});

export const RightActionsContainer = styled(Stack, {
  name: "MuiActionBar",
  slot: "RightActionsContainer",
})({});

export const LeftAction = styled(Button, {
  name: "MuiActionBar",
  slot: "LeftActions",
})(({ theme }) => ({
  color: theme.palette.common.white,
  transition: "all 0.2s ease-in-out",
  borderRadius: "4px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
}));

export const RightAction = styled(Button, {
  name: "MuiActionBar",
  slot: "RightActions",
})(({ theme }) => ({
  color: theme.palette.common.white,
  transition: "all 0.2s ease-in-out",
  borderRadius: "4px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
}));
