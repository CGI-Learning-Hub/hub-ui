import { useTheme } from "@mui/material/styles";
import type { FC } from "react";

import {
  LeftAction,
  LeftActionsContainer,
  RightAction,
  RightActionsContainer,
  Root,
} from "./style";
import type { ActionBarProps } from "./types";

const ActionBar: FC<ActionBarProps> = ({
  leftActions,
  rightActions,
  slotProps = {},
}) => {
  const theme = useTheme();

  return (
    <Root direction="row" justifyContent="space-between" {...slotProps.root}>
      <LeftActionsContainer
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        {...slotProps.leftActionsContainer}
      >
        {leftActions.map((item) => (
          <LeftAction
            key={item.label}
            // @ts-expect-error custom component
            variant={
              theme.components?.MuiActionBar?.defaultProps?.buttonVariant ??
              "text"
            }
            color="primary"
            onClick={item.action}
            {...slotProps.leftActions}
          >
            {item.label}
          </LeftAction>
        ))}
      </LeftActionsContainer>
      <RightActionsContainer
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        {...slotProps.rightActionsContainer}
      >
        {rightActions.map((item) => (
          <RightAction
            key={item.label}
            // @ts-expect-error custom component
            variant={
              theme.components?.MuiActionBar?.defaultProps?.buttonVariant ??
              "text"
            }
            color="primary"
            onClick={item.action}
            {...slotProps.rightActions}
          >
            {item.label}
          </RightAction>
        ))}
      </RightActionsContainer>
    </Root>
  );
};

export default ActionBar;
