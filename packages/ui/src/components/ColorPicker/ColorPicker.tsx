import { Box, ClickAwayListener } from "@mui/material";
import { FC, KeyboardEvent, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";

import { ColorPickerIcon } from "./ColorPickerIcon";
import { PickerBackgroundBox, circlePickerStyle } from "./styles";
import { ColorPickerProps, HexaColor } from "./types";

const ColorPicker: FC<ColorPickerProps> = ({
  disabled = false,
  options,
  value,
  onChange,
  slotProps,
}) => {
  const [isCirclePickerVisible, setIsCirclePickerVisible] = useState(false);

  const handlePickerToggle = () => {
    if (disabled) return;
    return setIsCirclePickerVisible((prev) => !prev);
  };

  const handleClose = () => {
    setIsCirclePickerVisible(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handlePickerToggle();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <PickerBackgroundBox
        disabled={disabled}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <ColorPickerIcon onClick={handlePickerToggle} fill={value} />
        {isCirclePickerVisible && (
          <Box sx={circlePickerStyle}>
            <CirclePicker
              colors={options}
              color={value}
              onChange={(newColor: ColorResult) => {
                onChange(newColor.hex as HexaColor);
                handleClose();
              }}
              circleSize={20}
              circleSpacing={5}
              width="15rem"
            />
          </Box>
        )}
      </PickerBackgroundBox>
    </ClickAwayListener>
  );
};
export default ColorPicker;
