import {
  LeftAction,
  LeftActionsContainer,
  RightAction,
  RightActionsContainer,
  Root,
} from "./style";
import { ActionBarProps } from "./types";

const ActionBar: React.FunctionComponent<ActionBarProps> = ({
  leftActions,
  rightActions,
  slotProps = {},
}) => {
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
            variant="text"
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
            variant="text"
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
