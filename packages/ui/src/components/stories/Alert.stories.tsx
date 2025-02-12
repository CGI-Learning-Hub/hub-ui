import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "../Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Error: Story = {
  args: {
    severity: "error",
    children: "This is an alert of type error",
  },
};

export const Info: Story = {
  args: {
    severity: "info",
    children: "This is an alert of type info",
  },
};

export const Success: Story = {
  args: {
    severity: "success",
    children: "This is an alert of type success",
  },
};

export const Warning: Story = {
  args: {
    severity: "warning",
    children: "This is an alert of type warning",
  },
};
