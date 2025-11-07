import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ColorPicker } from "../ColorPicker";
import { ColorPickerProps, HexaColor } from "../ColorPicker/types";

const Component = (props: ColorPickerProps) => {
  const [color, setColor] = useState(props.value);

  const handleChange = (newColor: HexaColor) => {
    setColor(newColor);
    props.onChange?.(newColor);
  };

  return (
    <Box m="5rem 10rem">
      <ColorPicker {...props} value={color} onChange={handleChange} />
      <Box mt={2}>Couleur sélectionnée : {color}</Box>
    </Box>
  );
};

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: Component,
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Désactive le color picker",
    },
    value: {
      control: "color",
      description: "Couleur actuellement sélectionnée",
    },
    onChange: {
      action: "color-changed",
      description: "Callback appelé lors du changement de couleur",
    },
    useCheckmarkSwatch: {
      control: "boolean",
      description: "Utilise le CheckmarkSwatch au lieu du CirclePicker",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Un composant de sélection de couleur avec palette prédéfinie.",
      },
    },
  },
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

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "#F44336",
    onChange: () => "",
  },
};

export const WithCustomColors: Story = {
  args: {
    disabled: false,
    value: "#4CAF50",
    options: [
      "#FF5722",
      "#4CAF50",
      "#2196F3",
      "#FFC107",
      "#9C27B0",
      "#E91E63",
      "#00BCD4",
      "#FF9800",
      "#8BC34A",
    ],
    onChange: () => "",
  },
};

export const WithCheckmarkSwatch: Story = {
  args: {
    disabled: false,
    value: "#F44336",
    useCheckmarkSwatch: true,
    onChange: () => "",
  },
};

export const WithColorOptionsAndBorders: Story = {
  args: {
    disabled: false,
    value: "#FFFFFF",
    options: [
      { color: "#FFFFFF", showBorder: true },
      { color: "#000000", showBorder: false },
      { color: "#FF5722", showBorder: false },
      { color: "#4CAF50", showBorder: false },
      { color: "#2196F3", showBorder: false },
      { color: "#FFC107", showBorder: false },
      { color: "#9C27B0", showBorder: false },
      { color: "#E91E63", showBorder: false },
      { color: "#00BCD4", showBorder: false },
    ],
    useCheckmarkSwatch: true,
    onChange: () => "",
  },
};
