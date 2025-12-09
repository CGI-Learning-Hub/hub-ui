import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox as BaseCheckbox, type CheckboxProps } from "..";

const Checkbox = (props: CheckboxProps) => {
  return <BaseCheckbox {...props} />;
};

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: {
      control: "boolean",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
    disabled: {
      control: "boolean",
    },
    disableRipple: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["medium", "small"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: undefined,
    color: "primary",
    disabled: false,
    disableRipple: false,
    required: false,
    size: "medium",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};
