import { StyledToggleButton, StyledToggleButtonGroup } from "./style";
import { ButtonGroupProps, ButtonItem } from "./types";

const ButtonGroup = <T extends readonly ButtonItem<string>[]>({
  viewMode,
  buttonList,
  onChange,
  colorVariant = "primary",
  size = "small",
  orientation = "horizontal",
}: ButtonGroupProps<T>) => {
  return (
    <StyledToggleButtonGroup
      value={viewMode}
      exclusive
      onChange={(event, value: T[number]["value"]) => {
        if (value !== null) {
          onChange(value);
        }
      }}
      size={size}
      orientation={orientation}
      colorvariant={colorVariant}
    >
      {buttonList.map((button) => (
        <StyledToggleButton
          key={button.value}
          value={button.value}
          colorvariant={colorVariant}
          disabled={button.disabled}
        >
          {button.icon}
        </StyledToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

export default ButtonGroup;
