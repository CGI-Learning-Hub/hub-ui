import { StyledToggleButton, StyledToggleButtonGroup } from "./style";
import { SwitchViewProps, ToggleButtonItem } from "./types";

const SwitchView = <T extends readonly ToggleButtonItem<string>[]>({
  viewMode,
  toggleButtonList,
  onChange,
  colorVariant = "primary",
  size = "small",
  orientation = "horizontal",
}: SwitchViewProps<T>) => {
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
      {toggleButtonList.map((button) => (
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

export default SwitchView;
