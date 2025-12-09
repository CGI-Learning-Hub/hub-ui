import type { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordInput } from "..";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    label: "Password",
  },
};
