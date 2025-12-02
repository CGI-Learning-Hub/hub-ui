import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from "..";

const ToggleButtons = (props: ToggleButtonGroupProps) => {
  const [alignment, setAlignment] = useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup value={alignment} onChange={handleAlignment} {...props}>
      <ToggleButton value="left" aria-label="left aligned">
        <FormatAlignLeftIcon />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <FormatAlignCenterIcon />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <FormatAlignRightIcon />
      </ToggleButton>
      <ToggleButton value="justify" aria-label="justified" disabled>
        <FormatAlignJustifyIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const meta: Meta<typeof ToggleButtons> = {
  title: "Components/ToggleButton",
  component: ToggleButtons,
  argTypes: {
    color: {
      control: "select",
      options: [
        "standard",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    disabled: {
      control: "boolean",
    },
    exclusive: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ToggleButtons>;

export const Default: Story = {
  args: {
    color: "standard",
    disabled: false,
    exclusive: true,
    fullWidth: false,
    orientation: "horizontal",
    size: "medium",
  },
};
