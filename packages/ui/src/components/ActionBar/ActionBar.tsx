import { FC } from "react";

import { Box, Button } from "../index";
import {
  actionBarButtonStyle,
  actionBarWrapper,
  flexEndBoxStyle,
  flexStartBoxStyle,
} from "./style";
import { ActionBarProps } from "./types";

const ActionBar: React.FunctionComponent<ActionBarProps> = ({
  leftButtons,
  rightButtons,
  boxLeftWrapperProps,
  boxRightWrapperProps,
  buttonLeftProps,
  buttonRightProps,
  ...otherProps
}) => {
  const { sx: otherSxProps, ...restProps } = otherProps;
  const sxProps = Array.isArray(otherSxProps) ? otherSxProps : [otherSxProps];

  return (
    <Box sx={[actionBarWrapper, ...sxProps]} {...restProps}>
      <Box
        sx={{ ...flexStartBoxStyle, ...boxLeftWrapperProps?.sx }}
        {...boxLeftWrapperProps}
      >
        {leftButtons.map((item) => (
          <Button
            key={item.label}
            color="primary"
            sx={{ ...actionBarButtonStyle, ...buttonLeftProps?.sx }}
            onClick={item.action}
            {...buttonLeftProps}
          >
            {item.label}
          </Button>
        ))}
      </Box>
      <Box
        sx={{ ...flexEndBoxStyle, ...boxRightWrapperProps?.sx }}
        {...boxRightWrapperProps}
      >
        {rightButtons.map((item) => (
          <Button
            key={item.label}
            color="primary"
            sx={{ ...actionBarButtonStyle, ...buttonRightProps?.sx }}
            onClick={item.action}
            {...buttonRightProps}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ActionBar;