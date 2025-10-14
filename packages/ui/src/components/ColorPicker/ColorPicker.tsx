import { Box, ClickAwayListener, SxProps } from "@mui/material";
import { FC, KeyboardEvent, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";

import { CheckmarkSwatch } from "./CheckmarkSwatch";
import { ColorPickerIcon } from "./ColorPickerIcon";
import { DEFAULT_COLOR_OPTIONS } from "./constants";
import {
  PickerBackgroundBox,
  checkmarkSwatchBox,
  circlePickerStyle,
} from "./styles";
import { ColorOption, ColorPickerProps, HexaColor } from "./types";

const ColorPicker: FC<ColorPickerProps> = ({
  disabled = false,
  options,
  value,
  onChange,
  slotProps,
  useCheckmarkSwatch = false,
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

  // Normaliser les options pour gérer à la fois string[] et ColorOption[]
  const normalizedOptions: ColorOption[] = options
    ? options.map((option) =>
        typeof option === "string"
          ? { color: option, showBorder: false }
          : { ...option, showBorder: option.showBorder ?? false },
      )
    : DEFAULT_COLOR_OPTIONS;

  // Extraire uniquement les couleurs pour CirclePicker
  const colorStrings = normalizedOptions.map((opt) => opt.color);

  return (
    <ClickAwayListener
      onClickAway={handleClose}
      {...slotProps?.clickAwayListener}
    >
      <PickerBackgroundBox
        disabled={disabled}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <ColorPickerIcon onClick={handlePickerToggle} fill={value} />
        {isCirclePickerVisible && (
          <Box
            sx={
              {
                ...circlePickerStyle,
                ...(slotProps?.circlePickerBox?.sx || {}),
              } as SxProps
            }
          >
            {useCheckmarkSwatch ? (
              <Box sx={checkmarkSwatchBox}>
                {normalizedOptions.map((option) => (
                  <CheckmarkSwatch
                    key={option.color}
                    color={option.color}
                    active={option.color === value}
                    onClick={() => {
                      onChange(option.color as HexaColor);
                      handleClose();
                    }}
                    showBorder={option.showBorder}
                  />
                ))}
              </Box>
            ) : (
              <CirclePicker
                colors={colorStrings}
                color={value}
                onChange={(newColor: ColorResult) => {
                  onChange(newColor.hex as HexaColor);
                  handleClose();
                }}
                circleSize={20}
                circleSpacing={5}
                width="15rem"
                {...slotProps?.circlePicker}
              />
            )}
          </Box>
        )}
      </PickerBackgroundBox>
    </ClickAwayListener>
  );
};

export default ColorPicker;
