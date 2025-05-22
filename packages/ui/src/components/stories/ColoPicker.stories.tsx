import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react/*";
import { useState } from "react";

import { ColorPicker } from "../ColorPicker";
import { ColorPickerProps, HexaColor } from "../ColorPicker/types";

const Component = (props: ColorPickerProps) => {
  const [color, setColor] = useState(props.value);

  const handleChange = (color: HexaColor) => {
    setColor(color);
  };

  return (
    <Box m="5rem 10rem">
      <ColorPicker {...props} value={color} onChange={handleChange} />
    </Box>
  );
};

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: Component,
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    disabled: false,
    value: "#F44336",
    onChange: () => "",
  },
};
