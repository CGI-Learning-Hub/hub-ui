import { Box, ClickAwayListener } from "@mui/material";
import { FC, KeyboardEvent, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";

import { PickerBackgroundBox, circlePickerStyle } from "./styles";
import { ColorPickerIcon } from "./ColorPickerIcon";
import { ColorPickerProps, HexaColor } from "./types";


const ColorPicker: FC<ColorPickerProps> = ({
  disabled = false,
  colors,
  selectColor,
  onColorChange,
  slotProps
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
        <ColorPickerIcon onClick={handlePickerToggle} fill={selectColor} />
          {isCirclePickerVisible && (
            <Box sx={circlePickerStyle}>
              <CirclePicker
                colors={colors}
                color={selectColor}
                onChange={(newColor: ColorResult) => {
                  onColorChange(newColor.hex as HexaColor);
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
