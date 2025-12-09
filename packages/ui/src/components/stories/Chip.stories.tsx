import type { Meta, StoryObj } from "@storybook/react-vite";

import { Chip } from "..";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  argTypes: {
    clickable: {
      control: "boolean",
    },
    color: {
      control: "select",
      options: [
        "default",
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
    label: {
      control: "text",
    },
    size: {
      control: "radio",
      options: ["medium", "small"],
    },
    skipFocusWhenDisabled: {
      control: "boolean",
    },
    variant: {
      control: "radio",
      options: ["filled", "outlined"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    clickable: false,
    color: "default",
    disabled: false,
    label: "Label",
    size: "medium",
    skipFocusWhenDisabled: false,
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    label: "Label",
    variant: "outlined",
  },
};

export const Primary: Story = {
  args: {
    label: "Label",
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Label",
    color: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    disabled: true,
  },
};
