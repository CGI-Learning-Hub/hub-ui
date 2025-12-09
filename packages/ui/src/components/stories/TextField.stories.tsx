import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextField as BaseTextField, type TextFieldProps } from "..";

const TextField = (props: TextFieldProps) => {
  return <BaseTextField {...props} />;
};

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "error", "info", "success", "warning"],
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    helperText: {
      control: "text",
    },
    label: {
      control: "text",
    },
    multiline: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["standard", "outlined", "filled"],
    },
  },
  args: {
    color: "primary",
    disabled: false,
    error: false,
    fullWidth: false,
    helperText: undefined,
    label: "Label",
    multiline: false,
    placeholder: undefined,
    variant: "outlined",
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {},
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
};

export const Standard: Story = {
  args: {
    variant: "standard",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
