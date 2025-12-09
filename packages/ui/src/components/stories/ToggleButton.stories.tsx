import FormatAlignCenterRoundedIcon from "@mui/icons-material/FormatAlignCenterRounded";
import FormatAlignJustifyRoundedIcon from "@mui/icons-material/FormatAlignJustifyRounded";
import FormatAlignLeftRoundedIcon from "@mui/icons-material/FormatAlignLeftRounded";
import FormatAlignRightRoundedIcon from "@mui/icons-material/FormatAlignRightRounded";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type MouseEvent, useState } from "react";

import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from "..";

const ToggleButtons = (props: ToggleButtonGroupProps) => {
  const [alignment, setAlignment] = useState<string | null>("left");

  const handleAlignment = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup value={alignment} onChange={handleAlignment} {...props}>
      <ToggleButton value="left" aria-label="left aligned">
        <FormatAlignLeftRoundedIcon />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <FormatAlignCenterRoundedIcon />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <FormatAlignRightRoundedIcon />
      </ToggleButton>
      <ToggleButton value="justify" aria-label="justified" disabled>
        <FormatAlignJustifyRoundedIcon />
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
