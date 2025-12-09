import Button from "@mui/material/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ButtonGroup, type ButtonGroupProps } from "..";

const BasicButtonGroup = (props: ButtonGroupProps) => {
  return (
    <ButtonGroup {...props}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
};

const meta: Meta<typeof BasicButtonGroup> = {
  title: "Components/ButtonGroup",
  component: BasicButtonGroup,
  argTypes: {
    color: {
      control: "select",
      options: [
        "inherit",
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
    disableElevation: {
      control: "boolean",
    },
    disableFocusRipple: {
      control: "boolean",
    },
    disableRipple: {
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
    variant: {
      control: "radio",
      options: ["contained", "outlined", "text"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof BasicButtonGroup>;

export const Default: Story = {
  args: {
    color: "primary",
    disabled: false,
    disableElevation: false,
    disableFocusRipple: false,
    disableRipple: false,
    fullWidth: false,
    orientation: "horizontal",
    size: "medium",
    variant: "contained",
  },
};
